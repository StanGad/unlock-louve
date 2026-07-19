let cards=[];



async function loadCards(){


const response =
await fetch(
"data/cards.json"
);


cards =
await response.json();


console.log("Cartes chargées :", cards);


}



function findCard(id){


return cards.find(
card => card.id === id
);


}