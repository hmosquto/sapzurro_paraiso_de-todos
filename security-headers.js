const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const PAGES_DIR = __dirname;
const OUTPUT_DIR = __dirname;

// Configuración de cabeceras de seguridad
const SECURITY_HEADERS = {
  // Protección XSS (Cross-Site Scripting)
  'X-XSS-Protection': '1; mode=block',
  
  // Evitar que la página sea mostrada en un iframe
  'X-Frame-Options': 'DENY',
  
  // Prevenir que el navegador infiera el MIME type
  'X-Content-Type-Options': 'nosniff',
  
  // Política de referer estricta para prevenir fugas de información
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Feature Policy (control sobre características del navegador)
  'Permissions-Policy': [
    'camera=()',
    'geolocation=()',
    'microphone=()',
    'payment=()',
    'usb=()',
    'fullscreen=()',
    'accelerometer=()',
    'gyroscope=()',
    'magnetometer=()',
    'midi=()',
    'sync-xhr=()',
    'encrypted-media=()'
  ].join(', '),
  
  // HTTP Strict Transport Security (HSTS)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Content Security Policy (CSP)
  'Content-Security-Policy': [
    // Políticas predeterminadas
    "default-src 'self'",
    
    // Fuentes y estilos
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    
    // Scripts
    "script-src 'self' 'unsafe-inline' https://unpkg.com https://maps.googleapis.com https://connect.facebook.net https://static.xx.fbcdn.net",
    
    // Imágenes
    "img-src 'self' data: https: http:",
    
    // Conexiones
    "connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://*.tiles.mapbox.com https://*.tile.openstreetmap.org",
    
    // Frames
    "frame-src 'self' https://www.facebook.com https://www.youtube.com https://player.vimeo.com",
    
    // Otras políticas
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ].join('; ')
};

// Función para agregar cabeceras a un archivo HTML
function addSecurityHeaders(htmlContent) {
  // Crear etiquetas de meta para las cabeceras
  const metaTags = Object.entries(SECURITY_HEADERS)
    .map(([name, content]) => {
      // Para CSP, usamos http-equiv
      if (name === 'Content-Security-Policy' || 
          name === 'X-Content-Type-Options' ||
          name === 'X-Frame-Options' ||
          name === 'X-XSS-Protection') {
        return `  <meta http-equiv="${name}" content="${content.replace(/"/g, '&quot;')}">`;
      }
      // Para las demás cabeceras, usamos name
      return `  <meta name="${name}" content="${content.replace(/"/g, '&quot;')}">`;
    })
    .join('\n');

  // Buscar la etiqueta head y agregar las meta etiquetas
  if (htmlContent.includes('</head>')) {
    // Eliminar cabeceras existentes si las hay
    Object.keys(SECURITY_HEADERS).forEach(header => {
      const headerName = header.toLowerCase();
      htmlContent = htmlContent.replace(
        new RegExp(`<meta[^>]*(http-equiv|name)="${headerName}"[^>]*>`, 'gi'),
        ''
      );
    });
    
    // Agregar las nuevas cabeceras justo antes del cierre del head
    return htmlContent.replace('</head>', `${metaTags}\n  </head>`);
  }
  
  return htmlContent;
}

// Función para agregar atributos de seguridad a los enlaces
function addLinkSecurity(htmlContent) {
  // Agregar rel="noopener noreferrer" a los enlaces externos
  return htmlContent.replace(
    /<a\s+(?![^>]*?\srel=)([^>]*?\shref=["'](https?:\/\/|www\.)[^"']+["'][^>]*)>/gi,
    (match, p1) => {
      // Verificar si ya tiene atributo rel
      if (match.includes('rel=')) {
        return match;
      }
      return `<a rel="noopener noreferrer" ${p1}>`;
    }
  );
}

// Función para agregar atributos de seguridad a los formularios
function addFormSecurity(htmlContent) {
  // Agregar atributos de seguridad a los formularios
  return htmlContent.replace(
    /<form\s+(?![^>]*?\s(onsubmit|autocomplete)=)([^>]*)>/gi,
    (match, p1, p2) => {
      let attrs = p2 || '';
      
      // Agregar autocomplete si no está presente
      if (!/autocomplete\s*=/i.test(attrs)) {
        attrs += ' autocomplete="on"';
      }
      
      // Agregar novalidate si es un formulario de búsqueda
      if (/search/i.test(attrs) && !/novalidate\s*=/i.test(attrs)) {
        attrs += ' novalidate';
      }
      
      return `<form ${attrs.trim()}>`;
    }
  );
}

