function openImage(src){

    const modal = document.getElementById("image-modal");
    const image = document.getElementById("modal-image");

    image.src = src;

    // reset zoom
    image.classList.remove("zoom");

    modal.style.display="flex";

}



function closeImage(){

    const modal = document.getElementById("image-modal");
    const image = document.getElementById("modal-image");

    image.classList.remove("zoom");

    modal.style.display="none";

}



document.addEventListener(
"DOMContentLoaded",
()=>{


    document
    .getElementById("close-modal")
    .addEventListener(
        "click",
        closeImage
    );



    document
    .getElementById("image-modal")
    .addEventListener(
        "click",
        (e)=>{

            if(e.target.id==="image-modal"){

                closeImage();

            }

        }
    );


    // zoom image
    document
    .getElementById("modal-image")
    .addEventListener(
        "click",
        (e)=>{

            e.stopPropagation();

            e.target.classList.toggle("zoom");

        }
    );


});