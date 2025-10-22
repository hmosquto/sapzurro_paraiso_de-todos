const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const inputDir = __dirname;
const outputDir = path.join(__dirname, 'dist', 'js');

// Crear directorio de salida si no existe
if (!fs.existsSync(path.dirname(outputDir))) {
  fs.mkdirSync(path.dirname(outputDir), { recursive: true });
}
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

async function minifyJS() {
  try {
    console.log('Buscando archivos JavaScript...');
    
    // Encontrar todos los archivos JS, excluyendo node_modules y dist
    const jsFiles = await glob('**/*.js', { 
      cwd: inputDir,
      ignore: [
        'node_modules/**', 
        'dist/**',
        '**/*.min.js',
        'optimize-images.js',
        'minify-js.js',
        'minify-css.js'
      ]
    });

    console.log(`Encontrados ${jsFiles.length} archivos JavaScript para minificar`);

    let totalOriginalSize = 0;
    let totalMinifiedSize = 0;

    // Procesar cada archivo JS
    for (const file of jsFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace(/\.js$/, '.min.js'));
      
      // Crear directorios necesarios
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      // Leer el archivo original
      const code = fs.readFileSync(inputPath, 'utf8');
      const originalSize = Buffer.byteLength(code, 'utf8');
      totalOriginalSize += originalSize;

      // Minificar el JS
      const result = UglifyJS.minify(code, {
        output: {
          comments: /^!|(?:license|copyright)\b/i,
          beautify: false,
          preserve_line: false
        },
        compress: {
          drop_console: true,
          drop_debugger: true,
          ecma: 2015
        },
        mangle: {
          toplevel: true
        }
      });

      if (result.error) {
        console.error(`✗ Error al minificar ${file}:`, result.error);
        continue;
      }
      
      // Escribir el archivo minificado
      fs.writeFileSync(outputPath, result.code, 'utf8');
      
      const minifiedSize = Buffer.byteLength(result.code, 'utf8');
      totalMinifiedSize += minifiedSize;
      
      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
      
      console.log(`✓ ${file}: ${formatFileSize(originalSize)} → ${formatFileSize(minifiedSize)} (${savings}% reducido)`);
    }

    // Generar un archivo JS principal combinado
    await combineJSFiles();
    
    // Mostrar resumen
    console.log('\nResumen de minificación JavaScript:');
    console.log(`- Tamaño total original: ${formatFileSize(totalOriginalSize)}`);
    console.log(`- Tamaño total minificado: ${formatFileSize(totalMinifiedSize)}`);
    console.log(`- Ahorro total: ${((totalOriginalSize - totalMinifiedSize) / totalOriginalSize * 100).toFixed(2)}%`);

  } catch (error) {
    console.error('Error al minificar JavaScript:', error);
    process.exit(1);
  }
}

async function combineJSFiles() {
  try {
    const outputFile = path.join(outputDir, 'main.min.js');
    const jsFiles = [
      'script.js',
      'js/cost-calculator.js',
      'js/facebook-elegant-integration.js',
      'js/gallery-enhanced.js',
      'js/interactive-map.js',
      'js/jhohaka-gallery.js',
      'js/language-switcher-simple.js',
      'js/transport-prices-2025.js',
      'js/whatsapp-widget.js'
    ];
    
    let combinedJS = '';
    
    for (const file of jsFiles) {
      const filePath = path.join(inputDir, file);
      if (fs.existsSync(filePath)) {
        combinedJS += `\n/* ${file} */\n` + fs.readFileSync(filePath, 'utf8') + '\n;';
      }
    }
    
    // Minificar el JS combinado
    const result = UglifyJS.minify(combinedJS, {
      output: {
        comments: /^!|@license|@preserve|@cc_on/i,
        beautify: false
      },
      compress: {
        drop_console: true,
        drop_debugger: true,
        ecma: 2015
      },
      mangle: {
        toplevel: true
      }
    });
    
    if (result.error) {
      throw result.error;
    }
    
    fs.writeFileSync(outputFile, result.code, 'utf8');
    
    console.log(`\n✓ Archivo JS combinado creado: ${outputFile} (${formatFileSize(Buffer.byteLength(result.code, 'utf8'))})`);
    
  } catch (error) {
    console.error('Error al combinar archivos JavaScript:', error);
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Ejecutar la función principal
minifyJS();
