// Wait for the webpage to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Find the placeholder element on the page
    const navPlaceholder = document.getElementById("global-nav");

    if (navPlaceholder) {
        // Insert the HTML structure for your navigation
        navPlaceholder.innerHTML = `
            <nav style="background-color: #1a1a1a; padding: 15px; display: flex; gap: 20px; font-family: sans-serif;">
                <a href="index.html" style="color: white; text-decoration: none; font-weight: bold;">🎮 Game Lobby</a>
                <a href="aviator.html" style="color: #ff4757; text-decoration: none; font-weight: bold;">✈️ Aviator</a>
                <a href="plinko.html" style="color: #ffa502; text-decoration: none; font-weight: bold;">🔵 Plinko</a>
            </nav>
        `;
    }
});
