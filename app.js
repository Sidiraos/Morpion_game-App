
let xCombinaison = [];
let yCombinaison = [];
let currentPlayer = "X";
let clickedCount = 0;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cases = [...document.querySelectorAll('.case')];
const info = document.querySelector('.info');
let lock = false;

info.textContent = "Au tour de " + currentPlayer;

cases.forEach(caseEl => {
    caseEl.addEventListener('click', handleClick);
})

function handleClick(e) {
    if(lock) return;
    e.target.textContent = currentPlayer;
    clickedCount++;
    if(currentPlayer === 'X') {
        addCombinaisonPlayers(xCombinaison , e , "XCombinaison");
        if(checkWinner(xCombinaison , currentPlayer)) return;
    } else {
        addCombinaisonPlayers(yCombinaison , e , "YCombinaison");
        if(checkWinner(yCombinaison , currentPlayer)) return;
    }
    if (e.target.textContent.length > 0) e.target.removeEventListener('click', handleClick);
    switchPlayer()
}
function addCombinaisonPlayers(array, e , arrayName){
    array.push(cases.findIndex(el => el === e.target)); 
    console.log(arrayName , array);
}
function checkWinner(array , currentPlayer) {
    array.sort()
    console.log("array", array);
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        // Vérifier si tous les éléments de la combinaison se trouvent dans l'array
        if (combination.every((element) => array.includes(element))) {
            lock = true;
            console.log("Combinaison gagnante trouvée :", combination);
          // Arrêter la boucle si une combinaison gagnante est trouvée
            info.textContent = currentPlayer + " a gagné! Appuiyez sur F5 pour recommencez";
            info.classList.add("fw-lighter");
            styleWinCombination(combination);
            return true;
        } else {
            if(clickedCount === cases.length) {
                console.log("Match fini");
                info.textContent = "Match nul Appuiyez sur F5 pour recommencer !";
                info.classList.add("fw-lighter");
                return true;
            }
        }
      }

    }


function styleWinCombination(combination) {
    for(let i = 0; i < combination.length; i++) {
        cases[combination[i]].classList.add("winning-combination");
    }
}

function switchPlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    info.textContent = 'Au tour de ' + currentPlayer;
}