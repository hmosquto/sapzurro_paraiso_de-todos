# 🔧 Guía de Configuración Profesional de Facebook API

## 📋 Pasos para Integración Completa

### 1. 📱 Crear App de Facebook
1. Ir a [Facebook Developers Console](https://developers.facebook.com/apps/)
2. Hacer clic en "Crear app"
3. Seleccionar tipo "Business"
4. Completar información básica:
   - Nombre de la app: "Sapzurro Website"
   - Email de contacto: tu email
   - Propósito: "Mostrar contenido de página en sitio web"

### 2. 🔑 Configurar Productos y Permisos
1. En el Dashboard de tu app, ir a "Productos"
2. Agregar "Facebook Login"
3. Configurar dominios válidos:
   - Agregar tu dominio: `sapzurro.com`
   - Para desarrollo local: `localhost`

### 3. 🎯 Obtener Credenciales

#### App ID:
- En "Configuración básica" copiar el "Identificador de la app"

#### Page Access Token:
1. Ir a [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Seleccionar tu app en el dropdown
3. Generar "User Access Token" con permisos:
   - `pages_read_engagement`
   - `pages_show_list` 
   - `pages_manage_posts`
4. Usar el token para obtener Page Access Token:
   ```
   GET /{user-id}/accounts
   ```

#### Page ID:
- Ir a tu página de Facebook
- En "Acerca de" encontrar el ID de página
- O usar Graph API Explorer: `GET /{page-username}`

### 4. ⚙️ Configurar el Código

Editar `js/facebook-professional-integration.js`:

```javascript
this.config = {
    appId: 'TU_APP_ID_AQUI',           // Reemplazar
    pageId: 'TU_PAGE_ID_AQUI',         // Reemplazar  
    pageAccessToken: 'TU_TOKEN_AQUI',  // Reemplazar
    version: 'v19.0'
};
```

### 5. 🚀 Activar la Integración

En `index.html`, reemplazar:
```html
<!-- Cambiar esta línea -->
<script src="js/facebook-simple-integration.js" defer></script>

<!-- Por esta línea -->
<script src="js/facebook-professional-integration.js" defer></script>
```

### 6. ✅ Verificar Funcionamiento

1. Recargar la página web
2. Abrir consola del navegador (F12)
3. Verificar que aparezca: "✅ Datos de Facebook cargados correctamente"
4. El badge debe mostrar "En Vivo" en verde
5. Los posts deben actualizarse con contenido real

## 🔍 Solución de Problemas

### Error: "Token inválido"
- Verificar que el Page Access Token sea correcto
- Asegurar que los permisos estén aprobados
- Regenerar el token si es necesario

### Error: "App ID no encontrado"
- Verificar que el App ID sea correcto
- Asegurar que la app esté en modo "Live" (no Development)

### Error: "Página no encontrada"
- Verificar que el Page ID sea correcto
- Asegurar que tengas permisos de administrador en la página

## 📖 Recursos Adicionales

- [Documentación oficial de Pages API](https://developers.facebook.com/docs/pages-api/)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Guía de permisos](https://developers.facebook.com/docs/permissions/reference)
- [Debugging de Access Tokens](https://developers.facebook.com/tools/debug/accesstoken/)

## 🎯 Beneficios de la Integración Profesional

✅ **Posts en tiempo real** - Contenido actualizado automáticamente
✅ **Estadísticas reales** - Likes, comentarios y shares actuales  
✅ **Imágenes originales** - Fotos directas de Facebook
✅ **Información de página** - Seguidores y rating reales
✅ **Sin mantenimiento** - Se actualiza automáticamente

---

💡 **Tip**: Una vez configurado, el sistema funcionará automáticamente y se actualizará cada vez que publiques en Facebook.
