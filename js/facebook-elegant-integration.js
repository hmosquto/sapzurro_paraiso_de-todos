/**
 * Integración Elegante de Facebook para Sapzurro
 * Diseño moderno con animaciones y efectos visuales avanzados
 */

class FacebookElegantIntegration {
    constructor() {
        this.pageUrl = 'https://www.facebook.com/Sapzurro1';
        this.pageId = 'Sapzurro1';
        this.posts = [
            {
                id: 1,
                avatar: '🏝️',
                author: 'Sapzurro Paraíso de Todos',
                time: 'Hace 2 horas',
                content: '🌅 ¡Buenos días desde el paraíso! Hoy amanecimos with un clima perfecto para disfrutar de nuestras hermosas playas. ¿Ya planificaste tu próxima visita a Sapzurro?',
                image: 'img/Imgane1.jpg',
                likes: 127,
                comments: 23,
                shares: 8
            },
            {
                id: 2,
                avatar: '🏝️',
                author: 'Sapzurro Paraíso de Todos',
                time: 'Ayer',
                content: '🐠 La vida marina en Sapzurro es increíble. Ven y descubre la diversidad de especies que habitan nuestras aguas cristalinas. ¡Perfecto para snorkeling y buceo!',
                image: 'img/Imgane10.jpg',
                likes: 89,
                comments: 15,
                shares: 12
            },
            {
                id: 3,
                avatar: '🏝️',
                author: 'Sapzurro Paraíso de Todos',
                time: 'Hace 3 días',
                content: '🌺 Los atardeceres en Sapzurro son mágicos. Cada día la naturaleza nos regala un espectáculo único de colores. ¡No te pierdas esta experiencia!',
                image: 'img/Imgane11.jpg',
                likes: 156,
                comments: 31,
                shares: 19
            }
        ];
        this.init();
    }
    
    init() {
        this.createElegantFacebookSection();
        this.addAdvancedInteractivity();
        this.startAnimations();
    }
    
