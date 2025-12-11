// menu.js
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        menuToggle.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú en móvil
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Actualizar enlace activo
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí normalmente enviarías el formulario a un servidor
            // Por ahora, solo mostraremos un mensaje de confirmación
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simulación de envío
            setTimeout(() => {
                alert('¡Gracias por contactarnos! Te responderemos en menos de 24 horas.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Animación de contadores en la sección "Sobre Nosotros"
    const statsSection = document.querySelector('.about-stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('%') ? '%' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '');
                    }
                }, 30);
            });
            animated = true;
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Comprobar al cargar la página
});
// --- Ocultar/mostrar header según scroll ---
let lastScrollY2 = window.scrollY;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    let lastScrollY2 = window.scrollY;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Cuando estás arriba del todo, el header siempre visible
    if (currentScroll <= 0) {
        header.classList.remove('hide-header');
        lastScrollY2 = currentScroll;
        return;
    }

    // Lógica normal de ocultar/mostrar
    if (currentScroll > lastScrollY2) {
        header.classList.add('hide-header');   // Ocultar al bajar
    } else {
        header.classList.remove('hide-header'); // Mostrar al subir
    }

    lastScrollY2 = currentScroll;
});


    lastScrollY2 = currentScroll;
});
