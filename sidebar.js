document.addEventListener("DOMContentLoaded", () => {
    // Get the current file name from the URL path
    const currentFile = window.location.pathname.split("/").pop() || "index.html";

    // 1. BLOCKED PAGES: The navbar will NOT appear on your index.html sign-in page
    const excludedPages = ["index.html"];

    if (excludedPages.includes(currentFile)) {
        return; // Stops execution immediately if on index.html
    }

    // 2. Create the navigation container element
    const bottomNav = document.createElement("nav");
    bottomNav.className = "bottom-nav";

    // 3. Navigation setup mapped exactly to your project files
    const navItems = [
        { name: "Menu", url: "navigation.html", icon: "☰" },
        { name: "Lobby", url: "games.html", icon: "🏠" }, 
        { name: "Deposit", url: "games.html", icon: "⬇️", badge: "3%" }, // Change destination if you create a deposit page later
        { name: "Promo", url: "games.html", icon: "⭐" },
        { name: "Account", url: "games.html", icon: "👤" }
    ];

    // Loop through links to build out the button nodes dynamically
    navItems.forEach(item => {
        const link = document.createElement("a");
        link.href = item.url;
        link.className = "nav-item";

        // Highlight the current active tab
        if (currentFile === item.url) {
            link.classList.add("active");
        }

        // Generate the 3% badge overlay on the deposit link
        if (item.badge) {
            const badgeDiv = document.createElement("div");
            badgeDiv.className = "badge";
            badgeDiv.textContent = item.badge;
            link.appendChild(badgeDiv);
        }

        // Icon element layer
        const iconSpan = document.createElement("span");
        iconSpan.className = "nav-icon";
        iconSpan.textContent = item.icon;
        link.appendChild(iconSpan);

        // Text label layer
        const labelSpan = document.createElement("span");
        labelSpan.className = "nav-label";
        labelSpan.textContent = item.name;
        link.appendChild(labelSpan);

        bottomNav.appendChild(link);
    });

    // 4. Injects the navbar inside the body element right before the </body> tag
    document.body.insertAdjacentElement('beforeend', bottomNav);

    // Add safe margin spacing to your body layouts so content doesn't get covered up
    document.body.style.paddingBottom = "60px";
});
