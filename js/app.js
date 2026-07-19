document.addEventListener("DOMContentLoaded", async () => {

    document
        .getElementById("startMission")
        .addEventListener(
            "click",
            startMission
        );

    document
        .getElementById("validate")
        .addEventListener(
            "click",
            openCard
        );

    // Appui sur Entrée
    document
        .getElementById("number")
        .addEventListener("keydown", (event) => {

            if (event.key === "Enter") {
                openCard();
            }

        });

});



async function startMission(){


    document
    .getElementById("home")
    .classList.add("hidden");


    document
    .getElementById("game")
    .classList.remove("hidden");


    startTimer();


    await loadCards();


}

let history = [];
let currentCard = null;

function openCard() {

    const input = document.getElementById("number");
    const number = input.value.trim();

    const card = findCard(number);
    currentCard = number;

    const content = document.getElementById("content");

    if (!card) {

        content.innerHTML = `
            <h2>❌ Carte inconnue</h2>
        `;

        input.select(); // sélectionne le texte pour retaper directement
        return;
    }
    if (!history.includes(number)) {

        history.push(number);
    
    }
    
    
    // garder seulement les 5 dernières
    if(history.length > 5){
    
        history.shift();
    
    }

    updateHistory();

    content.innerHTML = `
        <h2>${card.title}</h2>

        <img
            src="${card.image}"
            class="card-image"
            onclick="openImage('${card.image}')">

        <p>${card.text}</p>
    `;

    input.value = "";
    input.focus();

}

function updateHistory() {


    const historyDiv =
    document.getElementById("history-list");


    historyDiv.innerHTML="";


    history.forEach(number=>{


        historyDiv.innerHTML += `

        <button 
        class="history-button"
        onclick="openHistoryCard('${number}')">

        ${number}

        </button>

        `;


    });


}


function openHistoryCard(number) {

    document.getElementById("number").value = number;

    openCard();

}

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



document
.getElementById("close-modal")
.addEventListener(
"click",
closeImage
);



// clic sur le fond pour fermer

document
.getElementById("image-modal")
.addEventListener(
"click",
(e)=>{

    if(e.target.id === "image-modal"){

        closeImage();

    }

});

