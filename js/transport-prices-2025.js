// Sistema Automático de Precios de Transporte 2025
class TransportPrices2025 {
    constructor() {
        this.baseYear = 2025;
        this.inflationRate = 0.05; // 5% anual ajustado para reflejar mejor la realidad actual
        this.seasonalMultipliers = {
            high: 1.3,    // Diciembre, Enero, Semana Santa, Junio-Julio
            medium: 1.1,  // Febrero, Marzo, Mayo, Agosto, Noviembre
            low: 0.9      // Abril, Septiembre, Octubre
        };
        
        this.basePrices2024 = {
            flights: {
                pacifica_travel: 280000,  // Medellín-Acandí (precio actualizado 2025)
                satena_acandi: 250000,    // Satena directo a Acandí (precio actualizado 2025)
                bogota_monteria: 320000,  // Bogotá-Montería + conexión (precio actualizado 2025)
                medellin_monteria: 280000 // Medellín-Montería + conexión (precio actualizado 2025)
            },
            buses: {
                gomez_hernandez: 55000,   // Medellín-Turbo
                cootransuroccidente: 62000, // Medellín-Turbo premium
                sotrauraba: 58000,        // Medellín-Turbo
                // Ruta alternativa vía Necoclí
                necocli_route: 48000      // Medellín-Necoclí (más económico)
            },
            boats: {
                nautica_golfo: 125000,    // Turbo-Capurganá (incluye tasa portuaria)
                necocli_capurgana: 85000, // Necoclí-Capurganá (ruta alternativa)
                capurgana_sapzurro: 20000 // Capurganá-Sapzurro (precio fijo)
            }
        };
        
        this.updatePricesForCurrentDate();
    }
    
    getCurrentSeason() {
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        
        // Temporada alta
        if (month === 12 || month === 1 || 
            (month === 6 || month === 7) ||
            this.isEasterWeek()) {
            return 'high';
        }
        
        // Temporada baja
        if (month === 4 || month === 9 || month === 10) {
            return 'low';
        }
        
        // Temporada media
        return 'medium';
    }
    
    isEasterWeek() {
        // Simplificado: Semana Santa generalmente en marzo-abril
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        return (month === 3 && day > 15) || (month === 4 && day < 15);
    }
    
    isWeekend() {
        const day = new Date().getDay();
        return day === 0 || day === 6; // Domingo o Sábado
    }
    
    calculateInflatedPrice(basePrice) {
        const currentYear = new Date().getFullYear();
        const yearsDifference = currentYear - 2024;
        return Math.round(basePrice * Math.pow(1 + this.inflationRate, yearsDifference));
    }
    
    applySeasonalAndWeekendPricing(price) {
        const season = this.getCurrentSeason();
        const seasonalPrice = price * this.seasonalMultipliers[season];
        
        // Incremento adicional por fin de semana
        const weekendMultiplier = this.isWeekend() ? 1.15 : 1.0;
        
        return Math.round(seasonalPrice * weekendMultiplier);
    }
    
    updatePricesForCurrentDate() {
        this.currentPrices = {};
        
        // Actualizar precios de vuelos
        this.currentPrices.flights = {};
        Object.keys(this.basePrices2024.flights).forEach(airline => {
            const inflatedPrice = this.calculateInflatedPrice(this.basePrices2024.flights[airline]);
            this.currentPrices.flights[airline] = this.applySeasonalAndWeekendPricing(inflatedPrice);
        });
        
        // Actualizar precios de buses
        this.currentPrices.buses = {};
        Object.keys(this.basePrices2024.buses).forEach(company => {
            const inflatedPrice = this.calculateInflatedPrice(this.basePrices2024.buses[company]);
            this.currentPrices.buses[company] = this.applySeasonalAndWeekendPricing(inflatedPrice);
        });
        
        // Actualizar precios de lanchas
        this.currentPrices.boats = {};
        Object.keys(this.basePrices2024.boats).forEach(service => {
            const inflatedPrice = this.calculateInflatedPrice(this.basePrices2024.boats[service]);
            this.currentPrices.boats[service] = this.applySeasonalAndWeekendPricing(inflatedPrice);
        });
    }
    
