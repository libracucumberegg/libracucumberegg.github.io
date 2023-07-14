var button;
let feedButton = document.getElementById('feed');
let cat = document.getElementById('cat');
let text = document.getElementById('text');
let treat = document.getElementById('treat');
let pspsps = [];

let lastKeyPressed = 0;
let lastTimePressed = 0;
let moves = 0;

let i = 0;

onDOMContentLoaded = (event) => {
    button = document.getElementById("scroll");
    button.onclick = function() {scrollToTop()};
};

document.addEventListener("keydown", function() {
    lastKeyPressed = event.keyCode;
    lastTimePressed = Date.now();
    if (cat.style.visibility === "hidden") { // verify that cat is gone
        if (event.key === 'p' || event.key === 's') {
            pspsps.push(event.key);
        }
        if (pspsps.length === 8) {
            if (pspsps.toString().replaceAll(",", "") === 'pspspsps') { // toString() keeps commas so we have to get rid of them
                reset();
            }
            pspsps = [];
        }
    }
});

document.onscroll = function() {
    if (button != null) {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    }
};

feedButton.onmouseover = function() {getNewPos()};
feedButton.onclick = function() {clickFeed()};

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For not Safari
}

function getNewPos() {
    moves++;
    let multiply = Math.floor(Math.random() * 1000) + 1;
    if (moves >= 40) { // start pity at 40
        multiply -= moves * 2;
        multiply = Math.max(multiply, 10);
    }
    feedButton.style.bottom = Math.floor(Math.random() * multiply) + 'px';
    feedButton.style.left = Math.floor(Math.random() * multiply) + 'px';
    feedButton.style.right = Math.floor(Math.random() * multiply) + 'px';
    feedButton.style.transition = '0.15s';
}

function clickFeed() {
    if (lastKeyPressed === 13 && Date.now() - lastTimePressed < 500) { // 13 = enter key
        alert('Oh no! My cat got bored waiting for you to press tab to get to the button and she never got the treats!');
        return;
    }
    cat.style.visibility = 'hidden';
    setTimeout(function() {
        alert('You got the treats! Unfortunately, my cat appears to be a little too lazy to get the treats right now and is hiding. Please find her.')
    }, 500);
    giveTreat();
}

function giveTreat() {
    treat.style.visibility = 'visible';
    treat.style.bottom = 0;
    treat.style.right = 0;
}

function reset() {
    cat.style.visibility = 'visible';
    feedButton.style.bottom = 0;
    feedButton.style.left = 0;
    feedButton.style.right = 0;
    moves = 0;
    setTimeout(function() {
        alert('You found my cat! Now she can eat all the treats! Mind getting them for me?');
    }, 500);
}