/**
 * Widget interactivo de WhatsApp para Sapzurro
 * Proporciona comunicación directa con soporte y respuestas automáticas
 */

class WhatsAppWidget {
    constructor() {
        this.phoneNumber = '573135768630';  // Número corregido con el formato internacional
        this.businessName = 'Sapzurro Paraíso de Todos';
        this.isOpen = false;
        this.messages = [];
        this.autoResponses = {
            'hola': '¡Hola! 👋 Bienvenido a Sapzurro Paraíso de Todos. ¿En qué podemos ayudarte?',
            'precios': 'Los precios varían según la temporada:\n✈️ Vuelos: desde $280.000\n🚌 Buses: desde $55.000\n🚤 Lanchas: desde $40.000\n\n¿Te interesa algún transporte en particular?',
            'hospedaje': 'Tenemos varias opciones de hospedaje:\n🏨 Hoteles desde $120.000/noche\n🏡 Cabañas desde $80.000/noche\n🏕️ Camping desde $25.000/noche\n\n¿Qué tipo de alojamiento prefieres?',
            'como llegar': 'Para llegar a Sapzurro:\n1️⃣ Vuelo a Apartadó\n2️⃣ Bus/taxi a Turbo\n3️⃣ Lancha a Capurganá\n4️⃣ Caminata a Sapzurro (15 min)\n\n¿Necesitas ayuda con algún tramo?',
            'actividades': 'Actividades disponibles:\n🏊 Snorkeling y buceo\n🥾 Senderismo\n🎣 Pesca deportiva\n🍽️ Experiencias gastronómicas\n📸 Tours fotográficos\n\n¿Cuál te interesa más?',
            'contacto': 'Puedes contactarnos:\n📧 sapzurroparaisodetodos@gmail.com\n📱 +57 313 577 6863\n🕒 Atención: 8:00 AM - 8:00 PM\n\n¡Estamos aquí para ayudarte!'
        };
        
        this.init();
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
        this.showWelcomeMessage();
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'whatsapp-widget';
        widget.innerHTML = `
            <div class="whatsapp-button" id="whatsapp-toggle">
                <div class="whatsapp-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                </div>
                <div class="whatsapp-pulse"></div>
                <div class="notification-badge" id="notification-badge">1</div>
            </div>
            
            <div class="whatsapp-chat" id="whatsapp-chat">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="business-avatar">
                            <img src="img/Imgane1.jpg" alt="Sapzurro" onerror="this.style.display='none'">
                        </div>
                        <div class="business-details">
                            <h4>${this.businessName}</h4>
                            <span class="online-status">En línea</span>
                        </div>
                    </div>
                    <button class="close-chat" id="close-chat">✕</button>
                </div>
                
                <div class="chat-messages" id="chat-messages">
                    <!-- Los mensajes se cargarán aquí -->
                </div>
                
                <div class="chat-input-container">
                    <div class="quick-responses" id="quick-responses">
                        <button class="quick-btn" data-message="Hola, quiero información sobre Sapzurro">👋 Saludar</button>
                        <button class="quick-btn" data-message="¿Cuáles son los precios de transporte?">💰 Precios</button>
                        <button class="quick-btn" data-message="¿Qué opciones de hospedaje tienen?">🏨 Hospedaje</button>
                        <button class="quick-btn" data-message="¿Cómo llego a Sapzurro?">🗺️ Cómo llegar</button>
                    </div>
                    
                    <div class="chat-input-area">
                        <input type="text" id="chat-input" placeholder="Escribe tu mensaje para WhatsApp...">
                        <button id="send-message">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('whatsapp-toggle');
        const closeBtn = document.getElementById('close-chat');
        const sendBtn = document.getElementById('send-message');
        const chatInput = document.getElementById('chat-input');
        const quickBtns = document.querySelectorAll('.quick-btn');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.dataset.message;
                this.sendUserMessage(message);
                this.hideQuickResponses();
            });
        });
    }

    toggleChat() {
        const chat = document.getElementById('whatsapp-chat');
        const badge = document.getElementById('notification-badge');
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            chat.classList.add('open');
            badge.style.display = 'none';
            this.isOpen = true;
            this.scrollToBottom();
        }
    }

    closeChat() {
        const chat = document.getElementById('whatsapp-chat');
        chat.classList.remove('open');
        this.isOpen = false;
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('bot', '¡Hola! 👋 Soy el asistente de Sapzurro. Escribe tu mensaje y te conectaré directamente con nuestro equipo por WhatsApp. ¿En qué podemos ayudarte?');
        }, 1000);
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.sendUserMessage(message);
            input.value = '';
        }
    }

    sendUserMessage(message) {
        this.addMessage('user', message);
        this.hideQuickResponses();
        
        // Simular typing
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            this.processMessage(message);
        }, 1500);
    }

    processMessage(message) {
        // Mostrar mensaje de confirmación
        this.addMessage('bot', `✅ Mensaje recibido: "${message}"\n\n📱 Te estoy redirigiendo a WhatsApp para que puedas hablar directamente con nuestro equipo...`);
        
        // Abrir WhatsApp inmediatamente con el mensaje
        setTimeout(() => {
            this.openWhatsApp(message);
        }, 1500);
    }

    addMessage(sender, text) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const time = new Date().toLocaleTimeString('es-CO', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                ${text.replace(/\n/g, '<br>')}
            </div>
            <div class="message-time">${time}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Mostrar notificación si el chat está cerrado
        if (!this.isOpen && sender === 'bot') {
            this.showNotification();
        }
    }

    showTyping() {
        const messagesContainer = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    hideQuickResponses() {
        const quickResponses = document.getElementById('quick-responses');
        quickResponses.style.display = 'none';
    }

    showNotification() {
        const badge = document.getElementById('notification-badge');
        badge.style.display = 'flex';
        
        // Animación de pulso
        const button = document.getElementById('whatsapp-toggle');
        button.classList.add('pulse-animation');
        
        setTimeout(() => {
            button.classList.remove('pulse-animation');
        }, 3000);
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    openWhatsApp(message = '') {
        const fullMessage = message 
            ? `${message}\n\n(Mensaje enviado desde la página web de Sapzurro)`
            : '¡Hola! Me interesa conocer más sobre Sapzurro. (Mensaje enviado desde la página web)';
        
        const encodedMessage = encodeURIComponent(fullMessage);
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Inicializar el widget cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const whatsappWidget = new WhatsAppWidget();
    
    // Hacer disponible globalmente
    window.whatsappWidget = whatsappWidget;
});

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppWidget;
}
