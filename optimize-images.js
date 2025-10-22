const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

const inputDir = path.join(__dirname, 'img');
const outputDir = path.join(__dirname, 'optimized_images');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Obtener lista de imágenes
const imageFiles = fs.readdirSync(inputDir)
  .filter(file => /.(jpg|jpeg|png)$/i.test(file));

console.log(`Encontradas ${imageFiles.length} imágenes para optimizar`);

// Función para optimizar una imagen
async function optimizeImage(filename) {
  const inputPath = path.join(inputDir, filename);
  const outputPath = path.join(outputDir, filename.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
  
  try {
    // Redimensionar y convertir a WebP
    await sharp(inputPath)
      .resize(1200, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(outputPath);
      
    console.log(`✓ Optimizada: ${filename} -> ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`✗ Error procesando ${filename}:`, error.message);
    return false;
  }
}

// Procesar todas las imágenes
async function processAllImages() {
  console.log('Iniciando optimización de imágenes...');
  
  for (const file of imageFiles) {
    await optimizeImage(file);
  }
  
  console.log('\n¡Optimización completada!');
  
  // Generar un archivo de resumen
  const originalSize = await getDirectorySize(inputDir);
  const optimizedSize = await getDirectorySize(outputDir);
  const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
  
  console.log('\nResumen de optimización:');
  console.log(`- Tamaño original: ${formatFileSize(originalSize)}`);
  console.log(`- Tamaño optimizado: ${formatFileSize(optimizedSize)}`);
  console.log(`- Ahorro: ${savings}%`);
}

// Función auxiliar para obtener el tamaño de un directorio
async function getDirectorySize(dir) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });
  const stats = await Promise.all(
    files.map(file => {
      const filePath = path.join(dir, file.name);
      return file.isDirectory() 
        ? getDirectorySize(filePath)
        : fs.promises.stat(filePath).then(stat => stat.size);
    })
  );
  return stats.reduce((total, size) => total + size, 0);
}

// Función para formatear el tamaño del archivo
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Iniciar el proceso
processAllImages().catch(console.error);
