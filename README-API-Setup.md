# 🛩️ Sistema de Precios Dinámicos de Vuelos - Sapzurro

## ✅ ¿Qué se ha implementado?

He creado un sistema completo para automatizar los precios de vuelos desde diferentes aerolíneas hacia Sapzurro. El sistema incluye:

### 📁 Archivos creados:
- `js/flight-prices.js` - Motor principal del sistema
- `config/api-config.js` - Configuración de APIs
- Integración en `como-llegar.html` - Precios dinámicos en la página

### 🔧 Características del sistema:

1. **APIs Integradas:**
   - Amadeus API (2000 llamadas/mes gratis)
   - Skyscanner API (500 llamadas/mes gratis)
   - AviationStack API (1000 llamadas/mes gratis)
   - Flight API (100 llamadas/mes gratis)

2. **Funcionalidades:**
   - ✅ Precios en tiempo real de múltiples aerolíneas
   - ✅ Cache inteligente (30 minutos) para optimizar llamadas
   - ✅ Precios de respaldo cuando las APIs fallan
   - ✅ Comparación automática para mostrar mejor precio
   - ✅ Actualización manual con botón de refresh
   - ✅ Responsive y optimizado para móviles

3. **Aerolíneas incluidas:**
   - Avianca 🛩️
   - Viva Air ✈️
   - LATAM 🛫
   - Satena 🚁
   - EasyFly 🛩️
   - Wingo ✈️

## 🚀 Cómo activar el sistema:

### Paso 1: Obtener API Keys (GRATIS)

#### Amadeus API (Recomendada):
1. Ir a: https://developers.amadeus.com/
2. Crear cuenta gratuita
3. Crear nueva aplicación
4. Copiar API Key y API Secret
5. **Límite:** 2000 llamadas/mes gratis

#### Skyscanner API:
1. Ir a: https://rapidapi.com/
2. Buscar "Skyscanner Flight Search"
3. Suscribirse al plan gratuito
4. Copiar X-RapidAPI-Key
5. **Límite:** 500 llamadas/mes gratis

### Paso 2: Configurar las claves

Editar el archivo `js/flight-prices.js` líneas 8-12:

```javascript
this.apiKeys = {
    amadeus: 'TU_AMADEUS_API_KEY_AQUI',
    skyscanner: 'TU_RAPIDAPI_KEY_AQUI',
    aviationstack: 'TU_AVIATIONSTACK_KEY_AQUI'
};
```

### Paso 3: Probar el sistema

1. Abrir `como-llegar.html` en el navegador
2. Los precios se cargarán automáticamente
3. Usar el botón 🔄 para actualizar manualmente
4. Verificar que aparezcan las aerolíneas con precios

## 📊 Cómo funciona:

### Flujo automático:
1. **Al cargar la página:** Se consultan las APIs automáticamente
2. **Cache:** Los precios se guardan por 30 minutos
3. **Respaldo:** Si las APIs fallan, usa precios estimados
4. **Actualización:** Cada 30 minutos se refrescan automáticamente

### Datos mostrados:
- **Precio más bajo** destacado en verde
- **Aerolínea** con logo
- **Duración** del vuelo
- **Indicador** si es precio estimado
- **Última actualización** timestamp

## 🎯 Beneficios:

✅ **Para los visitantes:**
- Precios actualizados en tiempo real
- Comparación automática de aerolíneas
- Información confiable para planificar viajes

✅ **Para el sitio web:**
- Contenido dinámico y actualizado
- Mayor engagement de usuarios
- Posicionamiento como fuente confiable

✅ **Técnicos:**
- Sistema robusto con respaldos
- Optimizado para no exceder límites de API
- Fácil mantenimiento y expansión

## 🔧 Personalización:

### Agregar más aerolíneas:
Editar `airlines` array en `flight-prices.js`:
```javascript
{ code: 'XX', name: 'Nueva Aerolínea', logo: '🛩️' }
```

### Cambiar frecuencia de actualización:
Modificar línea 384 en `flight-prices.js`:
```javascript
// Cambiar 30 * 60 * 1000 por el tiempo deseado en milisegundos
setInterval(() => { ... }, 30 * 60 * 1000);
```

### Agregar más rutas:
Expandir el objeto `routes` con nuevos destinos.

## 🚨 Importante:

- **APIs gratuitas** tienen límites de llamadas
- **Cache** evita exceder estos límites
- **Precios de respaldo** garantizan que el sitio siempre funcione
- Para **producción intensiva**, considerar APIs de pago

## 📱 Responsive:

El sistema está completamente optimizado para:
- 📱 Móviles
- 💻 Tablets  
- 🖥️ Desktop

## 🆘 Soporte:

Si necesitas ayuda configurando las APIs o personalizando el sistema, puedo asistirte con:
- Configuración de cuentas API
- Personalización de aerolíneas
- Ajustes de diseño
- Resolución de problemas

¡El sistema está listo para usar! Solo necesitas las API keys para activar los precios en tiempo real.
