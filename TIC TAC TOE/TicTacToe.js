// Sélection des éléments
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');

// Variables du jeu
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Combinaisons gagnantes
const winningConditions = [
    [0, 1, 2], // Ligne 1
    [3, 4, 5], // Ligne 2
    [6, 7, 8], // Ligne 3
    [0, 3, 6], // Colonne 1
    [1, 4, 7], // Colonne 2
    [2, 5, 8], // Colonne 3
    [0, 4, 8], // Diagonale 1
    [2, 4, 6]  // Diagonale 2
];

// Messages
const winningMessage = () => `🎉 Le joueur ${currentPlayer} a gagné !`;
const drawMessage = () => `Match nul ! 🤝`;
const currentPlayerTurn = () => `Tour du joueur ${currentPlayer}`;

// Initialisation
message.textContent = currentPlayerTurn();

// Gestion du clic sur une cellule
function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    // Vérifie si la cellule est déjà occupée ou si le jeu est terminé
    if (gameState[index] !== '' || !gameActive) {
        return;
    }

    // Met à jour l'état du jeu
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    // Vérifie le résultat
    checkResult();
}

// Vérifie le résultat du jeu
function checkResult() {
    let roundWon = false;
    let winningCombination = [];

    // Vérifie toutes les combinaisons gagnantes
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            winningCombination = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        message.textContent = winningMessage();
        gameActive = false;
        highlightWinningCells(winningCombination);
        return;
    }

    // Vérifie si toutes les cases sont remplies (match nul)
    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        message.textContent = drawMessage();
        gameActive = false;
        return;
    }

    // Change de joueur
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = currentPlayerTurn();
}

// Met en surbrillance les cellules gagnantes
function highlightWinningCells(combination) {
    combination.forEach(index => {
        cells[index].classList.add('winning');
    });
}

// Redémarre le jeu
function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    message.textContent = currentPlayerTurn();

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning');
    });
}

// Ajoute les événements
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

// Ajoute après les variables du jeu
let vsComputer = true; // true pour jouer contre l'ordinateur

// Modifie la fonction checkResult pour ajouter le tour de l'IA
function checkResult() {
    let roundWon = false;
    let winningCombination = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            winningCombination = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        message.textContent = winningMessage();
        gameActive = false;
        highlightWinningCells(winningCombination);
        return;
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        message.textContent = drawMessage();
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = currentPlayerTurn();

    // Tour de l'ordinateur
    if (vsComputer && currentPlayer === 'O' && gameActive) {
        setTimeout(computerMove, 500);
    }
}

// Mouvement de l'ordinateur
function computerMove() {
    // Cherche une case vide
    const availableCells = gameState
        .map((cell, index) => cell === '' ? index : null)
        .filter(index => index !== null);

    if (availableCells.length === 0) return;

    // Choisit une case aléatoire
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    cells[randomIndex].classList.add('o');

    checkResult();
}