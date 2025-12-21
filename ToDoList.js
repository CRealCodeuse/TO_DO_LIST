// Sélectionner toutes les cellules éditables
const cells = document.querySelectorAll('td[contenteditable="true"]');

// Pour chaque cellule
cells.forEach(cell => { // Pour chaque cellule
    // Marquer si la cellule a été modifiée
    let hasBeenModified = false; // Initialement non modifiée
    
    // Au focus (clic sur la cellule)
    cell.addEventListener('focus', function() { // Au focus
        const checkbox = this.querySelector('.checkbox'); // Récupérer la checkbox
        const textOnly = this.textContent.trim(); // Récupérer uniquement le texte
        
        // Si jamais modifiée et contient un texte par défaut
        if (!hasBeenModified && 
            (textOnly === '...' || // Texte par défaut
             textOnly === 'Buy tomatoes' || // Texte par défaut
             textOnly === 'Study math' || // Texte par défaut
             textOnly === 'Wash the dishes' || // Texte par défaut
             textOnly === 'Do the site\'s template')) { // Texte par défaut
            
            // Vider uniquement le texte, garder la checkbox
            this.innerHTML = ''; // Vider la cellule
            if (checkbox) { // Si la checkbox existe
                this.appendChild(checkbox); // Remettre la checkbox
            }
        }
    });
    
    // Empêcher la suppression de la checkbox
    cell.addEventListener('keydown', function(e) { // Au keydown
        const checkbox = this.querySelector('.checkbox'); // Récupérer la checkbox
        const selection = window.getSelection(); // Récupérer la sélection
        
        // Si Backspace ou Delete
        if (e.key === 'Backspace' || e.key === 'Delete') { // Si Backspace ou Delete
            // Si le curseur est juste après la checkbox (position 0 ou 1)
            if (checkbox && selection.anchorOffset === 0) { // Position avant ou sur la checkbox
                e.preventDefault(); // Empêcher la suppression
            }
        }
    });
    
    // Empêcher la suppression de la checkbox lors de l'édition
    cell.addEventListener('input', function() { // Au changement de contenu
        const checkbox = this.querySelector('.checkbox'); // Récupérer la checkbox
        
        // Si la checkbox a disparu, la recréer
        if (!checkbox) { // Si pas de checkbox
            const newCheckbox = document.createElement('input'); // Créer une nouvelle checkbox
            newCheckbox.type = 'checkbox'; // Définir le type
            newCheckbox.className = 'checkbox'; // Définir la classe
            newCheckbox.title = 'checkbox'; // Définir le titre
            newCheckbox.contentEditable = 'false'; // Rendre non éditable
            newCheckbox.onclick = function(event) { // Empêcher la propagation du clic
                event.stopPropagation(); // Empêcher la propagation
            };
            
            // Insérer la checkbox au début
            this.insertBefore(newCheckbox, this.firstChild); 
        }
    });

    // Forcer le curseur à se placer après la checkbox
cell.addEventListener('click', function(e) { // Au clic dans la cellule
    const checkbox = this.querySelector('.checkbox'); // Récupérer la checkbox
    if (checkbox) { // Si la checkbox existe
        const selection = window.getSelection(); // Récupérer la sélection
        const range = document.createRange(); // Créer une nouvelle plage
        
        // Si le clic est sur la cellule (pas sur la checkbox)
        if (e.target !== checkbox) { // Si le clic n'est pas sur la checkbox
            // Placer le curseur après la checkbox
            range.setStartAfter(checkbox); // Définir le début après la checkbox
            range.collapse(true); // Collapser la plage
            selection.removeAllRanges(); // Supprimer les plages existantes
            selection.addRange(range); // Ajouter la nouvelle plage
        }
    }
});

// Empêcher le curseur de revenir avant la checkbox avec les touches
cell.addEventListener('keydown', function(e) {  // Au keydown
    const checkbox = this.querySelector('.checkbox'); // Récupérer la checkbox
    const selection = window.getSelection(); // Récupérer la sélection
    
    if (checkbox && selection.anchorOffset === 0) { 
        // Si on est à la position 0 (avant la checkbox)
        
        // Bloquer TOUTE saisie de caractères (lettres, chiffres, symboles, espace, etc.)
        if (e.key.length === 1 || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Empêcher l'écriture
            
            // Replacer le curseur après la checkbox
            const range = document.createRange(); // Créer une nouvelle plage
            range.setStartAfter(checkbox); // Définir le début après la checkbox
            range.collapse(true); // Collapser la plage
            selection.removeAllRanges(); // Supprimer les plages existantes
            selection.addRange(range); // Ajouter la nouvelle plage
            return;
        }
        
        // Bloquer les mouvements et suppressions (AJOUT DE Delete)
        if (e.key === 'ArrowLeft' || e.key === 'Home' || e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault(); // Bloquer le mouvement
            
            // Replacer le curseur après la checkbox
            const range = document.createRange(); // Créer une nouvelle plage
            range.setStartAfter(checkbox); // Définir le début après la checkbox
            range.collapse(true); // Collapser la plage
            selection.removeAllRanges(); // Supprimer les plages existantes
            selection.addRange(range); // Ajouter la nouvelle plage
        }
    }
});

    // Marquer comme modifiée dès qu'on tape quelque chose
    cell.addEventListener('input', function() { // Au changement de contenu
        hasBeenModified = true; // Marquer comme modifiée
    });
    
    // Si l'utilisateur quitte la cellule vide, remettre "..."
    cell.addEventListener('blur', function() { // Au blur (quitter la cellule)
    if (this.textContent.trim() === '') { // Si vide
        // Récupérer ou créer la checkbox
        let checkbox = this.querySelector('.checkbox'); // Chercher la checkbox existante
        
        if (!checkbox) { // Si pas de checkbox, en créer une
            checkbox = document.createElement('input'); // Créer une nouvelle checkbox
            checkbox.type = 'checkbox'; // Définir le type
            checkbox.className = 'checkbox'; // Définir la classe
            checkbox.title = 'checkbox'; // Définir le titre
            checkbox.contentEditable = 'false'; // Rendre non éditable
            checkbox.onclick = function(event) { // Empêcher la propagation du clic
                event.stopPropagation(); // Empêcher la propagation
            };
        }
        
        // Vider et restaurer avec checkbox + texte par défaut
        this.innerHTML = ''; // Vider la cellule
        this.appendChild(checkbox); // Ajouter la checkbox
        this.appendChild(document.createTextNode('...'));
        
        hasBeenModified = false; // Réinitialiser pour permettre un nouveau clic
    }
});
});

