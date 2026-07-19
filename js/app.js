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
            style="max-width:100%; border-radius:15px;">

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