    createElegantFacebookSection() {
        const facebookSection = document.querySelector('.facebook-direct-link');
        if (!facebookSection) return;
        
        facebookSection.innerHTML = `
            <div class="fb-elegant-container">
                <!-- Header Elegante -->
                <div class="fb-elegant-header">
                    <div class="fb-header-content">
                        <div class="fb-logo-section">
                            <div class="fb-logo-animated">
                                <div class="fb-icon-wrapper">
                                    <svg class="fb-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="fb-title-section">
                                <h2 class="fb-elegant-title">Síguenos en Facebook</h2>
                                <p class="fb-elegant-subtitle">Conecta con el paraíso</p>
                            </div>
                        </div>
                        <div class="fb-stats-elegant">
                            <div class="fb-stat-item">
                                <span class="fb-stat-number">2.5K</span>
                                <span class="fb-stat-label">Seguidores</span>
                            </div>
                            <div class="fb-stat-item">
                                <span class="fb-stat-number">4.8</span>
                                <span class="fb-stat-label">★ Rating</span>
                            </div>
                        </div>
                    </div>
                    <div class="fb-header-wave"></div>
                </div>
                
                <!-- Posts Elegantes -->
                <div class="fb-posts-elegant">
                    ${this.posts.map(post => this.createElegantPost(post)).join('')}
                </div>
                
                <!-- CTA Elegante -->
                <div class="fb-cta-elegant">
                    <div class="fb-cta-content">
                        <h3>¡No te pierdas nuestras actualizaciones!</h3>
                        <p>Síguenos para ver fotos exclusivas, ofertas especiales y noticias de Sapzurro</p>
                        <div class="fb-cta-buttons">
                            <a href="${this.pageUrl}" target="_blank" class="fb-btn-primary">
                                <span class="fb-btn-icon">👍</span>
                                <span class="fb-btn-text">Seguir Página</span>
                                <div class="fb-btn-ripple"></div>
                            </a>
                            <a href="${this.pageUrl}/photos" target="_blank" class="fb-btn-secondary">
                                <span class="fb-btn-icon">📸</span>
                                <span class="fb-btn-text">Ver Fotos</span>
                                <div class="fb-btn-ripple"></div>
                            </a>
                        </div>
                    </div>
                    <div class="fb-cta-decoration">
                        <div class="fb-floating-icon">🏝️</div>
                        <div class="fb-floating-icon">🌊</div>
                        <div class="fb-floating-icon">🌺</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createElegantPost(post) {
        return `
            <article class="fb-post-elegant" data-post-id="${post.id}">
                <div class="fb-post-header-elegant">
                    <div class="fb-avatar-elegant">
                        <span class="fb-avatar-icon">${post.avatar}</span>
                        <div class="fb-avatar-ring"></div>
                    </div>
                    <div class="fb-post-info">
                        <h4 class="fb-author">${post.author}</h4>
                        <time class="fb-time">${post.time}</time>
                    </div>
                    <div class="fb-post-menu">
                        <span class="fb-menu-dots">⋯</span>
                    </div>
                </div>
                
                <div class="fb-post-content-elegant">
                    <p class="fb-post-text">${post.content}</p>
                    <div class="fb-post-image-elegant">
                        <img src="${post.image}" alt="Post de Sapzurro" loading="lazy">
                        <div class="fb-image-overlay">
                            <div class="fb-image-actions">
                                <button class="fb-image-action" data-action="zoom">🔍</button>
                                <button class="fb-image-action" data-action="share">📤</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="fb-post-stats">
                    <div class="fb-reactions-preview">
                        <div class="fb-reaction-icons">
                            <span class="fb-reaction">👍</span>
                            <span class="fb-reaction">❤️</span>
                            <span class="fb-reaction">😍</span>
                        </div>
                        <span class="fb-likes-count">${post.likes}</span>
                    </div>
                    <div class="fb-engagement-stats">
                        <span class="fb-comments-count">${post.comments} comentarios</span>
                        <span class="fb-shares-count">${post.shares} compartidos</span>
                    </div>
                </div>
                
                <div class="fb-post-actions-elegant">
                    <button class="fb-action-btn" data-action="like" data-post-id="${post.id}">
                        <span class="fb-action-icon">👍</span>
                        <span class="fb-action-text">Me gusta</span>
                        <div class="fb-action-ripple"></div>
                    </button>
                    <button class="fb-action-btn" data-action="comment" data-post-id="${post.id}">
                        <span class="fb-action-icon">💬</span>
                        <span class="fb-action-text">Comentar</span>
                        <div class="fb-action-ripple"></div>
                    </button>
                    <button class="fb-action-btn" data-action="share" data-post-id="${post.id}">
                        <span class="fb-action-icon">📤</span>
                        <span class="fb-action-text">Compartir</span>
                        <div class="fb-action-ripple"></div>
                    </button>
                </div>
            </article>
        `;
    }
    
    addAdvancedInteractivity() {
        document.addEventListener('click', (e) => {
            // Botones de acción con efecto ripple
            if (e.target.closest('.fb-action-btn')) {
                const btn = e.target.closest('.fb-action-btn');
                const action = btn.dataset.action;
                const postId = btn.dataset.postId;
                
                this.createRippleEffect(btn, e);
                this.handlePostAction(action, postId, btn);
            }
            
            // Botones CTA con efecto ripple
            if (e.target.closest('.fb-btn-primary, .fb-btn-secondary')) {
                const btn = e.target.closest('.fb-btn-primary, .fb-btn-secondary');
                this.createRippleEffect(btn, e);
            }
            
            // Acciones de imagen
            if (e.target.classList.contains('fb-image-action')) {
                const action = e.target.dataset.action;
                if (action === 'zoom') {
                    this.zoomImage(e.target);
                } else if (action === 'share') {
                    window.open(this.pageUrl, '_blank');
                }
            }
        });
        
        // Hover effects para posts
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.fb-post-elegant')) {
                const post = e.target.closest('.fb-post-elegant');
                post.classList.add('fb-post-hover');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.fb-post-elegant')) {
                const post = e.target.closest('.fb-post-elegant');
                post.classList.remove('fb-post-hover');
            }
        });
    }
    
    createRippleEffect(button, event) {
        const ripple = button.querySelector('.fb-action-ripple, .fb-btn-ripple');
        if (!ripple) return;
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('fb-ripple-active');
        
        setTimeout(() => {
            ripple.classList.remove('fb-ripple-active');
        }, 600);
    }
    
    handlePostAction(action, postId, button) {
        switch (action) {
            case 'like':
                this.toggleLike(button, postId);
                break;
            case 'comment':
            case 'share':
                window.open(this.pageUrl, '_blank');
                break;
        }
    }
    
    toggleLike(button, postId) {
        const isLiked = button.classList.contains('fb-liked');
        const icon = button.querySelector('.fb-action-icon');
        const text = button.querySelector('.fb-action-text');
        
        if (isLiked) {
            button.classList.remove('fb-liked');
            icon.textContent = '👍';
            text.textContent = 'Me gusta';
        } else {
            button.classList.add('fb-liked');
            icon.textContent = '❤️';
            text.textContent = 'Te gusta';
            
            // Animación de corazones
            this.createHeartAnimation(button);
        }
    }
    
    createHeartAnimation(button) {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'fb-heart-animation';
                heart.textContent = '❤️';
                heart.style.left = Math.random() * 100 + '%';
                button.appendChild(heart);
                
                setTimeout(() => heart.remove(), 2000);
            }, i * 100);
        }
    }
    
    zoomImage(trigger) {
        const post = trigger.closest('.fb-post-elegant');
        const img = post.querySelector('.fb-post-image-elegant img');
        
        // Crear overlay de zoom
        const overlay = document.createElement('div');
        overlay.className = 'fb-zoom-overlay';
        overlay.innerHTML = `
            <div class="fb-zoom-container">
                <img src="${img.src}" alt="${img.alt}">
                <button class="fb-zoom-close">✕</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Cerrar al hacer clic
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('fb-zoom-close')) {
                overlay.remove();
            }
        });
    }
    
    startAnimations() {
        // Animación de entrada para posts
        const posts = document.querySelectorAll('.fb-post-elegant');
        posts.forEach((post, index) => {
            post.style.animationDelay = `${index * 0.2}s`;
            post.classList.add('fb-post-animate-in');
        });
        
        // Animación de iconos flotantes
        const floatingIcons = document.querySelectorAll('.fb-floating-icon');
        floatingIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.5}s`;
        });
        
        // Animación del logo
        setTimeout(() => {
            const logo = document.querySelector('.fb-logo-animated');
            if (logo) logo.classList.add('fb-logo-pulse');
        }, 1000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new FacebookElegantIntegration();
});

window.FacebookElegantIntegration = FacebookElegantIntegration;
