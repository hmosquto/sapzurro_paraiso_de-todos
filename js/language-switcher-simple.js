/**
 * Sistema de Cambio de Idioma Simplificado para Sapzurro
 * Español ↔ Inglés
 */

// Variables globales
let currentLang = 'es';
const translations = {
    es: {
        // Navegación
        'Inicio': 'Inicio',
        'Cómo Llegar': 'Cómo Llegar',
        'Hospedaje': 'Hospedaje',
        'Galería': 'Galería',
        'Contacto': 'Contacto',
        
        // Hero
        'Sapzurro Paraíso de Todos': 'Sapzurro Paraíso de Todos',
        'Bienvenidos a Sapzurro, el rincón del paraíso que todos soñamos': 'Bienvenidos a Sapzurro, el rincón del paraíso que todos soñamos',
        'Ver Galería': 'Ver Galería',
        
        // Bienvenida
        'Bienvenidos a Sapzurro': 'Bienvenidos a Sapzurro',
        'Ubicado en el extremo norte del departamento del Chocó, en el municipio de Acandí, Sapzurro es un corregimiento que se distingue por su belleza natural excepcional, su rica herencia cultural afrocaribeña y la calidez incomparable de su gente.': 'Ubicado en el extremo norte del departamento del Chocó, en el municipio de Acandí, Sapzurro es un corregimiento que se distingue por su belleza natural excepcional, su rica herencia cultural afrocaribeña y la calidez incomparable de su gente.',
        'Un paraíso donde el Caribe colombiano se encuentra con la frontera panameña, ofreciendo experiencias únicas de ecoturismo, playas cristalinas y aventuras inolvidables.': 'Un paraíso donde el Caribe colombiano se encuentra con la frontera panameña, ofreciendo experiencias únicas de ecoturismo, playas cristalinas y aventuras inolvidables.',
        
        // Galería
        'Explora Sapzurro en Imágenes': 'Explora Sapzurro en Imágenes',
        'Todas': 'Todas',
        'Playas': 'Playas',
        'Naturaleza': 'Naturaleza',
        'Comunidad': 'Comunidad',
        
        // Actividades
        'Experiencias Únicas en Sapzurro': 'Experiencias Únicas en Sapzurro',
        'Snorkel en La Miel': 'Snorkel en La Miel',
        'Explora los arrecifes de coral y la vida marina en aguas cristalinas': 'Explora los arrecifes de coral y la vida marina en aguas cristalinas',
        'Tour en Lancha': 'Tour en Lancha',
        'Recorre la costa y descubre playas escondidas del Caribe': 'Recorre la costa y descubre playas escondidas del Caribe',
        'Senderismo Ecológico': 'Senderismo Ecológico',
        'Caminatas por senderos naturales con vistas espectaculares': 'Caminatas por senderos naturales con vistas espectaculares',
        'Pesca Deportiva': 'Pesca Deportiva',
        'Experiencia de pesca en alta mar con guías locales expertos': 'Experiencia de pesca en alta mar con guías locales expertos',
        'Observación de Aves': 'Observación de Aves',
        'Descubre la rica biodiversidad de aves tropicales': 'Descubre la rica biodiversidad de aves tropicales',
        'Kayak y Paddleboard': 'Kayak y Paddleboard',
        'Explora bahías tranquilas y manglares en kayak': 'Explora bahías tranquilas y manglares en kayak',
        
        // Cómo llegar
        'Cómo Llegar a Sapzurro': 'Cómo Llegar a Sapzurro',
        'Vuelos': 'Vuelos',
        'Desde': 'Desde',
        'Transporte Terrestre': 'Transporte Terrestre',
        'Transporte Marítimo': 'Transporte Marítimo',
        
        // Mapa
        'Ubicación y Puntos de Interés': 'Ubicación y Puntos de Interés',
        'Explora los lugares más hermosos de Sapzurro': 'Explora los lugares más hermosos de Sapzurro',
        'Playa Principal': 'Playa Principal',
        'Arena blanca y aguas cristalinas perfectas para relajarse': 'Arena blanca y aguas cristalinas perfectas para relajarse',
        'Sendero Costero': 'Sendero Costero',
        'Caminata escénica hacia Capurganá por la playa': 'Caminata escénica hacia Capurganá por la playa',
        'Arrecife de Coral': 'Arrecife de Coral',
        'Snorkeling y buceo con vida marina diversa': 'Snorkeling y buceo con vida marina diversa',
        'Mirador del Atardecer': 'Mirador del Atardecer',
        'Vista panorámica espectacular al final del día': 'Vista panorámica espectacular al final del día',
        'Pueblo de Pescadores': 'Pueblo de Pescadores',
        'Cultura auténtica y gastronomía local': 'Cultura auténtica y gastronomía local',
        'Selva Tropical': 'Selva Tropical',
        'Biodiversidad única y senderos ecológicos': 'Biodiversidad única y senderos ecológicos',
        
        // Calculadora de costos
        'Calculadora de Costos': 'Calculadora de Costos',
        'Planifica tu viaje': 'Planifica tu viaje',
        'Número de personas': 'Número de personas',
        'Noches de hospedaje': 'Noches de hospedaje',
        'Tipo de hospedaje': 'Tipo de hospedaje',
        'Actividades': 'Actividades',
        'Calcular Costo Total': 'Calcular Costo Total',
        
        // Facebook
        'Síguenos en Facebook': 'Síguenos en Facebook',
        'Mantente conectado con Sapzurro': 'Mantente conectado con Sapzurro',
        
        // Gallery page translations
        'Descubre la belleza del Caribe colombiano a través de imágenes': 'Discover the beauty of the Colombian Caribbean through images',
        'Explora Sapzurro en Imágenes': 'Explore Sapzurro in Images',
        'Filtrar por categoría': 'Filter by category',
        'Todas': 'All',
        'Playas': 'Beaches',
        'Naturaleza': 'Nature',
        'Comunidad': 'Community',
        'Atardeceres': 'Sunsets',
        'Actividades': 'Activities',
        
        // Contact page translations
        'Estamos aquí para hacer realidad tu viaje al paraíso': 'We are here to make your trip to paradise come true',
        'Información de Contacto': 'Contact Information',
        'Dirección': 'Address',
        'Teléfono': 'Phone',
        'Email': 'Email',
        'Horarios de Atención': 'Business Hours',
        'Lunes a Viernes': 'Monday to Friday',
        'Sábados': 'Saturdays',
        'Domingos': 'Sundays',
        'Formulario de Contacto': 'Contact Form',
        'Nombre': 'Name',
        'Correo Electrónico': 'Email Address',
        'Mensaje': 'Message',
        'Enviar': 'Send',
        'Redes Sociales': 'Social Media',
        'Síguenos en nuestras redes sociales': 'Follow us on social media'
    },
    en: {
        // Navegación
        'Inicio': 'Home',
        'Cómo Llegar': 'How to Get There',
        'Hospedaje': 'Accommodation',
        'Galería': 'Gallery',
        'Contacto': 'Contact',
        
        // Hero
        'Sapzurro Paraíso de Todos': 'Sapzurro Paradise for Everyone',
        'Bienvenidos a Sapzurro, el rincón del paraíso que todos soñamos': 'Welcome to Sapzurro, the corner of paradise we all dream of',
        'Ver Galería': 'View Gallery',
        
        // Bienvenida
        'Bienvenidos a Sapzurro': 'Welcome to Sapzurro',
        'Ubicado en el extremo norte del departamento del Chocó, en el municipio de Acandí, Sapzurro es un corregimiento que se distingue por su belleza natural excepcional, su rica herencia cultural afrocaribeña y la calidez incomparable de su gente.': 'Located in the far north of the Chocó department, in the municipality of Acandí, Sapzurro is a village distinguished by its exceptional natural beauty, rich Afro-Caribbean cultural heritage and the incomparable warmth of its people.',
        'Un paraíso donde el Caribe colombiano se encuentra con la frontera panameña, ofreciendo experiencias únicas de ecoturismo, playas cristalinas y aventuras inolvidables.': 'A paradise where the Colombian Caribbean meets the Panamanian border, offering unique ecotourism experiences, crystal clear beaches and unforgettable adventures.',
        
        // Galería
        'Explora Sapzurro en Imágenes': 'Explore Sapzurro in Images',
        'Todas': 'All',
        'Playas': 'Beaches',
        'Naturaleza': 'Nature',
        'Comunidad': 'Community',
        
        // Actividades
        'Experiencias Únicas en Sapzurro': 'Unique Experiences in Sapzurro',
        'Snorkel en La Miel': 'Snorkeling at La Miel',
        'Explora los arrecifes de coral y la vida marina en aguas cristalinas': 'Explore coral reefs and marine life in crystal clear waters',
        'Tour en Lancha': 'Boat Tour',
        'Recorre la costa y descubre playas escondidas del Caribe': 'Tour the coast and discover hidden Caribbean beaches',
        'Senderismo Ecológico': 'Ecological Hiking',
        'Caminatas por senderos naturales con vistas espectaculares': 'Hikes through natural trails with spectacular views',
        'Pesca Deportiva': 'Sport Fishing',
        'Experiencia de pesca en alta mar con guías locales expertos': 'Deep sea fishing experience with expert local guides',
        'Observación de Aves': 'Bird Watching',
        'Descubre la rica biodiversidad de aves tropicales': 'Discover the rich biodiversity of tropical birds',
        'Kayak y Paddleboard': 'Kayak and Paddleboard',
        'Explora bahías tranquilas y manglares en kayak': 'Explore quiet bays and mangroves by kayak',
        
        // Cómo llegar
        'Cómo Llegar a Sapzurro': 'How to Get to Sapzurro',
        'Vuelos': 'Flights',
        'Desde': 'From',
        'Transporte Terrestre': 'Ground Transportation',
        'Transporte Marítimo': 'Maritime Transportation',
        
        // Mapa
        'Ubicación y Puntos de Interés': 'Location and Points of Interest',
        'Explora los lugares más hermosos de Sapzurro': 'Explore the most beautiful places in Sapzurro',
        'Playa Principal': 'Main Beach',
        'Arena blanca y aguas cristalinas perfectas para relajarse': 'White sand and crystal clear waters perfect for relaxing',
        'Sendero Costero': 'Coastal Trail',
        'Caminata escénica hacia Capurganá por la playa': 'Scenic walk to Capurganá along the beach',
        'Arrecife de Coral': 'Coral Reef',
        'Snorkeling y buceo con vida marina diversa': 'Snorkeling and diving with diverse marine life',
        'Mirador del Atardecer': 'Sunset Viewpoint',
        'Vista panorámica espectacular al final del día': 'Spectacular panoramic view at the end of the day',
        'Pueblo de Pescadores': 'Fishing Village',
        'Cultura auténtica y gastronomía local': 'Authentic culture and local gastronomy',
        'Selva Tropical': 'Tropical Jungle',
        'Biodiversidad única y senderos ecológicos': 'Unique biodiversity and ecological trails',
        
        // Calculadora de costos
        'Calculadora de Costos': 'Cost Calculator',
        'Planifica tu viaje': 'Plan your trip',
        'Número de personas': 'Number of people',
        'Noches de hospedaje': 'Accommodation nights',
        'Tipo de hospedaje': 'Type of accommodation',
        'Actividades': 'Activities',
        'Calcular Costo Total': 'Calculate Total Cost',
        
        // Facebook
        'Síguenos en Facebook': 'Follow us on Facebook',
        'Mantente conectado con Sapzurro': 'Stay connected with Sapzurro',
        
        // Gallery page translations
        'Descubre la belleza del Caribe colombiano a través de imágenes': 'Discover the beauty of the Colombian Caribbean through images',
        'Explora Sapzurro en Imágenes': 'Explore Sapzurro in Images',
        'Filtrar por categoría': 'Filter by category',
        'Todas': 'All',
        'Playas': 'Beaches',
        'Naturaleza': 'Nature',
        'Comunidad': 'Community',
        'Atardeceres': 'Sunsets',
        'Actividades': 'Activities',
        
        // Contact page translations
        'Estamos aquí para hacer realidad tu viaje al paraíso': 'We are here to make your trip to paradise come true',
        'Información de Contacto': 'Contact Information',
        'Dirección': 'Address',
        'Teléfono': 'Phone',
        'Email': 'Email',
        'Horarios de Atención': 'Business Hours',
        'Lunes a Viernes': 'Monday to Friday',
        'Sábados': 'Saturdays',
        'Domingos': 'Sundays',
        'Formulario de Contacto': 'Contact Form',
        'Nombre': 'Name',
        'Correo Electrónico': 'Email Address',
        'Mensaje': 'Message',
        'Enviar': 'Send',
        'Redes Sociales': 'Social Media',
        'Síguenos en nuestras redes sociales': 'Follow us on social media'
    }
};

