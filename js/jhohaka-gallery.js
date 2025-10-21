// Jhohaka Hotel Gallery JavaScript
// Handles photo gallery functionality for Hotel Cabaña Jhohaka

class JhohakaGallery {
    constructor() {
        this.currentImageIndex = 0;
        this.images = [
            {
                src: 'img/Imgane7.jpg',
                alt: 'Hotel Cabaña Jhohaka - Vista principal',
                title: 'Fachada principal del hotel con vista al mar'
            },
            {
                src: 'img/Imgane6.jpg',
                alt: 'Cabañas tradicionales Jhohaka',
                title: 'Cabañas tradicionales con diseño auténtico'
            },
            {
                src: 'img/Imgane8.jpg',
                alt: 'Habitación Hotel Jhohaka',
                title: 'Habitación cómoda con aire acondicionado'
            },
            {
                src: 'img/Imgane9.jpg',
                alt: 'Vista al mar desde Jhohaka',
                title: 'Vista panorámica al mar Caribe'
            },
            {
                src: 'img/Imgane10.jpg',
                alt: 'Restaurante Hotel Jhohaka',
                title: 'Restaurante con especialidades del mar'
            },
            {
                src: 'img/Imgane11.jpg',
                alt: 'Terraza Hotel Jhohaka',
                title: 'Terraza con vista al amanecer'
            }
        ];
        this.init();
    }

    init() {
        this.createLightbox();
        this.setupEventListeners();
    }

