let memoryLevel = 0;

let neuronState=[];

let selectedCell=null;
const neuronCount=15;


const neuronMap=[

[1,5],
[0,2,6],
[1,3,7],
[2,4,8],
[3,9],

[0,6,10],
[1,5,7,11],
[2,6,8,12],
[3,7,9,13],
[4,8,14],

[5,11],
[6,10,12],
[7,11,13],
[8,12,14],
[9,13]

];

let memoryGrid;


const memoryLevelData = {

solution:[

"A7","3F","72","C9",
"12","6F","8B","44",
"FF","21","B2","90"

],


hidden:[

2,
5,
10

]

};

const memories = [

{
    title:"🧩 Reconstruction du souvenir",
    text:"Cette photo est corrompue. Replace les morceaux pour restaurer le souvenir.",
    type:"puzzle"
},

{
    title:"⚡ Réseau neuronal",
    text:"Les connexions du cerveau sont rompues. Réactive tous les neurones.",
    type:"neurons"
},

{
    title:"💾 Noyau mémoire",
    text:"Les données neuronales sont corrompues.",
    type:"memoryCore"
    }

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

    switch(type){

        case "puzzle":
            launchPuzzle();
            break;


        case "neurons":
            launchNeurons();
            break;


        case "memoryCore":
            launchMemoryCore();
            break;

    }

}







function nextMemory(){

    memoryLevel++;

    if(memoryLevel >= memories.length){

        finishBrain();
        return;

    }

    showMemory();

}

function checkRepair(){

    if(document.querySelectorAll(".broken").length===0){

        nextMemory();

    }

}

function finishBrain(){
    showFinalReveal();
}

