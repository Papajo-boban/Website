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
        left: `${clientX - 150}px`,
        top: `${clientY - 150}px`
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

/*enlarding image after click */
document.addEventListener('DOMContentLoaded', function () {
    const clickableImages = document.querySelectorAll('.clickable');

    clickableImages.forEach(clickable => {
        clickable.addEventListener('click', function () {
            if (window.innerWidth > 430) {// Get the high-resolution image src from the child img element
                const highResSrc = this.querySelector('img').src;

                // Set the modal image src and display the modal
                document.getElementById('enlargedImage').src = highResSrc;
                document.getElementById('modal-backdrop').style.display = "block";
            }
            else {
                // Optionally, prevent any default action if the screen is too small
                e.preventDefault();
            }
        });
    });
});

// Function to close the modal
function closeModal() {
    document.getElementById('modal-backdrop').style.display = "none";
}

//function for scroll bar:
const progress = document.querySelector('.progress-line');
document.addEventListener('scroll', function (e) {
    let progressWidth = (document.body.scrollTop || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    progress.style.setProperty('width', progressWidth + '%');
})