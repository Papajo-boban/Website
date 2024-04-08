/*------Gradual Reveal Effect of Images------*/
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});
const hidden_element = document.querySelectorAll('.hidden');

hidden_element.forEach((element) => observer.observe(element));


/*------Cursor Following Blob------*/
const blob = document.getElementById('blob');
document.body.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.animate({
        left: `${clientX - 150}px`,
        top: `${clientY - 150}px`
    }, { duration: 3000, fill: "forwards" })

}

/*-----Image Loading Effect-------*/
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

/*------Enlarging Image Effect------*/
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

function closeModal() {
    document.getElementById('modal-backdrop').style.display = "none";
}

/*------Scroll Line------*/
const progress = document.querySelector('.progress-line');
document.addEventListener('scroll', function (e) {
    let progressWidth = (document.body.scrollTop || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    progress.style.setProperty('width', progressWidth + '%');
})


/*------Theme Filtering------*/
document.addEventListener('DOMContentLoaded', function () {
    const themes = document.querySelectorAll('.theme');
    const images = document.querySelectorAll('.gallery-item');
    console.log("themes: " + themes);
    var clicked_div = null;
    // Corrected forEach usage for themes
    themes.forEach(function (div) { // Moved 'div' inside the function parenthesis
        div.addEventListener('click', function () {
            const theme = div.getAttribute('data-filter');
            if(clicked_div !== null){
                clicked_div.style.filter = "";
                clicked_div.style.outline = "";
                clicked_div.style.transition = "";
            }
            clicked_div = div;
            clicked_div.style.filter= "blur(0)";
            clicked_div.style.outline="rgb(204, 205, 180) solid 5px";
            clicked_div.style.transition = "0.2s";
            console.log("theme: " + theme);

            // Corrected forEach usage for images
            images.forEach(function (item) { // Moved 'item' inside the function parenthesis
                if (item.getAttribute('data-category') === theme) { // Use classList.contains() for class checking
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
