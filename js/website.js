let button;
let feedButton = document.getElementById('feed');
let cat = document.getElementById('cat');
let pspsps = [];

var lastKeyPressed = 0;

var moves = 0;

onDOMContentLoaded = (event) => {
    button = document.getElementById("scroll");
    button.onclick = function() {scrollToTop()};
};

document.addEventListener("keydown", function() {
    lastKeyPressed = event.keyCode;
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

document.onscroll = function() {scroll()};
feedButton.onmouseover = function() {getNewPos()};
feedButton.onclick = function() {clickFeed()};

function scroll() {
    if (button != null) {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For not Safari
}

function getNewPos() {
    moves++;
    let multiply = Math.floor(Math.random() * 1000) + 1;
    if (moves >= 25) { // start pity at 25
        console.log('pity ' + moves);
        let divisor = (multiply / moves) / 10;
        console.log(divisor); // log to make sure it doesn't drop too fast
        multiply /= divisor;
        multiply = Math.max(multiply, 1);
    }
    feedButton.style.bottom = Math.floor(Math.random() * multiply) + 'px';
    feedButton.style.left = Math.floor(Math.random() * multiply) + 'px';
    feedButton.style.right = Math.floor(Math.random() * multiply) + 'px';
    feedButton.style.transition = '0.15s';
}

function clickFeed() {
    if (lastKeyPressed === 13) { // enter key
        alert('Oh no! My cat got bored waiting for you to press tab to get to the button and she never got the treats!');
        return;
    }
    cat.style.visibility = 'hidden';
    setTimeout(function() {
        alert('You got the treats! Unfortunately, my cat appears to be a little too lazy to get the treats right now and is hiding. Please find her.')
    }, 500);
}

function reset() {
    cat.style.visibility = 'visible';
    feedButton.style.bottom = 0;
    feedButton.style.left = 0;
    feedButton.style.right = 0;
    setTimeout(function() {
        alert('You found my cat! Now she can eat all the treats! Mind getting them for me?');
    }, 500);
}