// Sélectionner toutes les cellules éditables
const cells = document.querySelectorAll('td[contenteditable="true"]');

// Pour chaque cellule
cells.forEach(cell => {
    // Marquer si la cellule a été modifiée
    let hasBeenModified = false;
    
    // Au focus (clic sur la cellule)
    cell.addEventListener('focus', function() {
        // Si jamais modifiée et contient "..."
        if (!hasBeenModified && this.textContent.trim() === '...') {
            this.textContent = ''; // Vider la cellule
        }
        // Si jamais modifiée et contient "Buy some tomatoes"
        if (!hasBeenModified && this.textContent.trim() === 'Buy tomatoes') {
            this.textContent = ''; // Vider la cellule
        }
        // Si jamais modifiée et contient "Study math"
        if (!hasBeenModified && this.textContent.trim() === 'Study math') {
            this.textContent = ''; // Vider la cellule
        }
        // Si jamais modifiée et contient "Wash the dishes"
        if (!hasBeenModified && this.textContent.trim() === 'Wash the dishes') {
            this.textContent = ''; // Vider la cellule
        }
        // Si jamais modifiée et contient "Do the site's template"
        if (!hasBeenModified && this.textContent.trim() === 'Do the site\'s template') {
            this.textContent = ''; // Vider la cellule
        }
    });

    // Marquer comme modifiée dès qu'on tape quelque chose
    cell.addEventListener('input', function() {
        hasBeenModified = true;
    });
    
    // Si l'utilisateur quitte la cellule vide, remettre "..."
    cell.addEventListener('blur', function() {
        if (this.textContent.trim() === '') {
            this.textContent = '...';
            hasBeenModified = false; // Réinitialiser pour permettre un nouveau clic
        }
    });
});

const Empty = document.querySelector('button[class="Empty"]'); // Sélectionner le bouton "Empty"

Empty.addEventListener('click', function() { // Au clic sur le bouton
    cells.forEach(cell => { // Pour chaque cellule
        // Si la cellule contient "..."
            if (cell.textContent.trim() === '...') {
                cell.textContent = '...';
            }
            // Si la cellule contient "Buy some tomatoes"
            if (cell.textContent.trim() === 'Buy tomatoes') {
                cell.textContent = 'Buy tomatoes';
            }
            // Si la cellule contient "Study math"
            if (cell.textContent.trim() === 'Review the math lesson') {
                cell.textContent = 'Review the math lesson'; 
            }
            // Si la cellule contient "Wash the dishes"
            if (cell.textContent.trim() === 'Wash the dishes') {
                cell.textContent = 'Wash the dishes';
            }
            // Si la cellule contient "Do the site's template"
            if (cell.textContent.trim() === 'Do the site\'s template') {
                cell.textContent = 'Do the site\'s template';
            }
            // Si la cellule contient n'importe quel texte (non vide et différent des valeurs par défaut)
            if (cell.textContent.trim() !== '' && 
                cell.textContent.trim() !== '...' &&
                cell.textContent.trim() !== 'Buy tomatoes' &&
                cell.textContent.trim() !== 'Review the math lesson' &&
                cell.textContent.trim() !== 'Wash the dishes' &&
                cell.textContent.trim() !== 'Do the site\'s template') {
                cell.textContent = '...'; // Remettre "..."
            }
        });
});

const Francais = document.querySelector('button[class="Francais"]');

let isTranslated = false; // Variable pour suivre l'état de traduction

Francais.addEventListener('click', function() {
    const translations = {
        '...': '...',
        'What should I do today ?': 'Que dois-je faire aujourd\'hui ?',
        'Buy tomatoes': 'Acheter des tomates',
        'Review the math lesson': 'Réviser la leçon de maths',
        'Wash the dishes': 'Laver la vaisselle',
        'Do the site\'s template': 'Faire le modèle du site',
        'Hey there !': 'Bienvenue !',
        'Here is a simple to-do list where you can write down your tasks for today (or for the week).': 'Voici ta propre liste de tâches où tu peux écrire tout ce que tu as à faire pour aujourd\'hui (ou dans la semaine).',
        'Just click on a cell to edit it and add your tasks.': 'Tu peux cliquer sur une cellule et modifier son contenu.', 
        'When you\'re done, you can click the button below to clear all the tasks and start fresh.': 'Lorsque tu as terminé toutes tes tâches, clique simplement sur le bouton \'Vider les tâches\' et tu pourras reommencer une nouvelle liste.',
        'Groceries': 'Courses',
        'School/Work': 'École/Travail',
        'Home': 'Maison',
        'Projects': 'Projets',
        'Empty the tasks': 'Vider les tâches',
        'Français': 'Anglais'
    };
    
    // Créer un objet inverse pour la traduction retour (français → anglais)
    const reverseTranslations = {};
    for (let key in translations) {
        reverseTranslations[translations[key]] = key;
    }
    
    // Choisir le dictionnaire approprié selon l'état
    const dictionary = isTranslated ? reverseTranslations : translations;
    
    // Parcourir et traduire les éléments
    document.querySelectorAll('*').forEach(element => {
        if (element.childNodes.length > 0) {
            element.childNodes.forEach(node => {
                if (node.nodeType === 3) { // Node de texte
                    const text = node.textContent.trim();
                    if (dictionary[text]) {
                        node.textContent = dictionary[text];
                    }
                }
            });
        }
    });
    
    // Inverser l'état
    isTranslated = !isTranslated;
});

