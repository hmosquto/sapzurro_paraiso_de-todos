/**
 * Configuración de APIs para precios de vuelos
 * Instrucciones para obtener las API Keys gratuitas
 */

const API_CONFIG = {
    // 1. AMADEUS API (Gratuita para desarrolladores)
    // Registro: https://developers.amadeus.com/
    // Límite: 2000 llamadas/mes gratis
    amadeus: {
        apiKey: 'YOUR_AMADEUS_API_KEY',
        apiSecret: 'YOUR_AMADEUS_API_SECRET',
        baseUrl: 'https://test.api.amadeus.com',
        endpoints: {
            token: '/v1/security/oauth2/token',
            flights: '/v2/shopping/flight-offers'
        }
    },

    // 2. SKYSCANNER API (RapidAPI)
    // Registro: https://rapidapi.com/skyscanner/api/skyscanner-flight-search/
    // Límite: 500 llamadas/mes gratis
    skyscanner: {
        apiKey: 'YOUR_RAPIDAPI_KEY',
        baseUrl: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        endpoints: {
            quotes: '/apiservices/browsequotes/v1.0'
        }
    },

    // 3. AVIATIONSTACK API
    // Registro: https://aviationstack.com/
    // Límite: 1000 llamadas/mes gratis
    aviationstack: {
        apiKey: 'YOUR_AVIATIONSTACK_API_KEY',
        baseUrl: 'http://api.aviationstack.com/v1',
        endpoints: {
            flights: '/flights'
        }
    },

    // 4. FLIGHT API (Alternative)
    // Registro: https://www.flightapi.io/
    // Límite: 100 llamadas/mes gratis
    flightapi: {
        apiKey: 'YOUR_FLIGHTAPI_KEY',
        baseUrl: 'https://api.flightapi.io',
        endpoints: {
            search: '/search'
        }
    }
};

// Configuración de aeropuertos colombianos
const AIRPORTS = {
    // Principales
    'BOG': { name: 'El Dorado', city: 'Bogotá', region: 'Cundinamarca' },
    'MDE': { name: 'José María Córdova', city: 'Medellín', region: 'Antioquia' },
    'CLO': { name: 'Alfonso Bonilla Aragón', city: 'Cali', region: 'Valle del Cauca' },
    'CTG': { name: 'Rafael Núñez', city: 'Cartagena', region: 'Bolívar' },
    'BAQ': { name: 'Ernesto Cortissoz', city: 'Barranquilla', region: 'Atlántico' },
    
    // Cerca de Sapzurro
    'APO': { name: 'Antonio Roldán Betancourt', city: 'Apartadó', region: 'Antioquia' },
    'ACR': { name: 'Alcides Fernández', city: 'Acandí', region: 'Chocó' },
    'CPB': { name: 'Capurganá', city: 'Capurganá', region: 'Chocó' }
};

// Aerolíneas que operan en Colombia
const AIRLINES = {
    'AV': { name: 'Avianca', logo: '🛩️', website: 'https://www.avianca.com' },
    'VE': { name: 'Viva Air', logo: '✈️', website: 'https://www.vivaair.com' },
    'LA': { name: 'LATAM', logo: '🛫', website: 'https://www.latam.com' },
    '9R': { name: 'Satena', logo: '🚁', website: 'https://www.satena.com' },
    'EF': { name: 'EasyFly', logo: '🛩️', website: 'https://www.easyfly.com.co' },
    'WO': { name: 'Wingo', logo: '✈️', website: 'https://www.wingo.com' }
};

// Rutas principales a Sapzurro
const ROUTES_TO_SAPZURRO = {
    'BOG-APO': {
        origin: 'BOG',
        destination: 'APO',
        via: ['MDE'], // Conexión típica
        duration: '3-4 horas',
        frequency: 'Diaria',
        seasonality: {
            high: { months: [12, 1, 2, 3, 4], priceMultiplier: 1.3 },
            low: { months: [5, 6, 7, 8, 9, 10, 11], priceMultiplier: 0.8 }
        }
    },
    'MDE-APO': {
        origin: 'MDE',
        destination: 'APO',
        via: [],
        duration: '45 min',
        frequency: '2-3 vuelos/día',
        seasonality: {
            high: { months: [12, 1, 2, 3, 4], priceMultiplier: 1.2 },
            low: { months: [5, 6, 7, 8, 9, 10, 11], priceMultiplier: 0.9 }
        }
    }
};

// Instrucciones para configurar las APIs
const SETUP_INSTRUCTIONS = `
INSTRUCCIONES PARA CONFIGURAR LAS APIs DE VUELOS:

1. AMADEUS API (Recomendada - Más confiable)
   - Ir a: https://developers.amadeus.com/
   - Crear cuenta gratuita
   - Crear nueva aplicación
   - Copiar API Key y API Secret
   - Límite: 2000 llamadas/mes

2. SKYSCANNER API (RapidAPI)
   - Ir a: https://rapidapi.com/
   - Buscar "Skyscanner Flight Search"
   - Suscribirse al plan gratuito
   - Copiar la X-RapidAPI-Key
   - Límite: 500 llamadas/mes

3. AVIATIONSTACK API
   - Ir a: https://aviationstack.com/
   - Crear cuenta gratuita
   - Obtener API Key del dashboard
   - Límite: 1000 llamadas/mes

4. Configurar en flight-prices.js:
   - Reemplazar 'YOUR_API_KEY' con las claves reales
   - Probar con una llamada de prueba
   - Verificar que los precios se actualicen

NOTA: Las APIs tienen límites de llamadas. El sistema usa:
- Cache de 30 minutos para evitar llamadas excesivas
- Precios de respaldo cuando las APIs fallan
- Rotación entre múltiples APIs para mayor disponibilidad

Para producción, considera APIs de pago para mayor confiabilidad.
`;

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_CONFIG,
        AIRPORTS,
        AIRLINES,
        ROUTES_TO_SAPZURRO,
        SETUP_INSTRUCTIONS
    };
}

// Para uso en el navegador
if (typeof window !== 'undefined') {
    window.API_CONFIG = API_CONFIG;
    window.AIRPORTS = AIRPORTS;
    window.AIRLINES = AIRLINES;
    window.ROUTES_TO_SAPZURRO = ROUTES_TO_SAPZURRO;
}
