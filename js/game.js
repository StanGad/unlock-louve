let currentCard=1;


function displayCard(id){


const card=getCard(id);


document.getElementById(
"card-title"
).innerText =
card.title;



document.getElementById(
"card-text"
).innerText =
card.text;



document.getElementById(
"card-image"
).src =
card.image;



}


function nextCard(){


const card=getCard(currentCard);


if(card.next){

currentCard=card.next;

displayCard(currentCard);

}


}