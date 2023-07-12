let button = document.getElementById("scroll");
let feedButton = document.getElementById('feed');
let cat = document.getElementById('cat');
let pspsps = [];

var lastKeyPressed = 0;

document.addEventListener("keydown", function() {
    lastKeyPressed = event.keyCode;
    console.log(lastKeyPressed);
    if (cat.style.visibility === "hidden") { // verify that cat is gone
        if (event.key === 'p' || event.key === 's') {
            pspsps.push(event.key);
        }
        if (pspsps.length === 8) {
            if (pspsps.toString() === 'p,s,p,s,p,s,p,s') { // yes I was that lazy
                reset();
            }
            pspsps = [];
        }
    }
});

document.onscroll = function() {scrollFunction()};
feedButton.onmouseover = function() {getNewPos()};
feedButton.onclick = function() {clickFeed()};

function scrollFunction() {
    if (button != null)  {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function getNewPos() {
    let multiply = Math.floor(Math.random() * 1000) + 1;
    feedButton.style.bottom = Math.floor(Math.random() * multiply) + 'px';
    feedButton.style.right = Math.floor(Math.random() * multiply) + 'px';
    feedButton.style.transition = '0.2s';
}

function clickFeed() {
    if (lastKeyPressed === 13) { // enter key
        alert('Oh no! My cat got bored waiting for you to press tab to get to the button and she never got the treats!');
        return;
    }
    cat.style.visibility = 'hidden';
    alert('You got the treats! Unfortunately, my cat appears to be a little too lazy to get the treats right now and is hiding. Please find her.');
}

function reset() {
    cat.style.visibility = 'visible';
    feedButton.style.bottom = 0;
    feedButton.style.left = 0;
    feedButton.style.right = 0;
    alert('You found my cat! Now she can eat all the treats! Mind getting them for me?');
}