    createLightbox() {
        const lightboxHTML = `
            <div id="jhohaka-lightbox" class="jhohaka-lightbox" style="display: none;">
                <div class="lightbox-overlay" onclick="this.parentElement.style.display='none'"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close" onclick="document.getElementById('jhohaka-lightbox').style.display='none'">&times;</button>
                    <button class="lightbox-prev" onclick="jhohakaGallery.prevImage()">&#8249;</button>
                    <button class="lightbox-next" onclick="jhohakaGallery.nextImage()">&#8250;</button>
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-info">
                        <h3 class="lightbox-title"></h3>
                        <div class="lightbox-counter"></div>
                    </div>
                    <div class="lightbox-thumbnails">
                        ${this.images.map((img, index) => 
                            `<img src="${img.src}" alt="${img.alt}" class="lightbox-thumb" onclick="jhohakaGallery.goToImage(${index})">`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('jhohaka-lightbox');
            if (lightbox.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        lightbox.style.display = 'none';
                        break;
                    case 'ArrowLeft':
                        this.prevImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    openGallery(startIndex = 0) {
        this.currentImageIndex = startIndex;
        this.updateLightboxImage();
        const lightbox = document.getElementById('jhohaka-lightbox');
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    updateLightboxImage() {
        const lightbox = document.getElementById('jhohaka-lightbox');
        const image = lightbox.querySelector('.lightbox-image');
        const title = lightbox.querySelector('.lightbox-title');
        const counter = lightbox.querySelector('.lightbox-counter');
        const thumbnails = lightbox.querySelectorAll('.lightbox-thumb');
        
        const currentImage = this.images[this.currentImageIndex];
        
        image.src = currentImage.src;
        image.alt = currentImage.alt;
        title.textContent = currentImage.title;
        counter.textContent = `${this.currentImageIndex + 1} / ${this.images.length}`;
        
        // Update active thumbnail
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentImageIndex);
        });
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateLightboxImage();
    }

    prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.updateLightboxImage();
    }

    goToImage(index) {
        this.currentImageIndex = index;
        this.updateLightboxImage();
    }

    changeMainImage(thumbnailElement) {
        const mainImage = document.querySelector('.jhohaka-main-image img');
        const newSrc = thumbnailElement.src;
        const newAlt = thumbnailElement.alt;
        
        // Fade effect
        mainImage.style.opacity = '0.5';
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.alt = newAlt;
            mainImage.style.opacity = '1';
        }, 200);
        
        // Update active thumbnail
        document.querySelectorAll('.jhohaka-thumbnails .thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbnailElement.classList.add('active');
    }
}

// Global functions for onclick handlers
let jhohakaGallery;

function openJhohakaGallery() {
    if (!jhohakaGallery) {
        jhohakaGallery = new JhohakaGallery();
    }
    jhohakaGallery.openGallery();
}

function changeJhohakaImage(thumbnailElement) {
    if (!jhohakaGallery) {
        jhohakaGallery = new JhohakaGallery();
    }
    jhohakaGallery.changeMainImage(thumbnailElement);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    jhohakaGallery = new JhohakaGallery();
    
    // Set first thumbnail as active
    const firstThumbnail = document.querySelector('.jhohaka-thumbnails .thumbnail');
    if (firstThumbnail) {
        firstThumbnail.classList.add('active');
    }
});

// Add CSS styles
const jhohakaStyles = `
<style>
.jhohaka-highlight {
    background: linear-gradient(135deg, #e3f2fd 0%, #f1f8e9 100%);
    border-radius: 15px;
    padding: 25px;
    margin: 20px 0;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    border: 2px solid #4fc3f7;
    position: relative;
    overflow: hidden;
}

.jhohaka-highlight::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(79,195,247,0.1) 0%, transparent 70%);
    pointer-events: none;
}

.jhohaka-gallery {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.jhohaka-main-image {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

.jhohaka-main-image img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: all 0.3s ease;
}

.gallery-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    padding: 20px;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.jhohaka-main-image:hover .gallery-overlay {
    transform: translateY(0);
}

.gallery-btn {
    background: #4fc3f7;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
}

.gallery-btn:hover {
    background: #29b6f6;
    transform: translateY(-2px);
}

.jhohaka-thumbnails {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.thumbnail {
    width: 100%;
    height: 70px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.thumbnail:hover {
    transform: scale(1.05);
    border-color: #4fc3f7;
}

.thumbnail.active {
    border-color: #2196f3;
    box-shadow: 0 4px 12px rgba(33,150,243,0.3);
}

.jhohaka-info {
    position: relative;
    z-index: 2;
}

.jhohaka-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
}

.jhohaka-icon {
    font-size: 2.5rem;
    background: linear-gradient(135deg, #4fc3f7, #29b6f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.jhohaka-rating {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 5px;
}

.stars {
    font-size: 1.1rem;
}

.rating-text {
    color: #666;
    font-size: 0.9rem;
}

.jhohaka-desc {
    color: #555;
    line-height: 1.6;
    margin-bottom: 20px;
}

.jhohaka-precio {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.precio-destacado {
    font-size: 2rem;
    font-weight: bold;
    color: #2e7d32;
}

.por-noche {
    color: #666;
    font-size: 0.9rem;
}

.precio-info {
    background: #e8f5e8;
    color: #2e7d32;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
}

.jhohaka-features {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.feature {
    background: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border: 1px solid #e0e0e0;
}

.jhohaka-highlights {
    background: rgba(255,255,255,0.8);
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
}

.jhohaka-highlights h4 {
    margin: 0 0 10px 0;
    color: #2e7d32;
}

.jhohaka-highlights ul {
    margin: 0;
    padding-left: 20px;
}

.jhohaka-highlights li {
    margin-bottom: 5px;
    color: #555;
}

.jhohaka-contact {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.contact-btn {
    padding: 12px 20px;
    border-radius: 25px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.contact-btn.primary {
    background: #4fc3f7;
    color: white;
}

.contact-btn.whatsapp {
    background: #25d366;
    color: white;
}

.contact-btn.maps {
    background: #ea4335;
    color: white;
}

.contact-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

/* Lightbox Styles */
.jhohaka-lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
    to { opacity: 1; }
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
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-radius: 15px;
    overflow: hidden;
}

.lightbox-image {
    max-width: 100%;
    max-height: 60vh;
    object-fit: contain;
}

.lightbox-info {
    padding: 20px;
    text-align: center;
    background: white;
    width: 100%;
}

.lightbox-title {
    margin: 0 0 10px 0;
    color: #333;
}

.lightbox-counter {
    color: #666;
    font-size: 0.9rem;
}

.lightbox-thumbnails {
    display: flex;
    gap: 10px;
    padding: 15px;
    background: #f5f5f5;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
}

.lightbox-thumb {
    width: 60px;
    height: 40px;
    object-fit: cover;
    border-radius: 5px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.lightbox-thumb:hover,
.lightbox-thumb.active {
    border-color: #4fc3f7;
    transform: scale(1.1);
}

.lightbox-close,
.lightbox-prev,
.lightbox-next {
    position: absolute;
    background: rgba(255,255,255,0.9);
    border: none;
    font-size: 2rem;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    transition: all 0.3s ease;
    z-index: 10;
}

.lightbox-close {
    top: 15px;
    right: 15px;
}

.lightbox-prev {
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
}

.lightbox-next {
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
}

.lightbox-close:hover,
.lightbox-prev:hover,
.lightbox-next:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
}

.lightbox-close:hover {
    transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 768px) {
    .jhohaka-gallery {
        grid-template-columns: 1fr;
    }
    
    .jhohaka-thumbnails {
        grid-template-columns: repeat(4, 1fr);
    }
    
    .jhohaka-contact {
        flex-direction: column;
    }
    
    .contact-btn {
        text-align: center;
        justify-content: center;
    }
    
    .lightbox-content {
        max-width: 95vw;
        max-height: 95vh;
    }
    
    .lightbox-thumbnails {
        padding: 10px;
    }
    
    .lightbox-thumb {
        width: 50px;
        height: 35px;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', jhohakaStyles);
