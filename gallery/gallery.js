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
        left: `${clientX - 75}px`,
        top: `${clientY - 75}px`
    }, { duration: 2500, fill: "forwards" })

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
    var lastCross = null;
    let lastClickedDiv = null;

    console.log("themes: " + themes);

    themes.forEach(function (div) {
        div.addEventListener('click', function () {
            const theme = div.getAttribute('data-filter');
            const cross = div.querySelector('.cross');

            /*------Cross button------*/
            cross.addEventListener('click', function(event) {
                event.stopPropagation(); // stop reacting to div being clicked below it
                console.log("cross clicked");
                images.forEach(function(item) {
                    item.style.display = '';
                }); 
                setDefault(div,cross);

            });  

            if(lastClickedDiv === div){ // double click
                images.forEach(function(item) {
                    item.style.display = '';
                }); 
                setDefault(lastClickedDiv,lastCross);
                lastClickedDiv = null;
            }

            else
            {
                applyStyle(div, cross);
                showImages(theme, images);
                if (lastClickedDiv) {
                    setDefault(lastClickedDiv, lastCross); // Reset the previous clicked div
                }
                lastClickedDiv = div;
                lastCross = cross;
            }



        });
        
    });
});

/*------Set Default Settings------*/
function setDefault(clicked_div, cross){
    clicked_div.style.filter = "";
    clicked_div.style.outline = "";
    clicked_div.style.transition = "";
    cross.style.display = "";
}
function applyStyle(clicked_div, cross){
    clicked_div.style.filter = "blur(0)";
    clicked_div.style.outline = "rgb(204, 205, 180) solid 5px";
    clicked_div.style.transition = "0.2s";
    cross.style.display = "flex";

}
function showImages(theme, images){
    images.forEach(function (item) { 
        if (item.getAttribute('data-category') === theme || theme === "all") { // Use classList.contains() for class checking
            item.style.display = '';
        } else {
            item.style.display = 'none';
        } 
    });
}



// /*------Calculating Theme Padding------*/
// document.addEventListener('DOMContentLoaded', function () {
//     themes = document.querySelectorAll('.theme');
//     themes.forEach(function (theme) {
//         textWidth = theme.offsetWidth;
//         totalWidth = 15.8; // in rem
//         totalWidthInPixels = totalWidth * parseFloat(getComputedStyle(document.documentElement).fontSize);
//         console.log("text width: " +textWidth);
//         console.log("total width in pixels: " +totalWidthInPixels);
//         if (textWidth < totalWidthInPixels) {
//             paddingSize = (totalWidthInPixels - textWidth)/2;
//             theme.style.padding =`3rem ${paddingSize}px`;
//             console.log("padding "+ paddingSize);
            
//         }
//     })
// })