// Función para cambiar idioma
function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    console.log('Cambiando idioma a:', currentLang);
    translatePage();
    updateLanguageButton();
    saveLanguagePreference();
}

// Función para traducir la página
function translatePage() {
    const trans = translations[currentLang];
    console.log('Traduciendo página a:', currentLang);
    
    // Traducir elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        if (trans[key]) {
            const currentText = element.textContent || element.innerHTML;
            // Preservar iconos
            const iconMatch = currentText.match(/^(\p{Emoji}+\s*)/u);
            const icon = iconMatch ? iconMatch[1] : '';
            
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = trans[key];
            } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = trans[key];
            } else if (icon && element.tagName === 'A') {
                element.innerHTML = `${icon}${trans[key]}`;
            } else {
                element.textContent = trans[key];
            }
            console.log('Traducido:', key, '->', trans[key]);
        } else {
            console.log('No encontrado:', key);
        }
    });
    
    // Traducir navegación sin data-translate
    document.querySelectorAll('nav a:not([data-translate])').forEach(link => {
        const text = link.textContent.trim().replace('🏠 ', '');
        if (trans[text]) {
            if (text === 'Inicio') {
                link.innerHTML = `🏠 ${trans[text]}`;
            } else {
                link.textContent = trans[text];
            }
        }
    });
    
    // Traducir título principal
    const mainTitle = document.querySelector('.hero-titulo');
    if (mainTitle && trans['Sapzurro Paraíso de Todos']) {
        const translated = trans['Sapzurro Paraíso de Todos'];
        if (translated.includes('Paradise')) {
            mainTitle.innerHTML = `Sapzurro <span>Paradise for Everyone</span>`;
        } else {
            mainTitle.innerHTML = `Sapzurro <span>Paraíso de Todos</span>`;
        }
    }
    
    // Traducir subtítulo hero
    const heroMarquee = document.querySelector('.hero-marquee span');
    if (heroMarquee && trans['Bienvenidos a Sapzurro, el rincón del paraíso que todos soñamos']) {
        heroMarquee.textContent = trans['Bienvenidos a Sapzurro, el rincón del paraíso que todos soñamos'];
    }
    
    // Traducir botón Ver Galería
    const galeriaBtn = document.querySelector('.cta-galeria');
    if (galeriaBtn && trans['Ver Galería']) {
        galeriaBtn.textContent = trans['Ver Galería'];
    }
    
    // Traducir elementos específicos sin data-translate
    const specificElements = [
        { selector: '#galeria-titulo', key: 'Explora Sapzurro en Imágenes' },
        { selector: '#actividades-titulo', key: 'Experiencias Únicas en Sapzurro' },
        { selector: '#como-llegar-titulo', key: 'Cómo Llegar a Sapzurro' },
        { selector: '#mapa-titulo', key: 'Ubicación y Puntos de Interés' },
        { selector: '#calculadora-titulo', key: 'Calculadora de Costos' },
        { selector: '#facebook-titulo', key: 'Síguenos en Facebook' }
    ];
    
    specificElements.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element && trans[item.key]) {
            element.textContent = trans[item.key];
        }
    });
    
    // Traducir filtros de galería
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const text = btn.textContent.trim();
        if (trans[text]) {
            btn.textContent = trans[text];
        }
    });
    
    // Traducir botones de actividades
    document.querySelectorAll('.actividad-btn').forEach(btn => {
        const text = btn.textContent.trim();
        if (trans[text]) {
            btn.textContent = trans[text];
        }
    });
}

