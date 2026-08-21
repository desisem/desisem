// DOM Elements
const header = document.querySelector('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const newsContainer = document.getElementById('news-container');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom, .fade-in-up');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(revealCallback, {
    threshold: 0.15,
    rootMargin: "0px"
});

revealElements.forEach(element => {
    observer.observe(element);
});

// Load News from JSON
async function loadNews() {
    try {
        const response = await fetch('data/news.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const news = await response.json();

        // Clear loading spinner
        newsContainer.innerHTML = '';

        news.forEach(item => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card', 'reveal-bottom');

            // Random Unsplash image for demo purposes since we don't have images for each news item yet
            // In a real scenario, these would come from the JSON
            const randomImageId = Math.floor(Math.random() * 1000);

            newsCard.innerHTML = `
                <img src="assets/img/nota${item.id}.jpe" alt="${item.title}" class="news-img" onerror="this.src='assets/img/hero-bg.png'">
                <div class="news-content">
                    <span class="news-date">${formatDate(item.date)}</span>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <a href="${item.links}" class="news-link">Leer más <i class="fas fa-arrow-right"></i></a>
                </div>
            `;

            newsContainer.appendChild(newsCard);
            observer.observe(newsCard); // Observe new elements
        });

    } catch (error) {
        console.error('Error loading news:', error);
        // Fallback data for local file viewing without server
        const fallbackNews = [
            {
                "id": 1,
                "title": "OpenAI lanza una versión de ChatGPT diseñada para adolescentes",
                "date": "2026-08-18",
                "summary": "Ante el creciente escrutinio sobre la seguridad de los menores en entornos digitales, OpenAI ha presentado una experiencia adaptada de ChatGPT para adolescentes. Esta medida busca ofrecer un entorno de aprendizaje y apoyo más seguro, en un contexto donde los expertos alertan sobre la proliferación de contenidos inapropiados y la falta de educación sobre ciberseguridad en las escuelas.",
                "links": "#"
            },
            {
                "id": 2,
                "title": "El auge de los chatbots transforma el consumo global de noticias",
                "date": "2026-08-14",
                "summary": " Según el reporte Digital News Report 2026 del Reuters Institute, el uso de la IA para informarse subió al 10% a nivel global. Los usuarios emplean estas herramientas principalmente para buscar y resumir información, aunque el público sigue recurriendo a las fuentes de periodismo original para verificar la fiabilidad de los datos.",
                "links": "#"
            },
            {
                "id": 3,
                "title": "El festival de cortometrajes hechos con IA llega a la Cineteca Nacional",
                "date": "2026-08-20",
                "summary": " En el ámbito cultural, LG y la Cineteca Nacional premiaron los mejores trabajos de un festival de cine OLED que reunió 73 cortometrajes creados con inteligencia artificial. Las obras ganadoras estarán en exhibición gratuita durante agosto y septiembre, demostrando el impacto directo de la IA en la producción audiovisual actual.",
                "links": "#"
            }
        ];

        newsContainer.innerHTML = '';
        fallbackNews.forEach(item => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card', 'reveal-bottom');
            newsCard.innerHTML = `
                <img src="assets/img/nota${item.id}.jpe" alt="${item.title}" class="news-img" onerror="this.src='assets/img/hero-bg.png'">
                <div class="news-content">
                    <span class="news-date">${formatDate(item.date)}</span>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <a href="${item.links}" class="news-link">Leer más <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            newsContainer.appendChild(newsCard);
            observer.observe(newsCard);
        });
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-MX', options);
}

// Custom Cursor Effect (Optional Premium touch)
const cursor = document.querySelector('.cursor-glow');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadNews();
});

document.getElementById('btnEnviar').addEventListener('click', function() {
    // 1. Ofuscación de tu correo (los bots no pueden leerlo fácilmente)
    const usuario = "desisem.mx";
    const dominio = "gmail.com";
    const correoCompleto = usuario + "@" + dominio;

    // 2. Captura de los datos del formulario
    const nombre = document.getElementById('name').value;
    const asunto = document.getElementById('email').value;
    const mensaje = document.getElementById('message').value;

    // Validar que los campos no estén vacíos
    if (!nombre || !asunto || !mensaje) {
        alert("Por favor, llena todos los campos.");
        return;
    }

    // 3. Estructurar el cuerpo del correo de forma más limpia
    const cuerpoEmail = `Nombre: ${nombre}\n\nMensaje:\n${mensaje}`;

    // 4. Crear el enlace mailto con codificación URL correcta para saltos de línea y espacios
    const mailtoUrl = `mailto:${correoCompleto}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpoEmail)}`;

    // 5. Abrir el manejador de correos del usuario
    window.location.href = mailtoUrl;
});
