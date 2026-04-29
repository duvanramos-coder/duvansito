# Instrucciones para integrar con Google Apps Script

Este dashboard ha sido reconstruido usando **React + Tailwind CSS** para lograr el diseño Premium solicitado. Para llevarlo a tu proyecto de Google Apps Script, sigue estos pasos:

## Opción A: Despliegue Automático (Recomendado)
Si tienes Node.js instalado, puedes generar los archivos necesarios ejecutando:
1. `npm install`
2. `npm run build`

Esto generará una carpeta `dist`. Los archivos dentro de `dist` son los que deben ir en Apps Script.

## Opción B: Estructura de archivos en GAS
Si prefieres hacerlo manualmente, debes crear los siguientes archivos en tu editor de Google Apps Script:

1. **Código.gs**: Mantén tus funciones actuales (`doGet`, `obtenerUsuarios`, `login`, `obtenerMetricas`, etc.).
2. **index.html**: Copia el contenido de `dist/index.html`.
3. **styles.html**: Crea este archivo y envuelve el CSS generado en etiquetas `<style>`.
4. **scripts.html**: Crea este archivo y envuelve el JS generado en etiquetas `<script>`.

### Cambios importantes realizados:
- **Lógica Intacta**: Se mantiene el uso de `google.script.run`.
- **Modo Local**: Si abres el proyecto fuera de GAS, usará datos de prueba (Mocks).
- **Colores**: Se usó estrictamente #2D2852 (Navy) y #B9E22B (Lime Green).
- **UI**: Bordes de 32px y sombras suaves como se solicitó.

---
*Desarrollado por Jules Engineer*
