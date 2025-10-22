const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const SITE_URL = 'https://sapzurro.com';
const PAGES_DIR = __dirname;
const OUTPUT_DIR = __dirname;

// Configuración de páginas para el sitemap
const PAGES = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/hospedaje.html', changefreq: 'weekly', priority: 0.9 },
  { url: '/galeria.html', changefreq: 'weekly', priority: 0.8 },
  { url: '/contacto.html', changefreq: 'monthly', priority: 0.7 },
  { url: '/como-llegar.html', changefreq: 'monthly', priority: 0.7 }
];

// Generar sitemap.xml
async function generateSitemap() {
  console.log('Generando sitemap.xml...');
  
  const date = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  // Agregar páginas principales
  for (const page of PAGES) {
    sitemap += `  <url>
    <loc>${new URL(page.url, SITE_URL).href}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
  }

  sitemap += '</urlset>';
  
  const sitemapPath = path.join(OUTPUT_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  
  console.log(`✓ sitemap.xml generado en: ${sitemapPath}`);
  return sitemapPath;
}

// Generar robots.txt
async function generateRobotsTxt() {
  console.log('Generando robots.txt...');
  
  const robotsTxt = `# www.robotstxt.org/
# www.google.com/support/webmasters/bin/answer.py?hl=en&answer=156449

User-agent: *
Allow: /

Sitemap: ${new URL('sitemap.xml', SITE_URL).href}
`;
  
  const robotsPath = path.join(OUTPUT_DIR, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
  
  console.log(`✓ robots.txt generado en: ${robotsPath}`);
  return robotsPath;
}

// Mejorar meta tags en archivos HTML
async function enhanceMetaTags() {
  console.log('Mejorando meta tags en archivos HTML...');
  
  const htmlFiles = await glob('**/*.html', { 
    cwd: PAGES_DIR,
    ignore: ['node_modules/**', 'dist/**']
  });
  
  for (const file of htmlFiles) {
    const filePath = path.join(PAGES_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Obtener título de la página
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].replace('Sapzurro', '').trim() : '';
    
    // Configuración de meta tags por página
    const metaConfig = {
      title: pageTitle ? `${pageTitle} | Sapzurro Paraíso de Todos` : 'Sapzurro Paraíso de Todos',
      description: 'Descubre Sapzurro, un paraíso natural en el Chocó, Colombia. Playas cristalinas, naturaleza exuberante y aventuras inolvidables.',
      image: 'https://sapzurro.com/img/Imgane1.jpg',
      url: new URL(file === 'index.html' ? '/' : `/${file}`, SITE_URL).href,
      type: 'website',
      siteName: 'Sapzurro Paraíso de Todos',
      locale: 'es_CO',
      twitterCard: 'summary_large_image',
      twitterSite: '@sapzurro',
      themeColor: '#1a5f7a'
    };
    
    // Generar meta tags
    const metaTags = `
  <!-- Primary Meta Tags -->
  <title>${metaConfig.title}</title>
  <meta name="title" content="${metaConfig.title}">
  <meta name="description" content="${metaConfig.description}">
  <meta name="keywords" content="Sapzurro, Chocó, Colombia, turismo, playa, Caribe, naturaleza, hospedaje, tours">
  <meta name="author" content="Sapzurro Paraíso de Todos">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="${metaConfig.themeColor}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${metaConfig.type}">
  <meta property="og:url" content="${metaConfig.url}">
  <meta property="og:title" content="${metaConfig.title}">
  <meta property="og:description" content="${metaConfig.description}">
  <meta property="og:image" content="${metaConfig.image}">
  <meta property="og:site_name" content="${metaConfig.siteName}">
  <meta property="og:locale" content="${metaConfig.locale}">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="${metaConfig.twitterCard}">
  <meta property="twitter:url" content="${metaConfig.url}">
  <meta property="twitter:title" content="${metaConfig.title}">
  <meta property="twitter:description" content="${metaConfig.description}">
  <meta property="twitter:image" content="${metaConfig.image}">
  <meta property="twitter:site" content="${metaConfig.twitterSite}">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${metaConfig.url}">
`;
    
    // Reemplazar o agregar meta tags en el head
    if (content.includes('</head>')) {
      // Eliminar meta tags existentes
      content = content.replace(/<title>.*<\/title>/i, '');
      content = content.replace(/<meta[^>]*(name|property)=["'](title|description|keywords|author|robots|theme-color|og:[^"']*|twitter:[^"']*)[^>]*>/gi, '');
      content = content.replace(/<link[^>]*rel=["']canonical["'][^>]*>/i, '');
      
      // Insertar nuevos meta tags antes del cierre del head
      content = content.replace('</head>', `${metaTags}  </head>`);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Meta tags actualizados en: ${file}`);
    } else {
      console.warn(`⚠ No se pudo actualizar meta tags en: ${file} (etiqueta </head> no encontrada)`);
    }
  }
  
  console.log('✓ Meta tags actualizados en todos los archivos HTML');
}

// Función principal
async function optimizeSEO() {
  try {
    console.log('Iniciando optimización SEO...\n');
    
    await generateSitemap();
    console.log();
    
    await generateRobotsTxt();
    console.log();
    
    await enhanceMetaTags();
    
    console.log('\n✅ Optimización SEO completada con éxito!');
    
  } catch (error) {
    console.error('❌ Error durante la optimización SEO:', error);
    process.exit(1);
  }
}

// Ejecutar la función principal
optimizeSEO();
