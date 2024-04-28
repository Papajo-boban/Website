window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});


/*------Code, Cuisine, Capture------*/

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = nextPercentage;
}

const handleOnMouseMove = e => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
}

for (const card of document.querySelectorAll(".card")) {
    card.onmousemove = e => handleOnMouseMove(e);
}



/*------Scroll Panel------*/
const track = document.getElementById("image-track");


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e => {

    if (track.dataset.mouseDownAt === "0") {

        return;
    }
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;

    maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * - 100;
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, 0%)`
    }, { duration: 1200, fill: "forwards" });

    nextPercentage = Math.min(nextPercentage, 0);
    nextPercentage = Math.max(nextPercentage, - 100);

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, { duration: 1200, fill: "forwards" });
    }

}




/*------Cursor Following Blob------*/
const blob = document.getElementById('blob');

document.body.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.animate({
        left: `${clientX - 150}px`,
        top: `${clientY - 150}px`
    }, { duration: 2000, fill: "forwards" })

}

/*------Glitch------*/
/*
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.querySelector(".glitch").onmouseover = event => {
    let iterations = 0;
    const interval = setInterval(() => {
        event.target.innerText = event.target.innerText.split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return event.target.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * 26)]
            }).join("");

        if (iterations >= event.target.dataset.value.length) {
            clearInterval(interval);
        }
        iterations += 1 / 3;
    }, 40);
}
*/


/*------Hamburger Menu------*/
const burgerMenu = document.querySelector('.hamburger');
const settings = document.querySelector('.settings');
burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('is-active');
    settings.classList.toggle('is-active');
})

/*------Darkening Background Image------*/
window.addEventListener('scroll', () => {
    // Calculate the total height of the document minus the viewport height
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    // Get current scroll position
    const scrollPosition = window.pageYOffset;
    // Calculate the scroll percentage
    const scrollPercentage = scrollPosition / totalHeight;
    // Set opacity based on how far the user has scrolled
    const opacity = 0.1 + scrollPercentage * 0.60;
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})), url('Photos-002/homepage4.jpg')`;
});

/*------Custom Cursor------*/
var cursor = $(".cursor");
    follower = $(".cursor-follower");

var posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0;

TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        TweenMax.set(follower, {
            css: {
                left: posX - 20,
                top: posY - 20
            }
        });

        TweenMax.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        });
    }
});

$(document).on("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

$(".image-track").on("mouseenter", function () {
    cursor.addClass("active");
});

$(".image-track").on("mouseleave", function () {
    cursor.removeClass("active");
});
