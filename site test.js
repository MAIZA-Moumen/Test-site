// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu en cliquant sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== DATE MINIMUM POUR RÉSERVATION =====
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    dateInput.setAttribute('min', formatDate(tomorrow));
}

// ===== FORMULAIRE DE RÉSERVATION =====
const reservationForm = document.getElementById('reservationForm');
const confirmationModal = document.getElementById('confirmationModal');

if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Afficher les données dans la console (pour démonstration)
        console.log('Réservation:', data);
        
        // Afficher le modal de confirmation
        confirmationModal.classList.add('active');
        
        // Réinitialiser le formulaire
        this.reset();
    });
}

// ===== FERMER LE MODAL =====
function closeModal() {
    confirmationModal.classList.remove('active');
}

// Fermer le modal en cliquant à l'extérieur
confirmationModal.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Fermer le modal avec la touche Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && confirmationModal.classList.contains('active')) {
        closeModal();
    }
});

// ===== ANIMATION AU SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.tarif-card, .team-member, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Classe pour l'animation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// ===== VALIDATION TÉLÉPHONE =====
const telephoneInput = document.getElementById('telephone');
if (telephoneInput) {
    telephoneInput.addEventListener('input', function(e) {
        // Garder uniquement les chiffres et certains caractères
        let value = e.target.value.replace(/[^\d\s\-\+\(\)]/g, '');
        e.target.value = value;
    });
}
