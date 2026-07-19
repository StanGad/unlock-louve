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




function openCard(){


    let number =
    document
    .getElementById("number")
    .value;



    let card =
    findCard(number);



    let content =
    document
    .getElementById("content");



    if(!card){


        content.innerHTML =
        `
        <h2>❌ Carte inconnue</h2>
        `;


        return;

    }



    content.innerHTML =

    `
    <h2>${card.title}</h2>

    <img 
    src="${card.image}"
    style="max-width:100%; border-radius:15px;">

    <p>
    ${card.text}
    </p>

    `;


}