const feedButton = document.getElementById('feed');
const cat = document.getElementById('cat');
let pspsps = [];

let scrolling = false;

let lastKeyPressed = 0;
let lastTimePressed = 0;
let moves = 0;

document.addEventListener("keydown", event => {
    lastKeyPressed = event.code;
    lastTimePressed = Date.now();
    if (cat.style.visibility === "hidden") { // verify that cat is gone
        pspsps.push(event.key);
        if (pspsps.length >= 8) {
            if (pspsps.slice(-8).toString().replaceAll(",", "") === 'pspspsps') { // toString() keeps commas so we have to get rid of them
                reset();
                pspsps = [];
            }
        }
    }
});

window.addEventListener('scroll', () => {
    const button = document.getElementById("scroll")
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        button.style.display = "block";
        button.classList.add('translucent');
        button.classList.remove('opaque');
    } else {
        let generated = generateColour();
        button.style.backgroundColor = generated;
        button.style.color = getContrastColour(generated);
        button.style.display = "none";
    }
    scrolling = true;
});

const links = document.querySelectorAll("nav.tabs ul li a");

links.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        links.forEach(function(tabLink) {
            tabLink.parentElement.classList.remove("active");
        });

        this.parentElement.classList.add("active");

        // Manually add smooth scrolling
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

setInterval(function() {
    const button = document.getElementById("scroll")
    if (scrolling) {
        scrolling = false;
        button.classList.add('opaque');
        button.classList.remove('translucent');
    }
}, 50);

feedButton.onmouseover = getNewPos;
feedButton.onclick = clickFeed;

function generateColour() {
    let color = "#";
    for (let i = 0; i < 3; i++) { // gets rgb values in order when looping
        const part = Math.floor((Math.random() * 195) + 30).toString(16); // number will never go lower than 30 or higher than 225 to prevent too bright or dark colours
        color += part.length === 1 ? "0" + part : part;  // Ensures two digits
    }
    return color;
}

function getContrastColour(hexColour) {
    let r = parseInt(hexColour.substring(1, 3), 16);
    let g = parseInt(hexColour.substring(3, 5), 16);
    let b = parseInt(hexColour.substring(5, 7), 16);

    // Calculate the perceptive luminance - a measure of the luminous intensity perceived by the human eye.
    let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    if (lum > 0.5) {
        return "#000000"; // Bright colors - dark font
    } else {
        return "#FFFFFF"; // Dark colors - bright font
    }
}

function getNewPos() {
    moves++;
    let multiply = Math.floor(Math.random() * 1000) + 1; // add 1 to prevent multiplying by 0 which isn't good
    if (moves >= 40) { // start pity at 40
        multiply -= moves * 3;
        multiply = Math.max(multiply, 10);
    }
    feedButton.style.bottom = `${Math.floor(Math.random() * multiply)}px`;
    feedButton.style.left = `${Math.floor(Math.random() * multiply)}px`;
    feedButton.style.right = `${Math.floor(Math.random() * multiply)}px`;
    feedButton.style.transition = '0.15s'; // smooth the transition to let the user see where the button runs off to
}

function clickFeed() {
    if (lastKeyPressed === 13 && Date.now() - lastTimePressed < 500) { // 13 = enter key
        alert('Oh no! My cat got bored waiting for you to press tab to get to the button and she never got the treats!');
        return;
    }
    cat.style.visibility = 'hidden';
    setTimeout(() => {
        alert('You got the treats! Unfortunately, my cat appears to be a little too lazy to get the treats right now and is hiding. Please find her.')
    }, 500);
}

function reset() {
    cat.style.visibility = 'visible';
    feedButton.style.bottom = '0';
    feedButton.style.left = '0';
    feedButton.style.right = '0';
    moves = 0;
    setTimeout(() => {
        alert('You found my cat! Now she can eat all the treats! Mind getting them for me?');
    }, 500);
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For not Safari
}