const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});
const hidden_element = document.querySelectorAll('.hidden');

hidden_element.forEach((element) => observer.observe(element));


/*cursor-following blur*/
const blob = document.getElementById('blob');
document.body.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" })

}
/*blur end*/

const blurDivs = document.querySelectorAll('.blur-load')
blurDivs.forEach(div => {
    const img = div.querySelector("img")
    function loaded() {
        div.classList.add('loaded')
    }
    if (img.complete) {
        loaded()
    }
    else {
        img.addEventListener("load", loaded)
    }
}
)