function exitBrain(){

        document
        .getElementById("brain")
        .classList.add("hidden");
    
        document
        .getElementById("game")
        .classList.remove("hidden");
    
    } 


    let puzzle = [];
    let selected = null;
    
    function launchPuzzle(){
    
        document.getElementById("challenge").innerHTML=`
    
            <div id="puzzle-board"></div>
    
        `;
    
        createPuzzle();
    
    }

    function createPuzzle(){

        puzzle=[];
    
        for(let i=0;i<9;i++){
    
            puzzle.push(i);
    
        }
    
        shuffle(puzzle);
    
        drawPuzzle();
    
    }

    function drawPuzzle(){

        const board=document.getElementById("puzzle-board");
    
        board.innerHTML="";
    
        puzzle.forEach((piece,index)=>{
    
            const div=document.createElement("div");
    
            div.className="puzzle-piece";
    
            div.dataset.index=index;
    
            div.dataset.value=piece;
    
            div.style.backgroundPosition=
    
            `${-(piece%3)*100}% ${-Math.floor(piece/3)*100}%`;
    
            div.onclick=()=>clickPiece(index);
    
            board.appendChild(div);
    
        });
    
    }

    function clickPiece(index){

        if(selected===null){
    
            selected=index;
    
            document
            .querySelectorAll(".puzzle-piece")[index]
            .classList.add("selected");
    
            return;
    
        }
    
        [puzzle[selected],puzzle[index]]=
        [puzzle[index],puzzle[selected]];
    
        selected=null;
    
        drawPuzzle();
    
        checkPuzzle();
    
    }

    function checkPuzzle(){

        for(let i=0;i<9;i++){
    
            if(puzzle[i]!=i){
    
                return;
    
            }
    
        }
    
        setTimeout(()=>{
    
            memoryRestored();
    
        },300);
    
    }
    function memoryRestored(){

        const brain = document.getElementById("brain-content");
    
        brain.innerHTML = `
    
        <div class="restore-screen">
    
            <h1>🧠</h1>
    
            <h2>Souvenir restauré</h2>
    
            <div class="progress-container">
    
                <div id="memory-progress"></div>
    
            </div>
    
            <p id="restore-text">
    
                Reconstruction des connexions neuronales...
    
            </p>
    
        </div>
    
        `;
    
        let progress = 0;
    
        const bar = document.getElementById("memory-progress");
    
        const timer = setInterval(()=>{
    
            progress++;
    
            bar.style.width = progress + "%";
    
            if(progress >= 100){
    
                clearInterval(timer);
    
                setTimeout(()=>{
    
                    nextMemory();
    
                },800);
    
            }
    
        },25);
    
    }

    function shuffle(array){

        for(let i=array.length-1;i>0;i--){
    
            let j=Math.floor(Math.random()*(i+1));
    
            [array[i],array[j]]=
            [array[j],array[i]];
    
        }
    
    }

    function launchNeurons(){


        document.getElementById("challenge").innerHTML=`
        
        <h2>⚡ Connexion neuronale</h2>
        
        <p>
        Le réseau est instable.<br>
        Active tous les neurones.
        </p>
        
        
        <div id="neuron-zone"></div>
        
        
        <p id="neuron-status">
        0 / 15 connexions
        </p>
        
        `;
        
        
        
        createNeuronGame();
        
        
        }

        function createNeuronGame(){


            const zone=
            document.getElementById("neuron-zone");
            
            
            zone.innerHTML="";
            
            
            neuronState=[];
            
            
            
            for(let i=0;i<neuronCount;i++){
            
            
            neuronState.push(false);
            
            
            let n=document.createElement("div");
            
            
            n.className="brain-neuron";
            
            
            n.dataset.id=i;
            
            
            n.onclick=()=>{
            
            toggleNeuron(i);
            
            };
            
            
            
            zone.appendChild(n);
            
            
            
            }
            
            
            // mélange de départ
            
            for(let i=0;i<8;i++){
            
            toggleNeuron(
            Math.floor(Math.random()*15),
            false
            );
            
            }
            
            
            updateNeurons();
            
            
            }

 

    function updateNeurons(){


        const nodes=
        document.querySelectorAll(".brain-neuron");
        
        
        nodes.forEach((node,i)=>{
        
        
        if(neuronState[i]){
        
        node.classList.add("active");
        
        }
        
        else{
        
        node.classList.remove("active");
        
        }
        
        
        });
        
        
        
        let active=
        neuronState.filter(x=>x).length;
        
        
        
        document.getElementById("neuron-status")
        .innerText=
        
        active+" / 15 neurones actifs";
        
        
        }

        function neuronComplete(){

            brainTransition(
                "⚡ Connexions neuronales restaurées",
                nextMemory
            );
        
        }
            
            
            
            function checkNeuronWin(){

                let finished = neuronState.every(x => x === true);
            
            
                if(finished){
            
                    setTimeout(()=>{
            
                        neuronComplete();
            
                    },1000);
            
                }
            
            }

        function toggleNeuron(id,check=true){



            neuronState[id]=
            !neuronState[id];
            
            
            
            neuronMap[id].forEach(n=>{
            
            
            neuronState[n]=
            !neuronState[n];
            
            
            });
            
            
            
            updateNeurons();
            
            
            
            if(check){
            
            checkNeuronWin();
            
            }
            
            
            }

            


            function brainTransition(message, callback){

                document.getElementById("brain-content").innerHTML = `
                
                <div class="restore-screen">
                
                <h1>🧠</h1>
                
                <h2>${message}</h2>
                
                
                <div class="progress-container">
                
                <div id="transition-bar"></div>
                
                </div>
                
                
                <p>
                Reconstruction des souvenirs...
                </p>
                
                
                </div>
                
                `;
                
                
                let progress=0;
                
                let bar=document.getElementById("transition-bar");
                
                
                let timer=setInterval(()=>{
                
                
                progress++;
                
                bar.style.width=progress+"%";
                
                
                if(progress>=100){
                
                clearInterval(timer);
                
                
                setTimeout(()=>{
                
                callback();
                
                },800);
                
                
                }
                
                
                },30);
                
                
                }

                function memoryCoreRestored(){

                    brainTransition(
                    "🧠 Noyau mémoire réparé",
                    finishBrain
                    );
                    
                    }
            function launchMemoryCore(){


                document.getElementById("challenge").innerHTML=`
                
                <h2>
💾 Reconstruction du noyau mémoire
</h2>


<p>
Certaines données ont été effacées.<br>
Replace les bons fragments dans les cases "??".
</p>


<p>
1️⃣ Clique sur une case vide<br>
2️⃣ Choisis un fragment disponible<br>
3️⃣ Reconstruis la séquence complète
</p>
                
                
                <div id="memory-grid"></div>
                
                
                <h3>
                Fragments disponibles
                </h3>
                
                
                <div id="fragments"></div>
                
                <button class="memory-button" onclick="checkCore()">
🧠 Reconstruire le noyau
</button>
                `;
                
                
                createCore();
                
                }

