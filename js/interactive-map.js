// Mapa interactivo mejorado para Sapzurro
class InteractiveMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.sapzurroCoords = [8.6442, -77.3583]; // Coordenadas de Sapzurro
        
        this.pointsOfInterest = [
            {
                name: "Sapzurro Centro",
                coords: [8.6442, -77.3583],
                type: "town",
                description: "Centro del pueblo de Sapzurro",
                icon: "🏘️",
                services: ["Hospedaje", "Restaurantes", "Tiendas"]
            },
            {
                name: "Playa La Miel",
                coords: [8.6458, -77.3567],
                type: "beach",
                description: "Playa principal con aguas cristalinas perfecta para snorkel",
                icon: "🏖️",
                services: ["Snorkel", "Natación", "Relajación"]
            },
            {
                name: "Frontera con Panamá",
                coords: [8.6475, -77.3550],
                type: "border",
                description: "Punto fronterizo entre Colombia y Panamá",
                icon: "🚩",
                services: ["Migración", "Caminata ecológica"]
            },
            {
                name: "Mirador Punta Espada",
                coords: [8.6467, -77.3542],
                type: "viewpoint",
                description: "Mirador natural con vista panorámica del Caribe",
                icon: "🌅",
                services: ["Fotografía", "Avistamiento", "Senderismo"]
            },
            {
                name: "Puerto de Lanchas",
                coords: [8.6435, -77.3590],
                type: "port",
                description: "Puerto principal para lanchas hacia Capurganá y Turbo",
                icon: "⚓",
                services: ["Transporte marítimo", "Tours en lancha"]
            },
            {
                name: "Sendero Ecológico",
                coords: [8.6450, -77.3575],
                type: "trail",
                description: "Sendero natural hacia La Miel y la frontera",
                icon: "🥾",
                services: ["Caminata", "Observación de fauna", "Ecoturismo"]
            },
            {
                name: "Zona de Buceo",
                coords: [8.6425, -77.3570],
                type: "diving",
                description: "Arrecifes de coral y vida marina abundante",
                icon: "🤿",
                services: ["Buceo", "Snorkel", "Pesca deportiva"]
            },
            {
                name: "Capurganá",
                coords: [8.6333, -77.3667],
                type: "town",
                description: "Pueblo vecino conectado por sendero y lancha",
                icon: "🏘️",
                services: ["Hospedaje", "Restaurantes", "Aeropuerto"]
            }
        ];
        
        this.initMap();
    }

    async initMap() {
        try {
            // Verificar si Leaflet está disponible
            if (typeof L === 'undefined') {
                await this.loadLeaflet();
            }
            
            this.createMap();
            this.addMarkers();
            this.addControls();
            this.addWeatherWidget();
            
        } catch (error) {
            console.error('Error inicializando mapa:', error);
            this.createFallbackMap();
        }
    }

    async loadLeaflet() {
        return new Promise((resolve, reject) => {
            // Cargar CSS de Leaflet
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(cssLink);

            // Cargar JavaScript de Leaflet
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    createMap() {
        const mapContainer = document.getElementById('mapa-sapzurro') || document.getElementById('mapa-contacto');
        if (!mapContainer) return;

        // Limpiar contenedor
        mapContainer.innerHTML = '';
        mapContainer.style.height = '500px';
        mapContainer.style.borderRadius = '15px';
        mapContainer.style.overflow = 'hidden';

        // Crear mapa
        this.map = L.map(mapContainer).setView(this.sapzurroCoords, 14);

        // Agregar capa de mapa
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);

        // Agregar capa satelital alternativa
        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles © Esri'
        });

        // Control de capas
        const baseMaps = {
            "Mapa": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
            "Satélite": satelliteLayer
        };

        L.control.layers(baseMaps).addTo(this.map);
    }

    addMarkers() {
        this.pointsOfInterest.forEach(poi => {
            const marker = L.marker(poi.coords).addTo(this.map);
            
            const popupContent = this.createPopupContent(poi);
            marker.bindPopup(popupContent, {
                maxWidth: 300,
                className: 'custom-popup'
            });

            // Agregar al array de marcadores
            this.markers.push({
                marker: marker,
                data: poi
            });
        });
    }

    createPopupContent(poi) {
        return `
            <div class="map-popup">
                <div class="popup-header">
                    <span class="popup-icon">${poi.icon}</span>
                    <h3>${poi.name}</h3>
                </div>
                <p class="popup-description">${poi.description}</p>
                <div class="popup-services">
                    <h4>Servicios disponibles:</h4>
                    <ul>
                        ${poi.services.map(service => `<li>${service}</li>`).join('')}
                    </ul>
                </div>
                <div class="popup-actions">
                    <button onclick="window.interactiveMap.getDirections([${poi.coords}])" class="popup-btn">
                        📍 Cómo llegar
                    </button>
                    <button onclick="window.interactiveMap.shareLocation('${poi.name}', [${poi.coords}])" class="popup-btn">
                        📤 Compartir
                    </button>
                </div>
            </div>
        `;
    }

    addControls() {
        // Control de ubicación
        const locationControl = L.control({position: 'topright'});
        locationControl.onAdd = () => {
            const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            div.innerHTML = `
                <a href="#" class="location-btn" title="Mi ubicación">
                    📍
                </a>
            `;
            
            div.querySelector('.location-btn').addEventListener('click', (e) => {
                e.preventDefault();
                this.getCurrentLocation();
            });
            
            return div;
        };
        locationControl.addTo(this.map);

        // Control de información
        const infoControl = L.control({position: 'bottomleft'});
        infoControl.onAdd = () => {
            const div = L.DomUtil.create('div', 'map-info-control');
            div.innerHTML = `
                <div class="map-info-panel">
                    <h4>🏝️ Sapzurro</h4>
                    <p><strong>Coordenadas:</strong> ${this.sapzurroCoords[0]}, ${this.sapzurroCoords[1]}</p>
                    <p><strong>Zona horaria:</strong> GMT-5</p>
                    <p><strong>Clima:</strong> Tropical húmedo</p>
                    <div class="weather-info" id="weather-widget">
                        <span>🌡️ Cargando clima...</span>
                    </div>
                </div>
            `;
            return div;
        };
        infoControl.addTo(this.map);
    }

    addWeatherWidget() {
        // Simular datos del clima (en producción usar API real)
        const weatherData = {
            temperature: Math.floor(Math.random() * 5) + 28, // 28-32°C
            humidity: Math.floor(Math.random() * 10) + 80, // 80-90%
            condition: ['Soleado', 'Parcialmente nublado', 'Tropical'][Math.floor(Math.random() * 3)],
            windSpeed: Math.floor(Math.random() * 10) + 5 // 5-15 km/h
        };

        const weatherWidget = document.getElementById('weather-widget');
        if (weatherWidget) {
            weatherWidget.innerHTML = `
                <div class="weather-current">
                    <span>🌡️ ${weatherData.temperature}°C</span>
                    <span>💧 ${weatherData.humidity}%</span>
                </div>
                <div class="weather-details">
                    <span>${weatherData.condition}</span>
                    <span>💨 ${weatherData.windSpeed} km/h</span>
                </div>
            `;
        }
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoords = [position.coords.latitude, position.coords.longitude];
                    
                    // Agregar marcador de usuario
                    const userMarker = L.marker(userCoords, {
                        icon: L.divIcon({
                            className: 'user-location-marker',
                            html: '📍',
                            iconSize: [30, 30]
                        })
                    }).addTo(this.map);
                    
                    userMarker.bindPopup('Tu ubicación actual').openPopup();
                    
                    // Calcular distancia a Sapzurro
                    const distance = this.calculateDistance(userCoords, this.sapzurroCoords);
                    
                    // Mostrar información de distancia
                    this.showDistanceInfo(distance);
                },
                (error) => {
                    alert('No se pudo obtener tu ubicación: ' + error.message);
                }
            );
        } else {
            alert('Geolocalización no soportada por este navegador');
        }
    }

    calculateDistance(coords1, coords2) {
        const R = 6371; // Radio de la Tierra en km
        const dLat = (coords2[0] - coords1[0]) * Math.PI / 180;
        const dLon = (coords2[1] - coords1[1]) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(coords1[0] * Math.PI / 180) * Math.cos(coords2[0] * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    showDistanceInfo(distance) {
        const infoPanel = document.querySelector('.map-info-panel');
        if (infoPanel) {
            const distanceInfo = document.createElement('div');
            distanceInfo.className = 'distance-info';
            distanceInfo.innerHTML = `
                <p><strong>📏 Distancia:</strong> ${distance.toFixed(1)} km</p>
                <p><strong>⏱️ Tiempo aprox:</strong> ${this.estimateTime(distance)}</p>
            `;
            infoPanel.appendChild(distanceInfo);
        }
    }

    estimateTime(distance) {
        if (distance < 100) return 'Vuelo directo disponible';
        if (distance < 500) return '2-4 horas en vuelo';
        if (distance < 1000) return '4-6 horas en vuelo';
        return '6+ horas en vuelo';
    }

    getDirections(coords) {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}`;
        window.open(googleMapsUrl, '_blank');
    }

    shareLocation(name, coords) {
        const message = `📍 ${name} en Sapzurro\nCoordenadas: ${coords[0]}, ${coords[1]}\nVer en mapa: https://www.google.com/maps?q=${coords[0]},${coords[1]}`;
        
        if (navigator.share) {
            navigator.share({
                title: name,
                text: message
            });
        } else {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    }

    createFallbackMap() {
        const mapContainer = document.getElementById('mapa-sapzurro') || document.getElementById('mapa-contacto');
        if (!mapContainer) return;

        mapContainer.innerHTML = `
            <div class="fallback-map">
                <div class="map-header">
                    <h3>🗺️ Ubicación de Sapzurro</h3>
                </div>
                <div class="map-content">
                    <div class="location-info">
                        <h4>📍 Sapzurro, Chocó, Colombia</h4>
                        <p><strong>Coordenadas:</strong> 8.6442°N, 77.3583°W</p>
                        <p><strong>Región:</strong> Caribe Colombiano</p>
                        <p><strong>Frontera:</strong> Colombia - Panamá</p>
                    </div>
                    
                    <div class="access-info">
                        <h4>🚤 Cómo llegar:</h4>
                        <ul>
                            <li>✈️ Vuelo a Apartadó + Lancha</li>
                            <li>🚌 Bus a Turbo + Lancha</li>
                            <li>🚶 Caminata desde Capurganá (45 min)</li>
                        </ul>
                    </div>
                    
                    <div class="map-actions">
                        <a href="https://www.google.com/maps?q=8.6442,-77.3583" target="_blank" class="map-btn">
                            🗺️ Ver en Google Maps
                        </a>
                        <a href="tel:+573135776863" class="map-btn">
                            📞 Llamar para direcciones
                        </a>
                        <a href="https://wa.me/573135776863?text=Necesito%20información%20sobre%20cómo%20llegar%20a%20Sapzurro" target="_blank" class="map-btn">
                            💬 WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // Método para actualizar puntos de interés
    addCustomPOI(name, coords, description, type = 'custom') {
        const poi = {
            name: name,
            coords: coords,
            type: type,
            description: description,
            icon: '📍',
            services: ['Punto personalizado']
        };
        
        this.pointsOfInterest.push(poi);
        
        if (this.map) {
            const marker = L.marker(coords).addTo(this.map);
            const popupContent = this.createPopupContent(poi);
            marker.bindPopup(popupContent);
            
            this.markers.push({
                marker: marker,
                data: poi
            });
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.interactiveMap = new InteractiveMap();
});

// Exportar para uso global
window.InteractiveMap = InteractiveMap;
