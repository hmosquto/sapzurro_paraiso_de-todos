// Enhanced Gallery Functionality for Sapzurro Website
// Provides advanced filtering, lightbox, and interactive features

class GalleryEnhanced {
    constructor() {
        this.currentFilter = 'todas';
        this.lightboxOpen = false;
        this.currentImageIndex = 0;
        this.images = [];
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupLightbox();
        this.setupImageLazyLoading();
        this.setupKeyboardNavigation();
        this.collectImages();
    }

    collectImages() {
        const figures = document.querySelectorAll('.galeria-principal figure');
        this.images = Array.from(figures).map(figure => {
            const img = figure.querySelector('img');
            const caption = figure.querySelector('figcaption');
            return {
                src: img.src,
                alt: img.alt,
                title: img.title,
                caption: caption ? caption.textContent : '',
                category: figure.dataset.categoria,
                element: figure
            };
        });
    }

    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.galeria-filtros button');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.dataset.filtro;
                this.filterImages(filter);
                this.updateActiveFilter(button);
            });
        });
    }

    filterImages(filter) {
        this.currentFilter = filter;
        const figures = document.querySelectorAll('.galeria-principal figure');
        
        figures.forEach(figure => {
            const category = figure.dataset.categoria;
            
            if (filter === 'todas' || category === filter) {
                figure.style.display = 'block';
                figure.classList.add('fade-in');
                setTimeout(() => figure.classList.remove('fade-in'), 300);
            } else {
                figure.style.display = 'none';
            }
        });

        // Update visible images count
        this.updateImageCount();
    }

    updateActiveFilter(activeButton) {
        const filterButtons = document.querySelectorAll('.galeria-filtros button');
        filterButtons.forEach(btn => btn.classList.remove('filtro-activo'));
        activeButton.classList.add('filtro-activo');
    }

    updateImageCount() {
        const visibleImages = document.querySelectorAll('.galeria-principal figure[style*="block"], .galeria-principal figure:not([style])');
        const countElement = document.querySelector('.image-count');
        
        if (countElement) {
            countElement.textContent = `${visibleImages.length} imágenes`;
        }
    }

    setupLightbox() {
        // Create lightbox HTML
        const lightboxHTML = `
            <div id="lightbox" class="lightbox" style="display: none;">
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <button class="lightbox-prev">&#8249;</button>
                    <button class="lightbox-next">&#8250;</button>
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-caption"></div>
                    <div class="lightbox-counter"></div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        // Add click listeners to images
        const images = document.querySelectorAll('.galeria-principal figure img');
        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                this.openLightbox(index);
            });
            img.style.cursor = 'pointer';
        });

        // Lightbox controls
        document.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        document.querySelector('.lightbox-overlay').addEventListener('click', () => this.closeLightbox());
        document.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
        document.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());
    }

    openLightbox(index) {
        const visibleImages = this.getVisibleImages();
        if (visibleImages.length === 0) return;

        this.currentImageIndex = index;
        this.lightboxOpen = true;
        
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const lightboxCounter = document.querySelector('.lightbox-counter');
        
        const imageData = visibleImages[index];
        
        lightboxImage.src = imageData.src;
        lightboxImage.alt = imageData.alt;
        lightboxCaption.textContent = imageData.caption;
        lightboxCounter.textContent = `${index + 1} / ${visibleImages.length}`;
        
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        setTimeout(() => lightbox.classList.add('lightbox-active'), 10);
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('lightbox-active');
        
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
            this.lightboxOpen = false;
        }, 300);
    }

    prevImage() {
        const visibleImages = this.getVisibleImages();
        this.currentImageIndex = (this.currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        this.updateLightboxImage();
    }

    nextImage() {
        const visibleImages = this.getVisibleImages();
        this.currentImageIndex = (this.currentImageIndex + 1) % visibleImages.length;
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        const visibleImages = this.getVisibleImages();
        const imageData = visibleImages[this.currentImageIndex];
        
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const lightboxCounter = document.querySelector('.lightbox-counter');
        
        lightboxImage.src = imageData.src;
        lightboxImage.alt = imageData.alt;
        lightboxCaption.textContent = imageData.caption;
        lightboxCounter.textContent = `${this.currentImageIndex + 1} / ${visibleImages.length}`;
    }

    getVisibleImages() {
        return this.images.filter(img => {
            return this.currentFilter === 'todas' || img.category === this.currentFilter;
        });
    }

    setupImageLazyLoading() {
        const images = document.querySelectorAll('.galeria-principal img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.lightboxOpen) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalleryEnhanced();
});

// Add CSS for enhanced gallery features
const galleryStyles = `
<style>
.galeria-principal figure {
    transition: all 0.3s ease;
    cursor: pointer;
}

.galeria-principal figure:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.fade-in {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}

.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lightbox-active {
    opacity: 1;
}

.lightbox-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.lightbox-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
}

.lightbox-caption {
    color: white;
    text-align: center;
    margin-top: 15px;
    font-size: 1.1rem;
    max-width: 600px;
}

.lightbox-counter {
    color: #ccc;
    margin-top: 10px;
    font-size: 0.9rem;
}

.lightbox-close,
.lightbox-prev,
.lightbox-next {
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.lightbox-close:hover,
.lightbox-prev:hover,
.lightbox-next:hover {
    background: rgba(255, 255, 255, 0.3);
}

.lightbox-close {
    top: 20px;
    right: 20px;
}

.lightbox-prev {
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
}

.lightbox-next {
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
}

.image-count {
    text-align: center;
    margin: 20px 0;
    color: #666;
    font-style: italic;
}

@media (max-width: 768px) {
    .lightbox-prev,
    .lightbox-next {
        font-size: 1.5rem;
        padding: 8px;
    }
    
    .lightbox-close {
        font-size: 1.5rem;
        padding: 8px;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', galleryStyles);
