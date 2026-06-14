document.addEventListener('DOMContentLoaded', function () {
    /* -------------------------------------------------------------------------- */
    /*                                JS Ticker                                   */
    /* -------------------------------------------------------------------------- */
    // Robust javascript ticker that works better on mobile than pure CSS keyframes
    const tickerContainer = document.getElementById('js-ticker');
    const tickerContent = document.getElementById('ticker-content');

    if (tickerContainer && tickerContent) {
        // Mock Data (Real replacement would fetch latest WP Post with 'podcast' tag)
        const podcast = {
            title: "Resumo do Dia - Agronegócio",
            date: "Hoje, 12:00",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder Audio
        };

        // Populate Player UI
        const trackTitle = document.querySelector('.track-title');
        const trackDate = document.querySelector('.track-date');
        const audioPlayer = document.querySelector('#podcast-player');

        if (trackTitle) trackTitle.textContent = podcast.title;
        if (trackDate) trackDate.textContent = podcast.date;
        if (audioPlayer) audioPlayer.src = podcast.src;
        // Mock Data (In reality this would come from an API or WP Localize Script)
        const quotes = [
            { name: "🌱 Soja", value: "R$ 135,50", change: "+0.5%" },
            { name: "🌽 Milho", value: "R$ 58,20", change: "-0.2%" },
            { name: "☕ Café", value: "R$ 1.150,00", change: "+1.2%" },
            { name: "🐮 Boi Gordo", value: "R$ 245,00", change: "0.0%" },
            { name: "💵 Dólar", value: "R$ 4,95", change: "-0.8%" },
            { name: "🌾 Trigo", value: "R$ 1.200,00", change: "+0.3%" }
        ];

        // Build HTML
        let html = '';
        // Duplicate list multiple times to ensure continuous fill
        for (let i = 0; i < 4; i++) {
            quotes.forEach(quote => {
                const color = quote.change.includes('+') ? '#006233' : (quote.change.includes('-') ? '#C85200' : '#666');
                html += `<div class="ticker-item">
                            <strong>${quote.name}:</strong> ${quote.value} <span style="font-size:0.8em; color:${color}">(${quote.change})</span>
                         </div>`;
            });
        }

        tickerContent.innerHTML = html;

        // JS Animation Logic
        let position = 0;
        const speed = 0.5; // pixels per interval

        function animateTicker() {
            position -= speed;
            // If first item width is passed, move it to end? 
            // Better/obsfucated approach: translate and reset

            // Simple approach for now:
            tickerContent.style.transform = `translateX(${position}px)`;

            // Reset when far enough left (approximation)
            if (Math.abs(position) > tickerContent.scrollWidth / 2) {
                position = 0;
            }

            requestAnimationFrame(animateTicker);
        }

        // Start animation
        animateTicker();
    }
});
