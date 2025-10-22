const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const inputDir = __dirname;
const outputDir = path.join(__dirname, 'dist', 'css');

// Crear directorio de salida si no existe
if (!fs.existsSync(path.dirname(outputDir))) {
  fs.mkdirSync(path.dirname(outputDir), { recursive: true });
}
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Configuración de clean-css
const cleanCSS = new CleanCSS({
  level: 2,
  format: 'keep-breaks',
  returnPromise: true
});

async function minifyCSS() {
  try {
    console.log('Buscando archivos CSS...');
    
    // Encontrar todos los archivos CSS
    const cssFiles = await glob('**/*.css', { 
      cwd: inputDir,
      ignore: ['node_modules/**', 'dist/**']
    });

    console.log(`Encontrados ${cssFiles.length} archivos CSS para minificar`);

    let totalOriginalSize = 0;
    let totalMinifiedSize = 0;

    // Procesar cada archivo CSS
    for (const file of cssFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);
      
      // Crear directorios necesarios
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      // Leer el archivo original
      const css = fs.readFileSync(inputPath, 'utf8');
      const originalSize = Buffer.byteLength(css, 'utf8');
      totalOriginalSize += originalSize;

      // Minificar el CSS
      const output = await cleanCSS.minify(css);
      
      // Escribir el archivo minificado
      fs.writeFileSync(outputPath, output.styles, 'utf8');
      
      const minifiedSize = Buffer.byteLength(output.styles, 'utf8');
      totalMinifiedSize += minifiedSize;
      
      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
      
      console.log(`✓ ${file}: ${formatFileSize(originalSize)} → ${formatFileSize(minifiedSize)} (${savings}% reducido)`);
    }

    // Generar un archivo CSS principal combinado
    await combineCSSFiles();
    
    // Mostrar resumen
    console.log('\nResumen de minificación CSS:');
    console.log(`- Tamaño total original: ${formatFileSize(totalOriginalSize)}`);
    console.log(`- Tamaño total minificado: ${formatFileSize(totalMinifiedSize)}`);
    console.log(`- Ahorro total: ${((totalOriginalSize - totalMinifiedSize) / totalOriginalSize * 100).toFixed(2)}%`);

  } catch (error) {
    console.error('Error al minificar CSS:', error);
    process.exit(1);
  }
}

async function combineCSSFiles() {
  try {
    const outputFile = path.join(outputDir, 'main.min.css');
    const cssFiles = [
      'styles.css',
      'css/facebook-elegant-styles.css',
      'css/map-expanded-styles.css',
      'css/como-llegar-styles.css',
      'css/contacto-styles.css',
      'css/facebook-styles.css',
      'css/galeria-styles.css',
      'css/hospedaje-styles.css'
    ];
    
    let combinedCSS = '';
    
    for (const file of cssFiles) {
      const filePath = path.join(inputDir, file);
      if (fs.existsSync(filePath)) {
        combinedCSS += `\n/* ${file} */\n` + fs.readFileSync(filePath, 'utf8');
      }
    }
    
    // Minificar el CSS combinado
    const output = await cleanCSS.minify(combinedCSS);
    fs.writeFileSync(outputFile, output.styles, 'utf8');
    
    console.log(`\n✓ Archivo CSS combinado creado: ${outputFile} (${formatFileSize(Buffer.byteLength(output.styles, 'utf8'))})`);
    
  } catch (error) {
    console.error('Error al combinar archivos CSS:', error);
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
minifyCSS();
