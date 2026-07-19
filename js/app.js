// Chargement du jeu

document
    .getElementById("startMission")
    .addEventListener(
        "click",
        startMission
    );


async function startMission(){

    // cacher accueil
    document
    .getElementById("home")
    .classList.add("hidden");


    // afficher jeu
    document
    .getElementById("game")
    .classList.remove("hidden");


    // lancer chrono
    startTimer();


    // charger les cartes
    await loadCards();


}



// bouton ouvrir carte

document
.getElementById("validate")
.addEventListener(
    "click",
    openCard
);



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

        <p>
        Ce numéro ne correspond à aucune carte.
        </p>
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