// Calculadora de Costos para Sapzurro
class CostCalculator {
    constructor() {
        this.precios = {
            transporte: {
                medellin: {
                    vuelo: 280000,
                    bus: 58000,
                    lancha: 125000
                },
                bogota: {
                    vuelo: 320000,
                    bus: 95000,
                    lancha: 125000
                }
            },
            hospedaje: {
                economico: 80000,
                jhohaka: 95000,
                medio: 120000,
                premium: 200000
            },
            comidas: {
                desayuno: 15000,
                almuerzo: 25000,
                cena: 30000
            },
            actividades: {
                snorkel: 50000,
                tour_lancha: 80000,
                caminata_ecologica: 30000,
                pesca: 100000
            }
        };
        
        this.initEventListeners();
        this.calcularCosto();
    }

    initEventListeners() {
        const inputs = ['personas', 'dias', 'origen', 'hospedaje'];
        inputs.forEach(inputId => {
            const element = document.getElementById(inputId);
            if (element) {
                element.addEventListener('change', () => this.calcularCosto());
                element.addEventListener('input', () => this.calcularCosto());
            }
        });
    }

    calcularCosto() {
        const personas = parseInt(document.getElementById('personas')?.value) || 2;
        const dias = parseInt(document.getElementById('dias')?.value) || 3;
        const origen = document.getElementById('origen')?.value || 'medellin';
        const tipoHospedaje = document.getElementById('hospedaje')?.value || 'medio';

        // Calcular costos
        const costoTransporte = this.calcularTransporte(origen, personas);
        const costoHospedaje = this.calcularHospedaje(tipoHospedaje, dias, personas);
        const costoComidas = this.calcularComidas(dias, personas);
        const costoActividades = this.calcularActividades(dias, personas);

        const costoTotal = costoTransporte + costoHospedaje + costoComidas + costoActividades;

        // Actualizar UI
        this.actualizarUI(costoTotal, {
            transporte: costoTransporte,
            hospedaje: costoHospedaje,
            comidas: costoComidas,
            actividades: costoActividades
        }, personas, dias);
    }

    calcularTransporte(origen, personas) {
        const precios = this.precios.transporte[origen];
        return (precios.vuelo + precios.bus + precios.lancha) * personas;
    }

    calcularHospedaje(tipo, dias, personas) {
        const precioPorNoche = this.precios.hospedaje[tipo];
        
        // Para Jhohaka: $100.000 por noche para pareja (hasta 2 personas)
        if (tipo === 'jhohaka') {
            const habitaciones = Math.ceil(personas / 2); // Cada habitación para máximo 2 personas
            return precioPorNoche * dias * habitaciones;
        }
        
        // Para otros hospedajes: cálculo estándar
        const habitaciones = Math.ceil(personas / 2); // 2 personas por habitación
        return precioPorNoche * dias * habitaciones;
    }

    calcularComidas(dias, personas) {
        const costoDiario = this.precios.comidas.desayuno + 
                           this.precios.comidas.almuerzo + 
                           this.precios.comidas.cena;
        return costoDiario * dias * personas;
    }

    calcularActividades(dias, personas) {
        // Actividades promedio por día
        const actividadesPorDia = 2;
        const costoPromedio = 65000; // Promedio entre las actividades
        return costoPromedio * actividadesPorDia * dias * personas;
    }

    actualizarUI(total, desglose, personas, dias) {
        // Actualizar total
        const totalElement = document.getElementById('costoTotal');
        if (totalElement) {
            totalElement.textContent = this.formatearPrecio(total);
        }

        // Actualizar desglose
        const desgloseElement = document.getElementById('costoDesglose');
        if (desgloseElement) {
            desgloseElement.innerHTML = `
                <div class="desglose-item">
                    <span>🚌 Transporte (${personas} personas):</span>
                    <span>${this.formatearPrecio(desglose.transporte)}</span>
                </div>
                <div class="desglose-item">
                    <span>🏨 Hospedaje (${dias} noches):</span>
                    <span>${this.formatearPrecio(desglose.hospedaje)}</span>
                </div>
                <div class="desglose-item">
                    <span>🍽️ Comidas (${dias} días):</span>
                    <span>${this.formatearPrecio(desglose.comidas)}</span>
                </div>
                <div class="desglose-item">
                    <span>🎯 Actividades:</span>
                    <span>${this.formatearPrecio(desglose.actividades)}</span>
                </div>
            `;
        }
    }

    formatearPrecio(precio) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(precio);
    }
}

// Función para solicitar cotización
function solicitarCotizacion() {
    const personas = document.getElementById('personas')?.value || 2;
    const dias = document.getElementById('dias')?.value || 3;
    const origen = document.getElementById('origen')?.value || 'medellin';
    const hospedaje = document.getElementById('hospedaje')?.value || 'medio';
    const total = document.getElementById('costoTotal')?.textContent || '$0';

    const mensaje = `¡Hola! Me interesa viajar a Sapzurro con los siguientes detalles:
    
👥 Personas: ${personas}
📅 Días: ${dias}
📍 Origen: ${origen === 'medellin' ? 'Medellín' : 'Bogotá'}
🏨 Hospedaje: ${hospedaje}
💰 Presupuesto estimado: ${total}

¿Podrían ayudarme con una cotización personalizada?`;

    const whatsappUrl = `https://wa.me/573135776863?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('personas')) {
        new CostCalculator();
    }
});

// Exportar para uso global
window.CostCalculator = CostCalculator;
window.solicitarCotizacion = solicitarCotizacion;
