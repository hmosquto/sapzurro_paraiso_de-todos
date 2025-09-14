# Auditoría de CSS - Código Sin Utilizar

## Clases CSS Definidas en styles.css vs Uso en HTML

### ✅ CLASES UTILIZADAS CORRECTAMENTE:

#### **Navegación y Header:**
- `.menu` ✓ (usado en ambas páginas)
- `.hero` ✓ (usado en ambas páginas)
- `.hero-bg` ✓ (usado en ambas páginas)
- `.hero-content` ✓ (usado en ambas páginas)
- `.hero-titulo` ✓ (usado en ambas páginas)
- `.hero-marquee` ✓ (usado en ambas páginas)
- `.menu-toggle` ✓ (usado en index.html)

#### **Secciones Principales:**
- `.bienvenida` ✓ (usado en index.html)
- `.bienvenida-contenido` ✓ (usado en index.html)
- `.bienvenida-texto` ✓ (usado en index.html)
- `.bienvenida-imagen` ✓ (usado en index.html)
- `.imagen-principal` ✓ (usado en index.html)
- `.mini-galeria` ✓ (usado en index.html)

#### **Galería:**
- `.galeria-preview` ✓ (usado en index.html)
- `.galeria-filtros` ✓ (usado en index.html)
- `.galeria-grid` ✓ (usado en index.html)
- `.filtro-activo` ✓ (usado en index.html)

#### **Actividades:**
- `.actividades` ✓ (usado en index.html)
- `.actividades-grid` ✓ (usado en index.html)
- `.actividad` ✓ (usado en index.html)
- `.actividad-icon` ✓ (usado en index.html)
- `.actividad-precio` ✓ (usado en index.html)
- `.actividades-cta` ✓ (usado en index.html)

#### **Como Llegar:**
- `.como-llegar-home` ✓ (usado en index.html)
- `.ruta-completa-detallada` ✓ (usado en index.html)
- `.fila-pasos` ✓ (usado en index.html)
- `.primera-fila` ✓ (usado en index.html)
- `.paso-detallado` ✓ (usado en index.html)
- `.paso-header` ✓ (usado en index.html)
- `.paso-numero` ✓ (usado en index.html)
- `.precio-principal` ✓ (usado en index.html)
- `.aereolineas-lista` ✓ (usado en index.html)
- `.aerolinea` ✓ (usado en index.html)

#### **Como-llegar.html específico:**
- `.transporte-opciones` ✓ (usado en como-llegar.html)
- `.opciones-grid` ✓ (usado en como-llegar.html)
- `.opcion-transporte` ✓ (usado en como-llegar.html)
- `.rutas-principales` ✓ (usado en como-llegar.html)
- `.ruta-detallada` ✓ (usado en como-llegar.html)
- `.ruta-opciones` ✓ (usado en como-llegar.html)
- `.opcion-ruta` ✓ (usado en como-llegar.html)
- `.ruta-pasos` ✓ (usado en como-llegar.html)
- `.paso` ✓ (usado en como-llegar.html)
- `.paso-contenido` ✓ (usado en como-llegar.html)

### ⚠️ CLASES POTENCIALMENTE SIN USO:

#### **Lightbox y Modales:**
- `.lightbox` ⚠️ (definido pero no se ve uso directo en HTML)
- `.lightbox-img` ⚠️ (definido pero no se ve uso directo en HTML)
- `.lightbox-caption` ⚠️ (definido pero no se ve uso directo en HTML)
- `.lightbox-close` ⚠️ (definido pero no se ve uso directo en HTML)
- `.modal-publicidad` ⚠️ (definido pero no se ve uso directo en HTML)
- `.modal-contenido` ⚠️ (definido pero no se ve uso directo en HTML)
- `.modal-cerrar` ⚠️ (definido pero no se ve uso directo en HTML)

#### **Toast y Promociones:**
- `.toast-promo` ⚠️ (definido pero no se ve uso directo en HTML)
- `.toast-close` ⚠️ (definido pero no se ve uso directo en HTML)
- `.toast-link` ⚠️ (definido pero no se ve uso directo en HTML)

#### **Secciones Destacados:**
- `.destacados` ⚠️ (definido pero no se ve en HTML actual)
- `.destacados-grid` ⚠️ (definido pero no se ve en HTML actual)
- `.destacado` ⚠️ (definido pero no se ve en HTML actual)

#### **Breadcrumbs:**
- `.breadcrumb` ✓ (usado en index.html)
- `.breadcrumb-list` ✓ (usado en index.html)
- `.breadcrumb-item` ✓ (usado en index.html)

#### **Skip Links:**
- `.skip-links` ✓ (usado en index.html)
- `.skip-link` ✓ (usado en index.html)

### 🔧 CÓDIGO DUPLICADO ENCONTRADO:

#### **Estilos de Botones:**
- Múltiples definiciones de `.boton` con ligeras variaciones
- `.boton-principal`, `.boton-secundario`, `.boton-reserva` con estilos similares

#### **Estilos de Precios:**
- `.precio-destacado` y `.precio-principal` tienen funcionalidad similar
- `.precio-grande` y `.precio` con estilos parecidos

#### **Efectos Hover:**
- Muchos elementos tienen efectos hover similares que podrían unificarse

### 📊 RESUMEN DE OPTIMIZACIÓN:

**Total de clases CSS:** ~150+
**Clases utilizadas:** ~120
**Clases sin uso aparente:** ~30
**Código duplicado:** ~15-20 instancias

### 🎯 RECOMENDACIONES:

1. **Mantener clases de JavaScript:** Lightbox, modales y toast pueden ser usados por JavaScript
2. **Eliminar sección destacados:** Si no se usa en ninguna página
3. **Unificar estilos de botones:** Crear clases base y modificadores
4. **Consolidar efectos hover:** Usar clases utilitarias
5. **Revisar media queries:** Algunos pueden estar duplicados

### ⚡ IMPACTO EN RENDIMIENTO:

- **Tamaño actual:** ~2500+ líneas CSS
- **Optimización posible:** ~15-20% reducción
- **Beneficios:** Carga más rápida, mantenimiento más fácil
