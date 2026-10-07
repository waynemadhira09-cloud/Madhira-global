document.addEventListener("DOMContentLoaded", () => {
    // Get the current file name from the URL
    const currentFile = window.location.pathname.split("/").pop() || "index.html";

    // 1. LIST YOUR SIGN-IN / SIGN-UP FILENAMES HERE TO EXCLUDE THEM
    const excludedPages = ["signin.html", "signup.html", "login.html", "register.html"];

    // If the current page is one of the excluded files, stop the script entirely
    if (excludedPages.includes(currentFile)) {
        return; 
    }

    // 2. Create the navigation container element (Only runs if NOT on an excluded page)
    const bottomNav = document.createElement("nav");
    bottomNav.className = "bottom-nav";

    // Navigation configuration to exactly match your app layout reference
    const navItems = [
        { name: "Menu", url: "menu.html", icon: "☰" },
        { name: "Lobby", url: "index.html", icon: "🏠" },
        { name: "Deposit", url: "deposit.html", icon: "⬇️", badge: "3%" },
        { name: "Promo", url: "promo.html", icon: "⭐" },
        { name: "Account", url: "account.html", icon: "👤" }
    ];

    // Loop through structural items to build the visual nodes dynamically
    navItems.forEach(item => {
        const link = document.createElement("a");
        link.href = item.url;
        link.className = "nav-item";

        // Auto-assign active selection styling to match target context file
        if (currentFile === item.url) {
            link.classList.add("active");
        }

        // Generate the Red Notification Overlay Badge component if true
        if (item.badge) {
            const badgeDiv = document.createElement("div");
            badgeDiv.className = "badge";
            badgeDiv.textContent = item.badge;
            link.appendChild(badgeDiv);
        }

        // Icon display layer
        const iconSpan = document.createElement("span");
        iconSpan.className = "nav-icon";
        iconSpan.textContent = item.icon;
        link.appendChild(iconSpan);

        // Core text layout layer
        const labelSpan = document.createElement("span");
        labelSpan.className = "nav-label";
        labelSpan.textContent = item.name;
        link.appendChild(labelSpan);

        bottomNav.appendChild(link);
    });

    // Final DOM attachment interface execution
    document.body.appendChild(bottomNav);

    // Apply baseline buffer margin to body automatically to secure site scrolling readability
    document.body.style.paddingBottom = "60px";
});

