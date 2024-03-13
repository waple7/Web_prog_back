window.addEventListener("load", function () {
    console.log("Script is running!");
    const durationElement = document.getElementsByClassName('timer').item(0);

    if (durationElement) {
        const loadTime = performance.now();
        const serverTime = performance.getEntriesByType('navigation')[0].serverTiming.find(timing => timing.name === 'server');
        durationElement.textContent = loadTime + "ms + " + serverTime.duration + "(ser) ms";
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


