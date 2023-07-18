const feedButton = document.getElementById('feed');
const cat = document.getElementById('cat');
let pspsps = [];

let lastKeyPressed = 0;
let lastTimePressed = 0;
let moves = 0;

document.addEventListener("keydown", event => {
    lastKeyPressed = event.keyCode;
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

window.addEventListener('scroll', event => {
    const button = document.getElementById("scroll")
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
});

feedButton.onmouseover = getNewPos;
feedButton.onclick = clickFeed;

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For not Safari
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
    feedButton.style.transition = '0.15s';
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