const currentGame = [];
let xCombinaison = [];
let yCombinaison = [];
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
const player = document.querySelector('h1[data-player="x"]');
let lock = false;
cases.forEach(caseEl => {
    caseEl.addEventListener('click', handleClick);
})

function handleClick(e) {
    fullCase(e.target , player)
    if(e.target.textContent === 'X') {
        xCombinaison.push(cases.findIndex(el => el === e.target)); 
        console.log("xCombinaison" , xCombinaison);
        checkWinner(xCombinaison , "X")
    } else {
        yCombinaison.push(cases.findIndex(el => el === e.target)); 
        console.log("yCombinaison" , yCombinaison);
        checkWinner(yCombinaison , "Y")
    }
    if (e.target.textContent.length > 0) {
        e.target.removeEventListener('click', handleClick);
    }
}

function checkWinner(array , joueur) {
    array.sort()
    console.log("array", array);
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        // Vérifier si tous les éléments de la combinaison se trouvent dans l'array
        if (combination.every((element) => array.includes(element))) {
          console.log("Combinaison gagnante trouvée :", combination);
          // Arrêter la boucle si une combinaison gagnante est trouvée
            player.textContent = joueur + " vous avez gagné! Appuiyez sur F5 pour recommencez";
            player.classList.add("fw-lighter");
            reloadGame();
          break;
        }
      }

    }

function reloadGame(){
    document.addEventListener('keydown', (e)=>{
        if(e.key === 'F5')location.reload();
    })
}
function fullCase(el , player){
    if(player.getAttribute('data-player') === 'x') {
        el.textContent = 'X';
        player.setAttribute('data-player', 'o');
        player.textContent = 'Au tour de 0';
    } else {
        el.textContent = 'O';
        player.setAttribute('data-player', 'x');
        player.textContent = 'Au tour de X';
    }
}