// Función para actualizar el botón de idioma
function updateLanguageButton() {
    const langFlag = document.querySelector('.lang-flag');
    const langText = document.querySelector('.lang-text');
    
    if (langFlag && langText) {
        if (currentLang === 'es') {
            langFlag.textContent = '🇪🇸';
            langText.textContent = 'ES';
        } else {
            langFlag.textContent = '🇺🇸';
            langText.textContent = 'EN';
        }
    }
}

// Función para guardar preferencia
function saveLanguagePreference() {
    localStorage.setItem('sapzurro-language', currentLang);
}

// Función para cargar preferencia
function loadLanguagePreference() {
    const saved = localStorage.getItem('sapzurro-language');
    if (saved) {
        currentLang = saved;
    }
    translatePage();
    updateLanguageButton();
}

// Inicializar cuando el DOM esté listo
function initLanguageSwitcher() {
    console.log('Inicializando sistema de idiomas');
    
    // Configurar event listener para el botón
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        console.log('Botón encontrado, agregando event listener');
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Click detectado');
            toggleLanguage();
        });
    } else {
        console.error('No se encontró el botón #langToggle');
    }
    
    // Cargar preferencia guardada
    loadLanguagePreference();
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
} else {
    initLanguageSwitcher();
}

// También escuchar el evento DOMContentLoaded por si acaso
document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