const Empty = document.querySelector('button[class="Empty"]'); // Sélectionner le bouton "Empty"

Empty.addEventListener('click', function() { // Au clic sur le bouton
    // Définir les valeurs par défaut pour chaque cellule
    const defaultValues = [ // Valeurs par défaut
        'Buy tomatoes', // Cellule 1
        'Review the math lesson', // Cellule 2
        'Wash the dishes', // Cellule 3
        'Do the site\'s template', // Cellule 4
        '...' // Cellule 5 et les suivantes
    ];
    
    cells.forEach((cell, index) => { // Pour chaque cellule
        // Récupérer ou créer la checkbox
        let checkbox = cell.querySelector('.checkbox'); // Chercher la checkbox existante
        
        if (!checkbox) { 
            // Si pas de checkbox, en créer une
            checkbox = document.createElement('input'); // Créer une nouvelle checkbox
            checkbox.type = 'checkbox'; // Définir le type
            checkbox.className = 'checkbox'; // Définir la classe
            checkbox.title = 'checkbox'; // Définir le titre
            checkbox.contentEditable = 'false'; // Rendre non éditable
            checkbox.onclick = function(event) { 
                event.stopPropagation(); // Empêcher la propagation
            };
        }
        
        // Réinitialiser l'état de la checkbox (décochée)
        checkbox.checked = false;
        
        // Réinitialiser le contenu de la cellule
        const defaultText = defaultValues[index] || '...'; // Texte par défaut selon l'index
        cell.innerHTML = ''; // Vider la cellule
        cell.appendChild(checkbox); // Ajouter la checkbox
        cell.appendChild(document.createTextNode(defaultText)); // Ajouter le texte par défaut
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