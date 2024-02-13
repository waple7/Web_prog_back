window.addEventListener("load", function () {
    console.log("Script is running!");
    const durationElement = document.getElementsByClassName('timer').item(0);

    if (durationElement) {
        const loadTime = performance.now();
        durationElement.textContent = loadTime.toFixed(1) + " мс";
    }
});

window.onload = function () {
    const navItems = document.querySelectorAll('nav ul li');

    for (const item of navItems) {
        const link = item.querySelector('a');
        const href = link.getAttribute('href');

        if (document.location.href.includes(href)) {
            item.classList.add('active');
            break;
        }
    }
};


