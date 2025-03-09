document.addEventListener("DOMContentLoaded", () => {
    const features = document.querySelectorAll(".feature-box");
    features.forEach(box => {
        box.addEventListener("mouseenter", () => {
            box.classList.add("scale-105", "transition", "duration-300", "ease-in-out");
        });
        box.addEventListener("mouseleave", () => {
            box.classList.remove("scale-105");
        });
    });

    const galleryImages = document.querySelectorAll(".gallery-img");
    galleryImages.forEach(img => {
        img.addEventListener("mouseenter", () => {
            img.classList.add("scale-110", "transition", "duration-300", "ease-in-out", "rotate-2");
        });
        img.addEventListener("mouseleave", () => {
            img.classList.remove("scale-110", "rotate-2");
        });
    });

    // Mini Robo Speech and Chat Interaction
    const miniRobo = document.getElementById("mini-robo");
    const chatContainer = document.getElementById("chat-container");
    const userQueryInput = document.getElementById("user-query");
    const askButton = document.getElementById("ask-btn");
    const voiceButton = document.getElementById("voice-btn");
    const roboResponse = document.getElementById("robo-response");
    let idleTimer;

    function startIdleTimer() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            startMiniRoboWalk();
        }, 15000); // Introduce itself after 15 seconds of inactivity
    }

    function introduceMiniRobo() {
        const speech = new SpeechSynthesisUtterance("Hello! I'm Mini Robo. I can walk around, answer your queries, and assist with your searches. Just type or speak your question!");
        speech.lang = "en-US";
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
    }

    // function startMiniRoboWalk() {
    //     introduceMiniRobo();
        
    //     miniRobo.style.position = "absolute";
    //     miniRobo.style.top = "10px";
    //     miniRobo.style.left = "10px";
    //     miniRobo.style.border = "3px solid blue";
    //     miniRobo.style.borderRadius = "5%";
    //     miniRobo.style.padding = "5px";
    //     miniRobo.style.boxShadow = "0 0 10px blue";
    //  miniRobo.style.animation = "rectangular-walk 10s linear infinite";
    // }

    if (miniRobo) {
        miniRobo.style.position = "absolute";
        miniRobo.style.bottom = "10px";
        miniRobo.style.left = "10px";
        miniRobo.addEventListener("click", () => {
            const speech = new SpeechSynthesisUtterance("Hello, I'm Mini Robo! Ask me anything.");
            speech.lang = "en-US";
            speech.rate = 1;
            window.speechSynthesis.speak(speech);
            chatContainer.classList.toggle("hidden");
            startIdleTimer();
        });
    }

    if (askButton) {
        askButton.addEventListener("click", () => {
            const query = userQueryInput.value.trim();
            if (query) {
                fetchGoogleAnswer(query);
            }
            startIdleTimer();
        });
    }

    if (voiceButton) {
        voiceButton.addEventListener("click", () => {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = "en-US";
            recognition.start();
            
            recognition.onresult = (event) => {
                const spokenText = event.results[0][0].transcript;
                userQueryInput.value = spokenText;
                roboResponse.textContent = `You asked: ${spokenText}`;
                fetchGoogleAnswer(spokenText);
            };
            startIdleTimer();
        });
    }

    function fetchGoogleAnswer(query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }

    startIdleTimer(); // Start the timer when the page loads
});
