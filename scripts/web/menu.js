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
// --- Lógica del Header y Selección de Planes (Versión Limpia) ---

let scrollPrevio = window.scrollY;
const elHeader = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const scrollActual = window.scrollY;

    // Si estamos arriba, el header se queda fijo
    if (scrollActual <= 0) {
        elHeader.classList.remove('hide-header');
    } 
    // Si bajamos más de 80px y vamos hacia abajo, lo ocultamos
    else if (scrollActual > scrollPrevio && scrollActual > 80) {
        elHeader.classList.add('hide-header');
    } 
    // Si subimos, lo mostramos
    else {
        elHeader.classList.remove('hide-header');
    }

    scrollPrevio = scrollActual;
});

// Esta función busca todos los botones de los planes y los conecta con el formulario
document.querySelectorAll('.select-plan').forEach(boton => {
    boton.addEventListener('click', function() {
        // Lee el nombre del plan (Personal, Empresa SME o Corporate)
        const nombreDelPlan = this.getAttribute('data-plan');
        const selectFormulario = document.getElementById('planSelector');
        
        if(selectFormulario) {
            // Cambia el valor del desplegable del formulario automáticamente
            selectFormulario.value = nombreDelPlan;
            
            // Efecto visual: el selector se pone azul claro un segundo para avisar del cambio
            selectFormulario.style.backgroundColor = "#e1f5fe";
            selectFormulario.style.transition = "background-color 0.5s ease";
            
            setTimeout(() => { 
                selectFormulario.style.backgroundColor = "white"; 
            }, 600);
        }
    });
});
// --- Validación del Formulario de Contacto ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Detenemos el envío por defecto

        // Obtenemos los valores
        const plan = document.getElementById('planSelector').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // 1. Validación silenciosa: Si algo falla, el formulario no se envía, 
        // pero solo avisamos si el usuario realmente intenta algo mal.
        if (!plan || name.length < 3 || !email.includes('@')) {
            // Aquí puedes añadir un borde rojo a los inputs en vez de alertas
            alert("Por favor, revisa que todos los campos sean correctos (Plan, Nombre y Email).");
            return; // EXIT: Aquí el código se detiene, no llega a la alerta de éxito
        }

        // 2. Si llega aquí, es que todo está OK. Mostramos la ALERTA DE ÉXITO.
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        setTimeout(() => {
            alert('¡Gracias, ' + name + '! Hemos recibido tu solicitud para el plan ' + plan + '. Te contactaremos en menos de 24 horas.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
        }, 1500);
    });
}