function createCore(){


const grid =
document.getElementById("memory-grid");


grid.innerHTML="";


memoryLevelData.solution
.forEach((value,index)=>{


let cell=document.createElement("div");


cell.className="memory-cell";


if(memoryLevelData.hidden.includes(index)){


    cell.innerHTML="❓";

    cell.dataset.value="";

    cell.dataset.answer=value;

    cell.onclick=()=>selectCell(cell);


}

else{

    cell.innerHTML=value;

}


grid.appendChild(cell);


});


createFragments();


}
function selectCell(cell){


    document
    .querySelectorAll(".memory-cell")
    .forEach(c=>{

        c.classList.remove("selected");

    });


    selectedCell=cell;


    cell.classList.add("selected");


}




function createFragments(){

    let zone=document.getElementById("fragments");

    zone.innerHTML="";


    let values=[

        "72",
        "6F",
        "B2"

    ];


    values.forEach(v=>{


        let f=document.createElement("button");

        f.className="fragment";

        f.innerText=v;


        f.onclick=()=>{


            if(selectedCell){


                selectedCell.innerText=v;

selectedCell.dataset.value=v;


selectedCell.classList.remove("selected");


selectedCell.classList.add("filled");


selectedCell=null;


            }


        };


        zone.appendChild(f);


    });


}

    
function checkCore(){


    let cells =
    document.querySelectorAll(".memory-cell");
    
    
    let ok=true;
    
    
    
    cells.forEach(c=>{
    
    
    if(c.dataset.answer){
    
    
    if(c.dataset.answer === c.dataset.value){
    
    
    c.classList.add("correct");
    
    
    }
    else{
    
    
    c.classList.add("wrong");
    
    ok=false;
    
    
    }
    
    
    }
    
    
    });
    
    
    
    if(ok){
    
    
    setTimeout(()=>{
    
    
    memoryCoreRestored();
    
    
    },1000);
    
    
    
    }
    
    else{
    
    
    alert("❌ Le noyau est encore corrompu. Les fragments rouges sont incorrects.");
    
    
    }
    
    
    }
    

    function showFinalReveal(){


        document.getElementById("brain-content").innerHTML=`
        
        <div class="final-reveal">
        
        
        <div class="heart-animation">
        ❤️
        </div>
        
        
        <h1>
        Mémoire restaurée
        </h1>
        
        
        <p class="typing">
        Une dernière information a été retrouvée...
        </p>
        
        
        <div class="secret-card">
        
        
        <h2>
        📅 Date parfaite
        </h2>
        
        
        <p>
        Ce n'était pas un lieu.<br>
        Ce n'était pas un moment précis.
        </p>
        
        
        <p>
        C'était simplement...
        </p>
        
        
        <h2>
        ❤️ Nous deux
        </h2>
        
        
        </div>
        
        
        <button 
        class="memory-button"
        onclick="exitBrain()">
        
        Continuer ✨
        
        </button>
        
        
        </div>
        
        `;
        
        
        }

    