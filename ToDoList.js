// Sélectionner toutes les cellules éditables
const cells = document.querySelectorAll('td[contenteditable="true"]');

// Pour chaque cellule
cells.forEach(cell => { // Pour chaque cellule
    // Marquer si la cellule a été modifiée
    let hasBeenModified = false; // Initialement non modifiée
    
    // Au focus (clic sur la cellule)
    cell.addEventListener('focus', function() { // Au focus
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
    cell.addEventListener('input', function() { // Au changement de contenu
        hasBeenModified = true; // Marquer comme modifiée
    });
    
    // Si l'utilisateur quitte la cellule vide, remettre "..."
    cell.addEventListener('blur', function() { // Au blur (quitter la cellule)
        if (this.textContent.trim() === '') { // Si vide
            this.textContent = '...'; // Remettre "..."
            hasBeenModified = false; // Réinitialiser pour permettre un nouveau clic
        }
    });
});

const Empty = document.querySelector('button[class="Empty"]'); // Sélectionner le bouton "Empty"

Empty.addEventListener('click', function() { // Au clic sur le bouton
    cells.forEach(cell => { // Pour chaque cellule
        // Si la cellule contient "..."
            if (cell.textContent.trim() === '...') {
                cell.textContent = '...'; // Remettre "..."
            }
            // Si la cellule contient "Buy tomatoes"
            if (cell.textContent.trim() === 'Buy tomatoes') {
                cell.textContent = 'Buy tomatoes'; // Remettre "Buy some tomatoes"
            }
            // Si la cellule contient "Study math"
            if (cell.textContent.trim() === 'Review the math lesson') {
                cell.textContent = 'Review the math lesson'; // Remettre "Study math"
            }
            // Si la cellule contient "Wash the dishes"
            if (cell.textContent.trim() === 'Wash the dishes') {
                cell.textContent = 'Wash the dishes'; // Remettre "Wash the dishes"
            }
            // Si la cellule contient "Do the site's template"
            if (cell.textContent.trim() === 'Do the site\'s template') {
                cell.textContent = 'Do the site\'s template'; // Remettre "Do the site's template"
            }
            // Si la cellule contient n'importe quel texte (non vide et différent des valeurs par défaut)
            if (cell.textContent.trim() !== '' && // Non vide
                cell.textContent.trim() !== '...' && // Différent de "..."
                cell.textContent.trim() !== 'Buy tomatoes' && // Différent de "Buy some tomatoes"
                cell.textContent.trim() !== 'Review the math lesson' && // Différent de "Study math"
                cell.textContent.trim() !== 'Wash the dishes' && // Différent de "Wash the dishes"
                cell.textContent.trim() !== 'Do the site\'s template') { // Différent de "Do the site's template"
                cell.textContent = '...'; // Remettre "..."
            }
        });
});

const Francais = document.querySelector('button[class="Francais"]'); // Sélectionner le bouton "Français"

let isTranslated = false; // Variable pour suivre l'état de traduction

Francais.addEventListener('click', function() { // Au clic sur le bouton
    const translations = { // Dictionnaire de traduction (anglais → français)
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
    const reverseTranslations = {}; // Dictionnaire inverse
    for (let key in translations) { // Parcourir les clés du dictionnaire original
        reverseTranslations[translations[key]] = key; // Inverser clé et valeur
    }
    
    // Choisir le dictionnaire approprié selon l'état
    const dictionary = isTranslated ? reverseTranslations : translations; // Dictionnaire à utiliser
    
    // Parcourir et traduire les éléments
    document.querySelectorAll('*').forEach(element => { // Pour chaque élément
        if (element.childNodes.length > 0) { // S'il a des nœuds enfants
            element.childNodes.forEach(node => { // Pour chaque nœud enfant
                if (node.nodeType === 3) { // Node de texte
                    const text = node.textContent.trim(); // Texte du nœud
                    if (dictionary[text]) { // Si le texte est dans le dictionnaire
                        node.textContent = dictionary[text]; // Traduire le texte
                    }
                }
            });
        }
    });
    
    // Inverser l'état
    isTranslated = !isTranslated; // Changer l'état de traduction
});

const Theme = document.querySelector('button[class="Theme"]'); // Sélectionner le bouton "Thème"

let isDarkMode = false; // Variable pour suivre l'état du thème

Theme.addEventListener('click', function() { // Au clic sur le bouton
    if (!isDarkMode) { // Si le mode sombre n'est pas activé
        document.body.style.backgroundColor = '#121212'; // Couleur de fond sombre
        document.body.style.color = '#FFFFFF'; // Couleur de texte claire
        
        // Garder le header en noir
        const header = document.querySelector('header'); // Sélectionner le header
        if (header) { // Si le header existe
            header.style.color = '#000000'; // Couleur de texte noire
        }
        
        // Changer les cellules blanches en grises
        const cells = document.querySelectorAll('td'); // Sélectionner toutes les cellules
        cells.forEach(cell => { // Pour chaque cellule
            cell.style.backgroundColor = '#c5c5c5ff'; // Gris foncé
        });
        
        Theme.textContent = 'Thème clair'; // Changer le texte du bouton
    } else { // Si le mode sombre est activé
        document.body.style.backgroundColor = ''; // Réinitialiser au CSS original
        document.body.style.color = ''; // Réinitialiser au CSS original
        
        // Réinitialiser le header
        const header = document.querySelector('header'); // Sélectionner le header
        if (header) { // Si le header existe
            header.style.color = ''; // Réinitialiser au CSS original
        }
        
        // Réinitialiser les cellules
        const cells = document.querySelectorAll('td, th'); // Sélectionner toutes les cellules et en-têtes
        cells.forEach(cell => { // Pour chaque cellule
            cell.style.backgroundColor = ''; // Réinitialiser au CSS original
        });
        
        Theme.textContent = 'Thème sombre'; // Changer le texte du bouton
    }
    isDarkMode = !isDarkMode; // Inverser l'état du thème
});