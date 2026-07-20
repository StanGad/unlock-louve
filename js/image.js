function openImage(src){

    const modal =
    document.getElementById("image-modal");


    const image =
    document.getElementById("modal-image");


    image.src = src;

    modal.style.display="flex";

}



function closeImage(){

    document
    .getElementById("image-modal")
    .style.display="none";

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


});


});