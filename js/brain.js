let memoryLevel = 0;


const memories = [

{
title:"🔎 Fragment de mémoire",
text:"Des souvenirs sont cachés dans mon esprit... retrouve les mots.",
type:"wordsearch"
},


{
title:"💬 Mémoire des mots",

text:"Complète la phrase oubliée.",

type:"text"

},


{
title:"🔐 Mémoire verrouillée",

text:"Trouve le dernier code.",

type:"code"

}

];

const wordGrid = [

    ["A","Q","G","H","M","I","B","U","F","A","X","C","M","F","W"],
    ["M","J","K","L","O","U","V","E","F","L","J","Y","W","R","H"],
    ["A","Z","F","S","U","O","S","I","B","N","R","A","S","X","O"],
    ["V","A","N","Y","N","L","C","W","P","T","S","L","Q","L","E"],
    ["U","C","I","W","F","U","U","J","N","V","O","D","L","F","G"],
    ["Q","S","W","X","T","H","T","A","T","H","L","A","H","U","N"],
    ["F","Z","E","E","O","C","T","W","S","N","E","N","B","E","Y"],
    ["I","H","J","X","G","S","I","C","C","J","I","Y","E","M","O"],
    ["L","V","S","T","Q","L","R","H","Q","O","L","H","F","E","F"],
    ["L","T","D","Ç","U","B","A","V","S","T","U","C","X","I","T"],
    ["W","W","I","R","Z","L","V","F","A","F","I","R","P","Z","F"],
    ["V","I","V","E","I","T","W","U","C","O","X","Z","S","I","Q"],
    ["F","Z","H","C","H","A","M","P","A","G","N","O","L","E","Q"],
    ["N","P","V","P","W","U","F","Q","G","W","Z","B","I","R","B"],
    ["B","G","D","C","P","G","C","K","H","J","P","X","F","T","T"]
    
    ];

    const hiddenWords=[

        "LOUVE",
        "STAN",
        "SOLEIL",
        "CHAMPAGNOLE",
        "BISOUS",
        "BNF",
        "TREIZIEME",
        "COURSE"
        
        ];


function enterBrain(){


document
.getElementById("game")
.classList.add("hidden");


document
.getElementById("brain")
.classList.remove("hidden");



memoryLevel=0;

showMemory();


}




function showMemory(){


    let memory = memories[memoryLevel];


    document
    .getElementById("brain-content")
    .innerHTML = `

    <div class="memory-card">


    <h2>
    ${memory.title}
    </h2>


    <p>
    ${memory.text}
    </p>


    <div id="challenge">

    </div>


    </div>

    `;


    launchMemory(memory.type);


}






function launchMemory(type){


    const zone =
    document.getElementById("challenge");
    
    
    
    if(type==="wordsearch"){
    
        launchWordSearch();
    
        return;
    
    }
    
    
    
    if(type==="text"){
    
    
    zone.innerHTML=`
    
    <input id="memory-answer"
    placeholder="Ta réponse">
    
    
    <button class="memory-button"
    onclick="checkText()">
    Valider
    </button>
    
    `;
    
    }
    
    
    
    if(type==="code"){
    
    
    zone.innerHTML=`
    
    <input id="brain-code"
    placeholder="Code">
    
    
    <button class="memory-button"
    onclick="checkCode()">
    Déverrouiller
    </button>
    
    `;
    
    }
    
    
    }



function checkMemory(answer){


if(answer){

nextMemory();

}

else{

alert("❌ Faux souvenir...");

}

}




function checkText(){


let answer =
document
.getElementById("memory-answer")
.value
.toLowerCase();



if(answer.includes("amour")){

nextMemory();

}

else{

alert("❌ Souvenir incomplet");

}


}




function checkCode(){


let code =
document
.getElementById("brain-code")
.value;



if(code==="0426"){

finishBrain();

}

else{

alert("🔒 Mauvais fragment mémoire");

}


}



function nextMemory(){


memoryLevel++;


if(memoryLevel>=memories.length){

finishBrain();

return;

}


showMemory();

}



function finishBrain(){


document
.getElementById("brain-content")
.innerHTML=`

<div class="memory-card">

<h1>
✨ Mémoire restaurée
</h1>


<p>
Toutes les connexions sont rétablies...
</p>


<p>
Une dernière information apparaît...
</p>


</div>

`;

}
function launchWordSearch(){


    const zone =
    document.getElementById("challenge");
    
    
    zone.innerHTML="";
    
    
    let html="<div class='word-grid'>";
    
    
    wordGrid.forEach((row,i)=>{
    
    
    row.forEach((letter,j)=>{
    
    
    html+=`
    
    <button
    class="letter"
    onclick="selectLetter(this,'${letter}')">
    
    ${letter}
    
    </button>
    
    `;
    
    
    });
    
    
    });
    
    
    html+="</div>";
    
    
    html+=`
    
    <div id="found">
    Mots trouvés : 0 / 8
    </div>
    
    
    <button
    class="memory-button"
    onclick="giveHint()">
    
    💡 Aide
    
    </button>
    
    `;
    
    
    zone.innerHTML=html;
    
    
    }

    let selectedLetters="";
let foundWords=[];



function selectLetter(button,letter){


button.classList.toggle("selected");


selectedLetters+=letter;



checkWords();


}

function checkWords(){


    hiddenWords.forEach(word=>{
    
    
    if(selectedLetters.includes(word)
    && !foundWords.includes(word)){
    
    
    foundWords.push(word);
    
    
    document
    .getElementById("found")
    .innerText=
    "Mots trouvés : "
    +foundWords.length+
    " / 8";
    
    
    alert("✅ "+word+" retrouvé !");
    
    
    selectedLetters="";
    
    
    if(foundWords.length===hiddenWords.length){
    
    nextMemory();
    
    }
    
    
    }
    
    
    });
    
    
    }

    let hintIndex=0;


function giveHint(){


if(hintIndex>=hiddenWords.length)
return;


alert(
"💡 Cherche le mot : "
+hiddenWords[hintIndex]
);


hintIndex++;


}

