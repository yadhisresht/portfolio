const words = ["Hello", "Namaste", "Vanakkam", "स्वागत है", "Namaskara", "Hallo"];
let idx = 0;
function playIntro() {
    const text = document.getElementById("intro-text");
    if (idx < words.length) {
        text.textContent = words[idx];
        text.style.opacity = 1;
        setTimeout(() => { text.style.opacity = 0; }, 400);
        setTimeout(() => { idx++; playIntro(); }, 800);
    } else {
        document.getElementById("intro-overlay").style.transform = "translateY(-100%)";
    }
}
window.onload = playIntro;

new Typed('.multiple-text', {
    strings: ['Researcher', 'Co-Founder @ FORESIGHT-X', 'Public Speaker', 'Sports Enthusiast', 'Techie'],
    typeSpeed: 50, backSpeed: 50, loop: true
});

// IMPROVED CURSOR - BIGGER & SMOOTHER
const canvas = document.getElementById("cursor-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.onresize = resize; resize();

window.onmousemove = (e) => {
    for(let i=0; i<5; i++) {
        particles.push({
            x: e.clientX, y: e.clientY,
            vx: (Math.random()-0.5)*2,
            vy: (Math.random()-0.5)*2,
            size: Math.random() * 4 + 2, // SLIGHTLY BIGGER
            life: 1
        });
    }
};

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,i) => {
        ctx.fillStyle = `rgba(0, 242, 255, ${p.life})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
        p.x += p.vx; p.y += p.vy; p.life -= 0.02;
        if(p.life <= 0) particles.splice(i,1);
    });
    requestAnimationFrame(animate);
}
animate();

// --- TERMINAL LOG ANIMATION ---
const terminalLog = document.getElementById('terminal-log');
const lines = [
    "> Checking network status...",
    "> Scanning for encryption keys...",
    "> Establishing handshake with Yadhi_Server...",
    "> Warning: Unauthorized awesomeness detected.",
    "> Access granted. Ready for comms."
];

let lineIndex = 0;

function addLogLine() {
    if (lineIndex < lines.length) {
        const p = document.createElement('p');
        p.className = 'log-line';
        p.innerText = lines[lineIndex];
        terminalLog.appendChild(p);
        lineIndex++;
        setTimeout(addLogLine, 1500); // New line every 1.5 seconds
    }
}

// Start the log when the section is in view
const connectSection = document.getElementById('connect');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        addLogLine();
        observer.unobserve(connectSection);
    }
});

observer.observe(connectSection);

ScrollReveal().reveal('.home-content, .heading', { origin: 'top', distance: '40px', duration: 1000 });
ScrollReveal().reveal('.skill-card, .research-card, .portfolio-box', { origin: 'bottom', interval: 150 });

const audioToggle = document.getElementById('audio-toggle');
const bgAudio = document.getElementById('bg-audio');
const audioText = document.querySelector('.audio-text');

let isPlaying = false;

// Set initial volume
bgAudio.volume = 0.3; // 30% volume so it's not too loud

audioToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgAudio.pause();
        audioToggle.classList.remove('audio-active');
        audioText.innerText = "AUDIO_OFF";
    } else {
        bgAudio.play();
        audioToggle.classList.add('audio-active');
        audioText.innerText = "AUDIO_ON";
    }
    isPlaying = !isPlaying;
});document.addEventListener('DOMContentLoaded', () => {
    const chatOrb = document.getElementById('chat-orb');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');

    // --- YOUR KNOWLEDGE BASE ---
    // Add every detail about your life/work here
    const knowledgeBase = {
        identity: ["yadhisresht", "yadhi", "who are you", "your name"],
        identity_ans: "I am Yadhi-AI, the digital twin of Yadhisresht Harikrishnan. He is a researcher specializing in AI and Earthquake Engineering.",
        
        research: ["research", "projects", "papers", "study", "work"],
        research_ans: "Yadhi's research focuses on AI/ML applications in Earthquake Engineering, specifically ANN-based seismic modeling and geospatial intelligence.",
        
        foresight: ["foresight", "lab", "startup", "x"],
        foresight_ans: "FORESIGHT-X is an interdisciplinary lab co-founded by Yadhi. It integrates AI/ML with disaster management for advanced prediction.",
        
        education: ["college", "university", "study", "srm", "degree", "education"],
        education_ans: "Yadhi is currently at SRM IST, KTR, Chennai. He is heavily involved with the ISET SRM Student Chapter as Vice-Chairman.",
        
        awards: ["awards", "win", "achievements", "hackathon", "competition"],
        awards_ans: "Yadhi has won multiple hackathons and paper presentations at prestigious institutions like IIT Indore, IISc Bangalore, and Manipal.",
        
        skills: ["skills", "python", "ai", "ml", "coding", "languages"],
        skills_ans: "His technical stack includes Python, Machine Learning (TensorFlow/PyTorch), GIS, and Seismic Data Analysis.",
        
        contact: ["email", "phone", "contact", "hire", "talk to him"],
        contact_ans: "You can find his email and phone number in the 'Digital Command Center' section above, or click the LinkedIn icon to connect!"
    };

    // --- LOGIC ENGINE ---
    const getBotResponse = (input) => {
        const msg = input.toLowerCase();
        
        if (msg.includes("research") || msg.includes("project")) return knowledgeBase.research_ans;
        if (msg.includes("foresight")) return knowledgeBase.foresight_ans;
        if (msg.includes("who") || msg.includes("name") || msg.includes("you")) return knowledgeBase.identity_ans;
        if (msg.includes("college") || msg.includes("study") || msg.includes("srm")) return knowledgeBase.education_ans;
        if (msg.includes("award") || msg.includes("win")) return knowledgeBase.awards_ans;
        if (msg.includes("skill") || msg.includes("tech")) return knowledgeBase.skills_ans;
        if (msg.includes("contact") || msg.includes("mail")) return knowledgeBase.contact_ans;

        return "I'm not sure about that specific detail yet. You can try asking about his Research, Awards, or FORESIGHT-X.";
    };

    // --- UI FUNCTIONS ---
    const sendMessage = () => {
        const text = userInput.value.trim();
        if (!text) return;

        chatBody.innerHTML += `<div class="msg user-msg">${text}</div>`;
        userInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            const response = getBotResponse(text);
            chatBody.innerHTML += `<div class="msg bot-msg">${response}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 500);
    };

    chatOrb.addEventListener('click', () => chatWindow.style.display = 'flex');
    closeChat.addEventListener('click', () => chatWindow.style.display = 'none');
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
});

const form = document.getElementById("suggestion-form");
const status = document.getElementById("form-status");

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        status.innerHTML = "<span style='color: #27c93f;'>> DATA_TRANSMITTED_SUCCESSFULLY</span>";
        form.reset();
    } else {
        status.innerHTML = "<span style='color: #ff5f56;'>> ERROR: UPLINK_FAILED</span>";
    }
}


form.addEventListener("submit", handleSubmit);
