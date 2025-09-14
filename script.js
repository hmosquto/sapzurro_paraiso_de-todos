document.addEventListener('DOMContentLoaded', function () {
  // Menú hamburguesa
  const menuToggle = document.querySelector('.menu-toggle');
  const menuUl = document.querySelector('nav.menu ul');
  if (menuToggle && menuUl) {
    menuToggle.onclick = () => menuUl.classList.toggle('open');
  }

  // Slider automático y manual
  let current = 0;
  const slides = document.querySelectorAll('.slider .slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let sliderInterval;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
  }
  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }
  function startAutoSlide() {
    sliderInterval = setInterval(nextSlide, 4000);
  }
  function stopAutoSlide() {
    clearInterval(sliderInterval);
  }
  if (slides.length && prevBtn && nextBtn) {
    showSlide(current);
    startAutoSlide();
    nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
    prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
  }

  // Mini galería: cambia imagen principal al hacer clic en miniaturas
  const miniaturas = document.querySelectorAll('.mini-galeria img');
  const imagenPrincipal = document.querySelector('.imagen-principal');
  miniaturas.forEach(img => {
    img.addEventListener('click', () => {
      if (imagenPrincipal) {
        imagenPrincipal.src = img.src;
        imagenPrincipal.alt = img.alt;
      }
    });
  });

  // Lightbox para galería
  const galeriaImgs = document.querySelectorAll('.galeria-grid img');
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.innerHTML = `
      <span class="lightbox-close" id="lightboxClose">&times;</span>
      <img class="lightbox-img" id="lightboxImg" src="" alt="">
      <div class="lightbox-caption" id="lightboxCaption"></div>
    `;
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    galeriaImgs.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        const figcaption = img.parentElement.querySelector('figcaption');
        lightboxCaption.textContent = figcaption ? figcaption.textContent : img.alt;
        lightbox.style.display = 'flex';
      });
    });
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
      }
    });
  }

  // Modal publicidad (solo una vez por sesión)
  const modal = document.getElementById('modalPublicidad');
  if (modal && !sessionStorage.getItem('publiMostrada')) {
    setTimeout(() => { modal.style.display = 'flex'; }, 2000);
    sessionStorage.setItem('publiMostrada', 'yes');
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // Toast promo (solo una vez por sesión)
  const toast = document.getElementById('toastPromo');
  if (toast && !sessionStorage.getItem('toastPromoMostrada')) {
    setTimeout(() => { toast.style.display = 'flex'; }, 4000);
    sessionStorage.setItem('toastPromoMostrada', 'yes');
    toast.addEventListener('click', () => { toast.style.display = 'none'; });
  }

  // Filtros de galería
  document.querySelectorAll('.galeria-filtros button').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.galeria-filtros button').forEach(b => b.classList.remove('filtro-activo'));
      btn.classList.add('filtro-activo');
      const filtro = btn.dataset.filtro;
      document.querySelectorAll('.galeria-grid figure').forEach(fig => {
        fig.style.display = (filtro === 'todas' || fig.dataset.categoria === filtro) ? '' : 'none';
      });
    });
  });

  // Mapa Leaflet - con delay para evitar conflictos
  setTimeout(() => {
    if (window.L && document.getElementById('mapa-sapzurro')) {
      const map = L.map('mapa-sapzurro').setView([8.6667, -77.3667], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ' OpenStreetMap'
      }).addTo(map);
      L.marker([8.6667, -77.3667]).addTo(map)
        .bindPopup('Sapzurro, Chocó').openPopup();
    }
  }, 1000);

  // Año dinámico en el footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});