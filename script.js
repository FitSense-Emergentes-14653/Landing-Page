// Variables globales
let isDarkMode = true; // Por defecto está en modo oscuro
let currentLanguage = 'es'; // Por defecto español

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupSmoothScroll();
    setupButtonEffects();
    setupThemeToggle();
    setupLanguageToggle();
    setupMobileMenu();
    loadThemePreference();
    loadLanguagePreference();
}

// Smooth scroll para los enlaces de navegación
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Efectos hover en botones
function setupButtonEffects() {
    document.querySelectorAll('.btn-primary, .btn-login').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Configuración del toggle de tema
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        updateThemeToggleIcon();
    }
}

// Función para cambiar entre modo claro y oscuro
function toggleTheme() {
    isDarkMode = !isDarkMode;
    applyTheme();
    saveThemePreference();
    updateThemeToggleIcon();
}

// Aplicar el tema
function applyTheme() {
    const root = document.documentElement;
    
    if (isDarkMode) {
        root.classList.add('dark-mode');
        root.classList.remove('light-mode');
    } else {
        root.classList.add('light-mode');
        root.classList.remove('dark-mode');
    }
}

// Actualizar el ícono del botón de tema
function updateThemeToggleIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', 
            isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
        );
    }
}

// Guardar preferencia de tema
function saveThemePreference() {
    localStorage.setItem('darkMode', isDarkMode);
}

// Cargar preferencia de tema
function loadThemePreference() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
        isDarkMode = savedTheme === 'true';
    }
    applyTheme();
    updateThemeToggleIcon();
}

// Configuración del menú móvil
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                closeMobileMenu();
            }
        });
    }
}

// Toggle del menú móvil
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu && mobileMenuBtn) {
        const isOpen = mobileMenu.classList.contains('show');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
}

// Abrir menú móvil
function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu && mobileMenuBtn) {
        mobileMenu.classList.add('show');
        mobileMenuBtn.innerHTML = '✕';
        mobileMenuBtn.setAttribute('aria-label', 'Cerrar menú');
        document.body.style.overflow = 'hidden';
    }
}

// Cerrar menú móvil
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu && mobileMenuBtn) {
        mobileMenu.classList.remove('show');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = '';
    }
}

// Animación de entrada para las cards
function animateOnScroll() {
    const cards = document.querySelectorAll('.benefit-card, .plan-card, .team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Llamar la animación cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateOnScroll, 100);
});

// ========= FUNCIONES DE IDIOMA =========

