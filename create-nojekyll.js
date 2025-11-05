const fs = require('fs');

try {
  // Asegurarse de que el directorio 'out' exista
  if (!fs.existsSync('out')) {
    fs.mkdirSync('out', { recursive: true });
  }
  // Escribir un archivo vacío
  fs.writeFileSync('out/.nojekyll', '');
  console.log('.nojekyll creado con éxito.');
} catch (err) {
  console.error('Error al crear .nojekyll:', err);
  process.exit(1);
}