    formatPrice(price) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    }
    
    async updatePricesInDOM() {
        // Intentar obtener precios reales de APIs existentes
        await this.fetchRealPrices();
        
        // Actualizar precio principal de vuelos
        const flightPriceElement = document.querySelector('.paso-detallado:nth-child(1) .precio-grande');
        if (flightPriceElement) {
            const minFlightPrice = Math.min(...Object.values(this.currentPrices.flights));
            flightPriceElement.textContent = this.formatPrice(minFlightPrice);
        }
        
        // Actualizar precios individuales de aerolíneas
        this.updateAirlinePrices();
        
        // Actualizar precio principal de buses
        const busPriceElement = document.querySelector('.paso-detallado:nth-child(3) .precio-grande');
        if (busPriceElement) {
            busPriceElement.textContent = this.formatPrice(this.currentPrices.buses.gomez_hernandez);
        }
        
        // Actualizar precio de empresa de buses
        this.updateBusPrices();
        
        // Actualizar precio principal de lanchas
        const boatPriceElement = document.querySelector('.paso-detallado:nth-child(5) .precio-grande');
        if (boatPriceElement) {
            boatPriceElement.textContent = this.formatPrice(this.currentPrices.boats.nautica_golfo);
        }
        
        // Actualizar precio de lancha
        this.updateBoatPrices();
        
        // Actualizar timestamp
        this.updateLastUpdated();
    }
    
    async fetchRealPrices() {
        try {
            // Integrar con sistema de precios de vuelos existente
            if (window.flightPriceManager) {
                const realFlightPrices = await window.flightPriceManager.getAllPrices();
                if (realFlightPrices) {
                    this.mergeRealFlightPrices(realFlightPrices);
                }
            }
            
            // Integrar con sistema de precios de buses existente
            if (window.busPriceManager) {
                const realBusPrices = await window.busPriceManager.getAllPrices();
                if (realBusPrices) {
                    this.mergeRealBusPrices(realBusPrices);
                }
            }
            
        } catch (error) {
            console.log('Usando precios estimados (APIs no disponibles):', error.message);
        }
    }
    
    mergeRealFlightPrices(realPrices) {
        if (realPrices.medellin) {
            // Actualizar con precios reales si están disponibles
            Object.keys(realPrices.medellin).forEach(airline => {
                const airlineKey = this.mapAirlineKey(airline);
                if (airlineKey && realPrices.medellin[airline].price) {
                    this.currentPrices.flights[airlineKey] = realPrices.medellin[airline].price;
                }
            });
        }
        
        if (realPrices.bogota) {
            Object.keys(realPrices.bogota).forEach(airline => {
                const airlineKey = this.mapAirlineKey(airline);
                if (airlineKey && realPrices.bogota[airline].price) {
                    // Promedio entre Medellín y Bogotá si ambos están disponibles
                    const currentPrice = this.currentPrices.flights[airlineKey] || 0;
                    this.currentPrices.flights[airlineKey] = Math.round((currentPrice + realPrices.bogota[airline].price) / 2);
                }
            });
        }
    }
    
    mergeRealBusPrices(realPrices) {
        // Actualizar todas las empresas de buses, no solo Gómez Hernández
        if (realPrices['MDE-TBO']) {
            if (realPrices['MDE-TBO']['gomez_hernandez']) {
                this.currentPrices.buses.gomez_hernandez = realPrices['MDE-TBO']['gomez_hernandez'].average;
            }
            if (realPrices['MDE-TBO']['cootransuroccidente']) {
                this.currentPrices.buses.cootransuroccidente = realPrices['MDE-TBO']['cootransuroccidente'].average;
            }
            if (realPrices['MDE-TBO']['sotrauraba']) {
                this.currentPrices.buses.sotrauraba = realPrices['MDE-TBO']['sotrauraba'].average;
            }
        }
        
        // Ruta vía Necoclí
        if (realPrices['MDE-NEC']) {
            this.currentPrices.buses.necocli_route = realPrices['MDE-NEC'].average || this.currentPrices.buses.necocli_route;
        }
        
        // Rutas marítimas
        if (realPrices['TBO-CAP'] && realPrices['TBO-CAP']['nautica_golfo']) {
            this.currentPrices.boats.nautica_golfo = realPrices['TBO-CAP']['nautica_golfo'].average;
        }
        
        if (realPrices['NEC-CAP']) {
            this.currentPrices.boats.necocli_capurgana = realPrices['NEC-CAP'].average || this.currentPrices.boats.necocli_capurgana;
        }
        
        // Capurganá-Sapzurro siempre 20,000 COP (precio fijo)
        this.currentPrices.boats.capurgana_sapzurro = 20000;
    }
    
    mapAirlineKey(airline) {
        const mapping = {
            'avianca': 'pacifica_travel', // Mapear a estructura existente
            'viva_air': 'satena_acandi',
            'latam': 'bogota_monteria',
            'satena': 'medellin_monteria'
        };
        return mapping[airline.toLowerCase()] || null;
    }
    
    updateAirlinePrices() {
        const airlineElements = document.querySelectorAll('.aerolinea-detalles .precio');
        const prices = [
            this.currentPrices.flights.pacifica_travel,
            this.currentPrices.flights.satena_acandi
        ];
        
        airlineElements.forEach((element, index) => {
            if (prices[index]) {
                element.textContent = this.formatPrice(prices[index]);
            }
        });
        
        // Actualizar precios de ruta Montería
        const monteriaElements = document.querySelectorAll('.monteria-vuelo span');
        if (monteriaElements.length >= 2) {
            monteriaElements[0].textContent = `🛫 Bogotá-Montería: ${this.formatPrice(this.currentPrices.flights.bogota_monteria)}`;
            monteriaElements[1].textContent = `🚌 Montería-Necoclí: ${this.formatPrice(this.currentPrices.buses.monteria_necoli)}`;
        }
    }
    
    updateBusPrices() {
        const busPrice = document.querySelector('.empresa-detalles .precio');
        if (busPrice) {
            busPrice.textContent = this.formatPrice(this.currentPrices.buses.gomez_hernandez);
        }
    }
    
    updateBoatPrices() {
        // Actualizar precio principal Turbo-Capurganá
        const boatElements = document.querySelectorAll('.nautica-detalles .precio-nautica');
        boatElements.forEach(element => {
            element.textContent = this.formatPrice(this.currentPrices.boats.nautica_golfo);
        });
        
        // Actualizar precio ruta Necoclí-Capurganá
        const necocliCapElements = document.querySelectorAll('.precio-necocli-cap');
        necocliCapElements.forEach(element => {
            element.textContent = this.formatPrice(this.currentPrices.boats.necocli_capurgana);
        });
        
        // Actualizar precio Necoclí terrestre
        const necocliElements = document.querySelectorAll('.precio-necocli');
        necocliElements.forEach(element => {
            element.textContent = this.formatPrice(this.currentPrices.buses.necocli_route);
        });
        
        // Precio fijo Capurganá-Sapzurro siempre $20.000
        const capSapElements = document.querySelectorAll('.paso-detallado:nth-child(7) .precio-grande');
        capSapElements.forEach(element => {
            element.textContent = this.formatPrice(20000);
        });
    }
    
    updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const disclaimer = document.querySelector('.precios-disclaimer p');
        if (disclaimer) {
            const season = this.getCurrentSeason();
            const seasonText = {
                high: 'temporada alta',
                medium: 'temporada media',
                low: 'temporada baja'
            };
            
            disclaimer.innerHTML = `* Precios actualizados automáticamente para ${timeString}. 
                Temporada: <strong>${seasonText[season]}</strong>. 
                Incluye empresas como Gómez Hernández, Náutica del Golfo y aerolíneas certificadas.`;
        }
    }
    
    addRefreshListeners() {
        const refreshButtons = document.querySelectorAll('.refresh-btn');
        refreshButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.updatePricesForCurrentDate();
                this.updatePricesInDOM();
                
                // Animación de actualización
                button.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    button.style.transform = 'rotate(0deg)';
                }, 500);
            });
        });
    }
    
    // Método para obtener información de precios para APIs externas
    getPriceInfo() {
        return {
            lastUpdated: new Date().toISOString(),
            season: this.getCurrentSeason(),
            isWeekend: this.isWeekend(),
            prices: this.currentPrices,
            disclaimer: 'Precios estimados basados en tendencias de mercado 2025'
        };
    }
}

// Inicializar sistema de precios automático
document.addEventListener('DOMContentLoaded', function() {
    const transportPrices = new TransportPrices2025();
    
    // Esperar a que se carguen los otros sistemas de precios
    setTimeout(() => {
        // Inicializar sistemas existentes si no están disponibles
        if (!window.flightPriceManager && window.FlightPriceManager) {
            window.flightPriceManager = new FlightPriceManager();
        }
        
        if (!window.busPriceManager && window.BusPriceManager) {
            window.busPriceManager = new BusPriceManager();
        }
        
        // Actualizar precios con integración
        transportPrices.updatePricesInDOM();
        transportPrices.addRefreshListeners();
    }, 2000);
    
    // Actualizar precios cada 30 minutos
    setInterval(() => {
        transportPrices.updatePricesForCurrentDate();
        transportPrices.updatePricesInDOM();
    }, 30 * 60 * 1000);
    
    // Hacer disponible globalmente
    window.transportPrices2025 = transportPrices;
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TransportPrices2025;
}