// Función para escapar caracteres especiales en expresiones regulares
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Función principal
async function applySecurityHeaders() {
  try {
    console.log('Aplicando medidas de seguridad...\n');
    
    // Obtener todos los archivos HTML
    const htmlFiles = await glob('**/*.html', { 
      cwd: PAGES_DIR,
      ignore: ['node_modules/**', 'dist/**']
    });
    
    let updatedCount = 0;
    
    // Procesar cada archivo HTML
    for (const file of htmlFiles) {
      const filePath = path.join(PAGES_DIR, file);
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Aplicar mejoras de seguridad
      content = addSecurityHeaders(content);
      content = addLinkSecurity(content);
      content = addFormSecurity(content);
      
      // Guardar los cambios si hubo modificaciones
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Medidas de seguridad aplicadas en: ${file}`);
        updatedCount++;
      } else {
        console.log(`- Sin cambios necesarios en: ${file}`);
      }
    }
    
    console.log(`\n✅ Se actualizaron ${updatedCount} archivos con medidas de seguridad`);
    
    // Crear archivo .htaccess con configuraciones de seguridad
    createHtaccessFile();
    
  } catch (error) {
    console.error('❌ Error al aplicar medidas de seguridad:', error);
    process.exit(1);
  }
}

// Función para crear archivo .htaccess
function createHtaccessFile() {
  const htaccessPath = path.join(OUTPUT_DIR, '.htaccess');
  const htaccessContent = `# Habilitar reescritura de URL
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Redirigir HTTP a HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  
  # Redirigir www a no-www (o viceversa según preferencia)
  # RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
  # RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
  
  # Redirigir index.html a la raíz
  RewriteCond %{THE_REQUEST} ^[A-Z]{3,}\s/+([^.\s]+\.html)(\?[^\s]*)?\sHTTP/[0-9.]+$
  RewriteRule ^ %1 [R=301,L]
  
  # Redirigir a la versión sin .html
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}\.html -f
  RewriteRule ^(.*)$ $1.html [L]
</IfModule>

# Configuración de caché para archivos estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Imágenes
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  
  # Fuentes
  ExpiresByType font/ttf "access plus 1 year"
  ExpiresByType font/otf "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/font-woff "access plus 1 year"
  
  # CSS, JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  
  # HTML
  ExpiresByType text/html "access plus 1 hour"
  
  # Otros
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType application/x-shockwave-flash "access plus 1 month"
</IfModule>

# Comprimir archivos
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/x-font-ttf
  AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
  AddOutputFilterByType DEFLATE font/opentype font/ttf font/eot font/otf
</IfModule>

# Configuración de seguridad adicional
<IfModule mod_headers.c>
  # Protección XSS
  Header always set X-XSS-Protection "1; mode=block"
  
  # Evitar que la página sea mostrada en un iframe
  Header always set X-Frame-Options "DENY"
  
  # Prevenir que el navegador infiera el MIME type
  Header always set X-Content-Type-Options "nosniff"
  
  # HSTS (HTTP Strict Transport Security)
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  
  # Política de referer
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  
  # Feature Policy
  Header always set Permissions-Policy "camera=(), geolocation=(), microphone=(), payment=(), usb=()"
  
  # Configuración de CORS si es necesario
  # Header set Access-Control-Allow-Origin "https://tudominio.com"
  
  # Configuración de CSP (Content Security Policy)
  # Nota: Ajusta estas políticas según las necesidades de tu sitio
  Header set Content-Security-Policy \
    "default-src 'self'; \
     script-src 'self' 'unsafe-inline' https://unpkg.com https://maps.googleapis.com https://connect.facebook.net; \
     style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; \
     img-src 'self' data: https:; \
     font-src 'self' https://fonts.gstatic.com data:; \
     connect-src 'self' https://api.mapbox.com https://events.mapbox.com; \
     frame-src 'self' https://www.facebook.com https://www.youtube.com;"
</IfModule>

# Prevenir listado de directorios
Options -Indexes

# Proteger archivos sensibles
<FilesMatch "^\.|composer\.json|package\.json|webpack\.config\.js|gulpfile\.js|yarn\.lock|package-lock\.json">
  Order allow,deny
  Deny from all
</FilesMatch>

# Proteger contra inyección de código
<IfModule mod_rewrite.c>
  RewriteCond %{QUERY_STRING} (\<|%3C).*script.*(\>|%3E) [NC,OR]
  RewriteCond %{QUERY_STRING} GLOBALS(=|\[|\%[0-9A-Z]{0,2}) [OR]
  RewriteCond %{QUERY_STRING} _REQUEST(=|\[|\%[0-9A-Z]{0,2})
  RewriteRule ^(.*)$ index.html [F,L]
</IfModule>

# Comprimir archivos con GZIP si está disponible
<IfModule mod_gzip.c>
  mod_gzip_on Yes
  mod_gzip_dechunk Yes
  mod_gzip_item_include file \.(html?|txt|css|js|php|pl)$
  mod_gzip_item_include handler ^cgi-script$
  mod_gzip_item_include mime ^text/.*
  mod_gzip_item_include mime ^application/x-javascript.*
  mod_gzip_item_exclude mime ^image/.*
  mod_gzip_item_exclude rspheader ^Content-Encoding:.*gzip.*
</IfModule>

# Configuración de caché para navegadores
<IfModule mod_headers.c>
  <FilesMatch "\.(ico|jpe?g|png|gif|swf|css|js|webp|svg|woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>
  
  <FilesMatch "\.(html|htm|php)$">
    Header set Cache-Control "max-age=3600, private, must-revalidate"
  </FilesMatch>
</IfModule>`;

  fs.writeFileSync(htaccessPath, htaccessContent, 'utf8');
  console.log('\n✓ Archivo .htaccess generado con configuraciones de seguridad');
}

// Ejecutar la función principal
applySecurityHeaders();
