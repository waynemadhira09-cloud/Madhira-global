(function() {
    // 1. CREATE AND INJECT THE DARK SIDEBAR STYLES
    const style = document.createElement('style');
    style.innerHTML = `
        .casino-sidebar {
            width: 260px;
            background-color: #121c24;
            padding: 15px 10px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            box-sizing: border-box;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            overflow-y: auto;
            z-index: 9999;
            font-family: sans-serif;
        }
        .casino-sidebar .gold-card {
            background: linear-gradient(135deg, #ffe694 0%, #f3c250 100%);
            color: #312100;
            text-decoration: none;
            font-weight: bold;
            padding: 14px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            border: 1px solid #ffe694;
        }
        .casino-sidebar .menu-section {
            border: 1px solid #283743;
            border-radius: 12px;
            overflow: hidden;
        }
        .casino-sidebar .section-header {
            background-color: #0d151c;
            padding: 12px 15px;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 1px;
            display: flex;
            justify-content: space-between;
            color: #f6c833;
        }
        .casino-sidebar .section-content {
            background-color: #0d151c;
            padding: 4px 8px 10px 8px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .casino-sidebar .menu-item {
            background-color: #313c46;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 15px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            transition: background 0.2s ease;
        }
        .casino-sidebar .menu-item:hover {
            background-color: #3d4b58;
        }
        .casino-sidebar .aviator-highlight {
            background: linear-gradient(90deg, #d61c3c 0%, #e63956 100%);
            font-style: italic;
            font-weight: bold;
        }
        /* Shifts your original site layout to the right so it doesn't get covered up */
        body {
            padding-left: 260px !important;
        }
    `;
    document.head.appendChild(style);

    // 2. BUILD THE SIDEBAR AND AUTO-INSERT IT
    document.addEventListener("DOMContentLoaded", () => {
        const sidebar = document.createElement('aside');
        sidebar.className = 'casino-sidebar';
        sidebar.innerHTML = `
            <a href="#" class="gold-card vip-btn">👑 VIP</a>
            <a href="#" class="gold-card jackpot-btn">🎰 Ke7 Jackpot</a>

            <div class="menu-section">
                <div class="section-header">SPORTS <span>▲</span></div>
                <div class="section-content">
                    <a href="#" class="menu-item">⚽ Soccer</a>
                </div>
            </div>

            <div class="menu-section">
                <div class="section-header">GAMES <span>▲</span></div>
                <div class="section-content">
                    <a href="aviator.html" class="menu-item aviator-highlight">✈️ Aviator</a>
                    <a href="#" class="menu-item">🎮 All Games</a>
                    <a href="#" class="menu-item">🎮 Popular</a>
                    <a href="#" class="menu-item">🎮 Virtual Sports</a>
                    <a href="#" class="menu-item">🎮 Crash Game</a>
                    <a href="#" class="menu-item">🎮 Turbo Games</a>
                    <a href="plinko.html" class="menu-item">🎮 Plinko</a>
                    <a href="#" class="menu-item">🎮 Fish</a>
                    <a href="#" class="menu-item">🎮 Bingo</a>
                </div>
            </div>
        `;
        document.body.insertBefore(sidebar, document.body.firstChild);
    });
})();
