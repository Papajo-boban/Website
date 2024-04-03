window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

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
    const {clientX, clientY} = event;

    blob.animate({
        left : `${clientX}px`,
        top : `${clientY}px`
    }, {duration: 3000, fill: "forwards"})
    
}
/*blur end*/


