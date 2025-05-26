document.addEventListener("DOMContentLoaded", () => {
    // Chat functionality
    const botToggle = document.getElementById("chatbotToggle");
    const chatWindow = document.getElementById("chatbotWindow");
    const chatContent = document.getElementById("chatbotContent");
    const closeChat = document.querySelector(".close-chat");

    // Navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");
    
    // Scroll-triggered animations
    const sections = document.querySelectorAll("section");
    const header = document.querySelector("header");
    const backToTop = document.getElementById("backToTop");

    // Chat Q&A pairs
    const qaPairs = [
        {
            question: "What is VerbaSphere?",
            answer: "VerbaSphere is a modern blogging platform designed to empower writers and connect readers through engaging content and community features."
        },
        {
            question: "How do I start writing?",
            answer: "Simply click on 'Write Blog' in the navigation menu. You'll be guided through our intuitive writing interface to create and publish your content."
        },
        {
            question: "Is it free to use?",
            answer: "Yes! VerbaSphere is completely free for both readers and writers. We believe in making quality content accessible to everyone."
        },
        {
            question: "How can I grow my audience?",
            answer: "Engage with the community, write consistently, use relevant tags, and share your content on social media. Our platform helps promote quality content to interested readers."
        },
        {
            question: "What makes VerbaSphere different?",
            answer: "We combine modern technology with a focus on community. Our platform offers advanced writing tools, AI-powered recommendations, and meaningful connections between writers and readers."
        }
    ];

    // Mobile menu toggle
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    // Chatbot toggle
    botToggle.addEventListener("click", () => {
        chatWindow.style.display = chatWindow.style.display === "block" ? "none" : "block";
        loadQuestions();
    });

    closeChat.addEventListener("click", () => {
        chatWindow.style.display = "none";
    });

    // Load chat questions
    function loadQuestions() {
        chatContent.innerHTML = `
            <h4 style="margin-bottom: 1rem;">How can I help you?</h4>
            <div class="chat-questions"></div>
        `;
        const questionsDiv = chatContent.querySelector(".chat-questions");

        qaPairs.forEach((pair) => {
            const button = document.createElement("button");
            button.className = "chat-question-btn";
            button.textContent = pair.question;
            button.style.cssText = `
                display: block;
                width: 100%;
                padding: 0.8rem;
                margin-bottom: 0.5rem;
                background: rgba(212, 175, 55, 0.1);
                border: 1px solid var(--gold);
                color: var(--gold);
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: left;
            `;

            button.addEventListener("mouseover", () => {
                button.style.background = "rgba(212, 175, 55, 0.2)";
            });

            button.addEventListener("mouseout", () => {
                button.style.background = "rgba(212, 175, 55, 0.1)";
            });

            button.addEventListener("click", () => {
                showAnswer(pair);
            });

            questionsDiv.appendChild(button);
        });
    }

    // Show chat answer
    function showAnswer(pair) {
        chatContent.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <strong style="color: var(--gold);">Q: ${pair.question}</strong>
                <p style="margin-top: 0.5rem;">${pair.answer}</p>
            </div>
            <button class="back-btn" style="
                background: var(--gold);
                color: var(--black);
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            ">
                <i class="fas fa-arrow-left"></i> Back to questions
            </button>
        `;

        const backBtn = chatContent.querySelector(".back-btn");
        backBtn.addEventListener("click", loadQuestions);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        
        // Header effect
        if (currentScroll > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Back to top button
        if (currentScroll > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll to top
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Initialize
    chatWindow.style.display = "none";
});


