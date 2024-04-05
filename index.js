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

    const percentage = (mouseDelta / maxDelta) * -100;
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    track.dataset.percentage = nextPercentage;

    console.log(percentage);
    track.animate({
        transform: `translate(${nextPercentage}%, 0%)`
    }, { duration: 1200, fill: "forwards" });

    nextPercentage = Math.min(nextPercentage, 0);
    nextPercentage = Math.max(nextPercentage, -100);

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
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 2000, fill: "forwards" })

}

/*------Glitch------*/
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
