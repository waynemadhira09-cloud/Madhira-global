(function() {
    // 1. SIGN-IN SCREEN DETECTION
    // If a password field or "Sign In" elements exist, stop executing immediately.
    if (document.querySelector('input[type="password"]') || document.body.innerText.includes("Sign In")) {
        console.log("Sign-in page detected. Injection paused.");
        return; 
    }

    // 2. INJECT ALL SIDEBAR & FIXED BOTTOM NAVIGATION CSS STYLES
    const style = document.createElement('style');
    style.innerHTML = `
        /* THE HIDDEN SIDEBAR PANELS */
        .casino-sidebar {
            width: 280px;
            background-color: #121c24;
            padding: 15px 10px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            box-sizing: border-box;
            height: calc(100vh - 60px); /* Leaves space for bottom navigation bar */
            position: fixed;
            top: 0;
            left: -280px; /* Anchored completely off-screen by default */
            overflow-y: auto;
            z-index: 99999;
            font-family: sans-serif;
            transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-right: 1px solid #23323e;
            box-shadow: 5px 0 15px rgba(0,0,0,0.5);
        }

        /* Toggled by JavaScript to slide out onto the page */
        .casino-sidebar.menu-open {
            left: 0 !important;
        }

        /* PILL SHAPES & DESIGN BLOCKS INSIDE SIDEBAR */
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
        .casino-sidebar .menu-item:hover { background-color: #3d4b58; }
        .casino-sidebar .aviator-highlight {
            background: linear-gradient(90deg, #d61c3c 0%, #e63956 100%);
            font-style: italic;
            font-weight: bold;
        }

        /* DARK SEMI-TRANSPARENT BACKGROUND OVERLAY */
        .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.6);
            z-index: 99998;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .sidebar-overlay.active {
            display: block;
            opacity: 1;
        }

        /* FIXED MOBILE BOTTOM NAVIGATION BAR STYLE */
        .casino-bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
            background-color: #1a242d;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid #23323e;
            z-index: 100000;
            box-sizing: border-box;
        }
        .bottom-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #8fa0b0;
            text-decoration: none;
            font-size: 11px;
            font-family: sans-serif;
            cursor: pointer;
            background: none;
            border: none;
            padding: 0;
            position: relative;
            width: 20%;
        }
        .bottom-nav-item .nav-icon { 
            font-size: 20px; 
            margin-bottom: 2px; 
        }
        .bottom-nav-item.active-nav { 
            color: #f6c833; /* Yellow color for active element */
        }

        /* 3% RED NOTIFICATION BADGE ABOVE DEPOSIT LINK */
        .badge-wrapper { position: relative; }
        .nav-badge {
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #e63956;
            color: white;
            font-size: 9px;
            font-weight: bold;
            padding: 1px 5px;
            border-radius: 10px;
            border: 2px solid #1a242d;
            z-index: 10;
        }

        /* Pushes original webpage layout up so bottom nav doesn't cover elements */
        body {
            padding-bottom: 65px !important;
        }
    `;
    document.head.appendChild(style);

    // 3. GENERATE AND INJECT HTML ELEMENTS
    document.addEventListener("DOMContentLoaded", () => {
        // Create background click-away dim screen surface overlay
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.id = 'sidebarOverlay';
        document.body.appendChild(overlay);

        // Create Sidebar structure
        const sidebar = document.createElement('aside');
        sidebar.className = 'casino-sidebar';
        sidebar.id = 'casinoSidebar';
        sidebar.innerHTML = `
            <a href="#" class="gold-card vip-btn">👑 VIP</a>
            <a href="#" class="gold-card jackpot-btn">🎰 Madhira Jackpot</a>
            <div class="menu-section">
                <div class="section-header">SPORTS <span>▲</span></div>
                <div class="section-content"><a href="#" class="menu-item">⚽ Soccer</a></div>
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

        // Create Bottom Navigation structure
        const bottomNav = document.createElement('nav');
        bottomNav.className = 'casino-bottom-nav';
        bottomNav.innerHTML = `
            <button id="menuToggleBtn" class="bottom-nav-item">
                <span class="nav-icon">☰</span>
                <span>Menu</span>
            </button>
            <a href="index.html" class="bottom-nav-item">
                <span class="nav-icon">🏠</span>
                <span>Lobby</span>
            </a>
            <a href="#" class="bottom-nav-item badge-wrapper">
                <span class="nav-badge">3%</span>
                <span class="nav-icon">💰</span>
                <span>Deposit</span>
            </a>
            <a href="#" class="bottom-nav-item">
                <span class="nav-icon">⭐</span>
                <span>Promo</span>
            </a>
            <a href="#" class="bottom-nav-item active-nav">
                <span class="nav-icon">👤</span>
                <span>Account</span>
            </a>
        `;
        document.body.appendChild(bottomNav);

        // 4. THE INTERACTION TOGGLE CLICKS
        const menuToggleBtn = document.getElementById('menuToggleBtn');
        const casinoSidebar = document.getElementById('casinoSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        function toggleSidebar(e) {
            e.stopPropagation();
            casinoSidebar.classList.toggle('menu-open');
            sidebarOverlay.classList.toggle('active');
            
            // Toggle highlight color state on menu button icon
            if(casinoSidebar.classList.contains('menu-open')) {
                menuToggleBtn.classList.add('active-nav');
            } else {
                menuToggleBtn.classList.remove('active-nav');
            }
        }

        function closeSidebar() {
            casinoSidebar.classList.remove('menu-open');
            sidebarOverlay.classList.remove('active');
            menuToggleBtn.classList.remove('active-nav');
        }

        // Action Events
        menuToggleBtn.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Closes if clicking outside layout boundaries
        document.addEventListener('click', (e) => {
            if (!casinoSidebar.contains(e.target) && e.target !== menuToggleBtn && !menuToggleBtn.contains(e.target)) {
                closeSidebar();
            }
        });
    });
})();
