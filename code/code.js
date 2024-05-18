window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

/*------Cursor Following Blob------*/
const blob = document.getElementById('blob');

document.body.onpointermove = event => {
    const { clientX, clientY } = event;

    blob.animate({
        left: `${clientX - 75}px`,
        top: `${clientY - 75}px`
    }, { duration: 2500, fill: "forwards" })

}

/*------Opening Project Subpage------*/
// document.addEventListener('DOMContentLoaded', function () {
//     const nodes = document.querySelectorAll('.node');
//     nodes.forEach(function(node){
//         node.addEventListener('click', function(event) {
//             if(event.currentTarget === event.target){
//                 let nodeWindow = node.querySelector('.node-window');
//                 nodeWindow.style.opacity = "1";
//             }
    
    
//         })
//     })
    
    
//     // const cross = document.querySelectorAll('.cross');
//     // cross.addEventListener('click', function () {
//     //     event.target.closest('.node-window').style.opacity = "0";
//     //     event.stopPropagation();
//     // });

// })



document.addEventListener('DOMContentLoaded', function () {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(function(node){
        node.addEventListener('click', function(event) {
            // Ensure we are only reacting to clicks directly on the node, not its children
            if(event.currentTarget === event.target){
                // Corrected variable from subpage to nodeWindow
                console.log("sdfgf");
                let nodeWindow = node.querySelector('.node-window');
                nodeWindow.style.opacity = "1"; // Now using the correct variable
            }
        });
    });

    // Set up event listeners for all cross buttons
    const crosses = document.querySelectorAll('.cross');
    crosses.forEach(function(cross){
        cross.addEventListener('click', function (event) {
            // Close the node-window by setting opacity to 0
            event.target.closest('.node-window').style.opacity = "0";
            // Stop the event from propagating up to the node, which would reopen it
            event.stopPropagation();
        });
    });
});