// Traducciones
const translations = {
    es: {
        // Header
        inicio: 'Inicio',
        beneficios: 'Beneficios',
        planes: 'Planes',
        sobreNosotros: 'Sobre Nosotros',
        registro: 'Registro',
        acceder: 'Acceder',
        
        // Hero
        heroTitle: 'Transforma tus datos en resultados reales',
        heroDescription: 'FitSense combina inteligencia artificial y entrenamiento personalizado para que alcances tus metas de forma más rápida, segura y motivadora.',
        heroButton: 'Comienza ahora gratis',
        
        // Beneficios
        beneficiosTitle: 'Beneficios',
        benefit1Title: 'Entrenamiento Personalizado',
        benefit1Desc: 'Planes personalizados según tu nivel y objetivos.',
        benefit2Title: 'Progreso en Tiempo Real',
        benefit2Desc: 'Comunidad activa que impulsa tu constancia.',
        benefit3Title: 'Tecnología Inteligente',
        benefit3Desc: 'Seguimiento de progreso con métricas visuales.',
        benefit4Title: 'Motivación Constante',
        benefit4Desc: 'Recordatorios y motivación diaria.',
        
        // Planes
        planesTitle: 'Planes',
        planFreemium: 'Freemium',
        planPremium: 'Premium',
        planButton: 'Lo quiero',
        freemiumFeature1: 'Acceso gratuito a rutinas básicas personalizadas.',
        freemiumFeature2: 'Seguimiento de progreso con métricas visuales.',
        freemiumFeature3: 'Comunidad FitSense para motivarte.',
        premiumFeature1: 'Planes personalizados con IA avanzados',
        premiumFeature2: 'Dashboard completo de progreso y logros',
        premiumFeature3: 'Acceso a desafíos, insignias y estadísticas premium',
        premiumFeature4: 'Recordatorios de hidratación y actividad diaria',
        
        // Sobre nosotros
        sobreTitle: 'Sobre Nosotros',
        sobreDesc1: '<strong>Tech Solutions</strong> es una startup formada por cinco estudiantes de la Universidad Peruana de Ciencias Aplicadas (UPC), dedicada a desarrollar soluciones digitales innovadoras que integran inteligencia artificial y tecnología móvil.',
        sobreDesc2: '<strong>Nuestro propósito</strong> es transformar la forma en que las personas se relacionan con la tecnología, creando experiencias prácticas, accesibles y personalizadas.',
        sobreDesc3: 'Con <strong>FitSense</strong>, buscamos revolucionar el bienestar digital, ofreciendo una plataforma que combina ciencia, datos y motivación para acompañar a cada usuario en el logro de sus metas fitness.',
        
        // Equipo
        equipoTitle: 'TechSolutions',
        
        // Footer
        footerTagline: 'Tu asistente IA favorito',
        footerAddress: 'Address',
        footerContact: 'Contact',
        footerLocation: 'Lima, Perú'
    },
    en: {
        // Header
        inicio: 'Home',
        beneficios: 'Benefits',
        planes: 'Plans',
        sobreNosotros: 'About Us',
        registro: 'Sign Up',
        acceder: 'Log In',
        
        // Hero
        heroTitle: 'Transform your data into real results',
        heroDescription: 'FitSense combines artificial intelligence and personalized training so you can reach your goals faster, safer and more motivating.',
        heroButton: 'Start now for free',
        
        // Beneficios
        beneficiosTitle: 'Benefits',
        benefit1Title: 'Personalized Training',
        benefit1Desc: 'Customized plans according to your level and goals.',
        benefit2Title: 'Real-time Progress',
        benefit2Desc: 'Active community that drives your consistency.',
        benefit3Title: 'Smart Technology',
        benefit3Desc: 'Progress tracking with visual metrics.',
        benefit4Title: 'Constant Motivation',
        benefit4Desc: 'Daily reminders and motivation.',
        
        // Planes
        planesTitle: 'Plans',
        planFreemium: 'Freemium',
        planPremium: 'Premium',
        planButton: 'I want it',
        freemiumFeature1: 'Free access to basic personalized routines.',
        freemiumFeature2: 'Progress tracking with visual metrics.',
        freemiumFeature3: 'FitSense community to motivate you.',
        premiumFeature1: 'Advanced AI personalized plans',
        premiumFeature2: 'Complete progress and achievements dashboard',
        premiumFeature3: 'Access to challenges, badges and premium statistics',
        premiumFeature4: 'Hydration and daily activity reminders',
        
        // Sobre nosotros
        sobreTitle: 'About Us',
        sobreDesc1: '<strong>Tech Solutions</strong> is a startup formed by five students from the Peruvian University of Applied Sciences (UPC), dedicated to developing innovative digital solutions that integrate artificial intelligence and mobile technology.',
        sobreDesc2: '<strong>Our purpose</strong> is to transform the way people relate to technology, creating practical, accessible and personalized experiences.',
        sobreDesc3: 'With <strong>FitSense</strong>, we seek to revolutionize digital wellness, offering a platform that combines science, data and motivation to accompany each user in achieving their fitness goals.',
        
        // Equipo
        equipoTitle: 'TechSolutions',
        
        // Footer
        footerTagline: 'Your favorite AI assistant',
        footerAddress: 'Address',
        footerContact: 'Contact',
        footerLocation: 'Lima, Peru'
    }
};

// Configuración del toggle de idioma
function setupLanguageToggle() {
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
        updateLanguageToggleText();
    }
}

// Función para cambiar idioma
function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    applyLanguage();
    saveLanguagePreference();
    updateLanguageToggleText();
}

// Aplicar el idioma
function applyLanguage() {
    const lang = translations[currentLanguage];
    
    // Actualizar elementos por data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (lang[key]) {
            if (element.innerHTML.includes('<strong>')) {
                element.innerHTML = lang[key];
            } else {
                element.textContent = lang[key];
            }
        }
    });
    
    // Actualizar atributos lang
    document.documentElement.lang = currentLanguage;
}

// Actualizar texto del botón de idioma
function updateLanguageToggleText() {
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.textContent = currentLanguage.toUpperCase();
        languageToggle.setAttribute('aria-label', 
            currentLanguage === 'es' ? 'Change to English' : 'Cambiar a Español'
        );
    }
}

// Guardar preferencia de idioma
function saveLanguagePreference() {
    localStorage.setItem('language', currentLanguage);
}

// Cargar preferencia de idioma
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        currentLanguage = savedLanguage;
    }
    applyLanguage();
    updateLanguageToggleText();
}