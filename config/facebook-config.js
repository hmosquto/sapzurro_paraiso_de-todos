// Configuración de Facebook API para Sapzurro 2025
const FacebookConfig = {
    // CONFIGURACIÓN PRINCIPAL - ACTUALIZAR CON CREDENCIALES REALES
    appId: 'YOUR_FACEBOOK_APP_ID', // Reemplazar con App ID real
    version: 'v18.0',
    pageId: 'sapzurroparaisodetodos', // ID de página de Facebook
    accessToken: 'YOUR_PAGE_ACCESS_TOKEN', // Token de acceso de página
    
    // CONFIGURACIÓN DE POSTS
    postsLimit: 3,
    fields: 'id,message,created_time,picture,full_picture,likes.summary(true),comments.summary(true),shares,permalink_url',
    
    // URLs DE LA API
    baseUrl: 'https://graph.facebook.com/v18.0',
    
    // CONFIGURACIÓN DE PERMISOS NECESARIOS
    permissions: [
        'pages_read_engagement',
        'pages_show_list',
        'pages_read_user_content'
    ],
    
    // CONFIGURACIÓN DE CACHÉ Y RENDIMIENTO
    cacheTimeout: 15 * 60 * 1000, // 15 minutos para contenido más fresco
    maxRetries: 3,
    retryDelay: 2000,
    
    // CONFIGURACIÓN DE FALLBACK
    fallbackEnabled: true,
    fallbackPosts: [
        {
            id: 'demo_1',
            message: '¡Buenos días desde Sapzurro! El paraíso te espera con playas cristalinas y naturaleza exuberante.',
            created_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            picture: 'img/Imgane1.jpg',
            likes: { summary: { total_count: 127 } },
            comments: { summary: { total_count: 23 } },
            shares: { count: 15 }
        },
        {
            id: 'demo_2',
            message: 'Descubre la increíble biodiversidad marina de Sapzurro. Snorkeling y buceo en aguas cristalinas.',
            created_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            picture: 'img/Imgane10.jpg',
            likes: { summary: { total_count: 89 } },
            comments: { summary: { total_count: 18 } },
            shares: { count: 12 }
        },
        {
            id: 'demo_3',
            message: 'Atardeceres mágicos en Sapzurro. Cada día un espectáculo único de colores y tranquilidad.',
            created_time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            picture: 'img/Imgane11.jpg',
            likes: { summary: { total_count: 156 } },
            comments: { summary: { total_count: 31 } },
            shares: { count: 22 }
        }
    ],
    
    // CONFIGURACIÓN DE PÁGINA
    pageFields: 'fan_count,rating_count,overall_star_rating,name,about,website,phone,location',
    
    // CONFIGURACIÓN DE ACTUALIZACIÓN AUTOMÁTICA
    autoRefreshInterval: 30 * 60 * 1000, // 30 minutos
    
    // CONFIGURACIÓN DE DEBUG
    debugMode: false, // Cambiar a true para logs detallados
    
    // INSTRUCCIONES DE CONFIGURACIÓN
    setupInstructions: {
        step1: "Crear App en Facebook Developers (https://developers.facebook.com/)",
        step2: "Obtener App ID de la configuración básica",
        step3: "Generar Page Access Token en Graph API Explorer",
        step4: "Configurar permisos: pages_read_engagement, pages_show_list",
        step5: "Actualizar appId y accessToken en este archivo",
        step6: "Verificar pageId corresponde a la página de Sapzurro",
        note: "Mientras no se configuren credenciales reales, se usará contenido demo"
    }
};

// Función para validar configuración
FacebookConfig.validate = function() {
    const issues = [];
    
    if (this.appId === 'YOUR_FACEBOOK_APP_ID') {
        issues.push('App ID no configurado');
    }
    
    if (this.accessToken === 'YOUR_PAGE_ACCESS_TOKEN') {
        issues.push('Access Token no configurado');
    }
    
    if (issues.length > 0) {
        console.warn('⚠️ Facebook API no configurado completamente:', issues);
        console.log('📋 Instrucciones de configuración:', this.setupInstructions);
        return false;
    }
    
    return true;
};

// Función para obtener URL de API
FacebookConfig.getApiUrl = function(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    
    // Agregar access token
    params.access_token = this.accessToken;
    
    // Agregar parámetros
    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });
    
    return url.toString();
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FacebookConfig;
} else {
    window.FacebookConfig = FacebookConfig;
}

// Exportar configuración
window.FacebookConfig = FacebookConfig;
