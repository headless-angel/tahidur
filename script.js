 // ===== Floating Code Particles =====
 function createCodeParticles() {
    const particles = ["{ }", "</>", "console.log", "function()", "=>", "npm", "git", "const", "let", "async"];
    const container = document.getElementById("codeParticles");

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "code-particle";
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(particle);
    }
}

// ===== Matrix Rain Effect =====
let matrixEnabled = false;
const toggleBtn = document.getElementById("toggleMatrix");
const canvas = document.getElementById("matrixRain");
const ctx = canvas.getContext("2d");

function setupMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Get CSS variable value properly
    const rootStyles = getComputedStyle(document.documentElement);
    const matrixGreen = rootStyles.getPropertyValue('--matrix-green').trim();

    const chars = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    function draw() {
        if (!matrixEnabled) return;

        ctx.fillStyle = "rgba(10, 10, 18, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = matrixGreen; // Use the retrieved value
        ctx.font = `${fontSize}px 'Fira Code'`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    toggleBtn.addEventListener("click", () => {
        matrixEnabled = !matrixEnabled;
        toggleBtn.textContent = `MATRIX MODE: ${matrixEnabled ? "ON" : "OFF"}`;
        if (matrixEnabled) draw();
    });
}

// ===== Scroll Animations =====
function animateOnScroll() {
    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            section.classList.add("visible");
        }
    });
}

// ===== Initialize Everything =====
window.addEventListener("load", () => {
    createCodeParticles();
    setupMatrix();
    animateOnScroll();
});

window.addEventListener("scroll", () => {
    animateOnScroll();
    updateScrollProgress();
});

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector(".scroll-progress").style.width = scrolled + '%';
}