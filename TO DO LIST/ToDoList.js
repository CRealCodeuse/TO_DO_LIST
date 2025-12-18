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
        if (!hasBeenModified && this.textContent.trim() === 'Acheter des tomates') {
            this.textContent = ''; // Vider la cellule
        }
        if (!hasBeenModified && this.textContent.trim() === 'Réviser les maths') {
            this.textContent = ''; // Vider la cellule
        }
        if (!hasBeenModified && this.textContent.trim() === 'Faire la vaisselle') {
            this.textContent = ''; // Vider la cellule
        }
        if (!hasBeenModified && this.textContent.trim() === 'Faire un brouillon du site') {
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

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        cells.forEach(cell => {
            // Utiliser cell partout, pas this
            if (cell.textContent.trim() === '...') {
                cell.textContent = '...';
            }
            if (cell.textContent.trim() === 'Acheter des tomates') {
                cell.textContent = 'Acheter des tomates';
            }
            if (cell.textContent.trim() === 'Réviser les maths') {
                cell.textContent = 'Réviser les maths';
            }
            if (cell.textContent.trim() === 'Faire la vaisselle') {
                cell.textContent = 'Faire la vaisselle';
            }
            if (cell.textContent.trim() === 'Faire un brouillon du site') {
                cell.textContent = 'Faire un brouillon du site';
            }
            // Si la cellule contient n'importe quel texte (non vide et différent des valeurs par défaut)
            if (cell.textContent.trim() !== '' && 
                cell.textContent.trim() !== '...' &&
                cell.textContent.trim() !== 'Acheter des tomates' &&
                cell.textContent.trim() !== 'Réviser les maths' &&
                cell.textContent.trim() !== 'Faire la vaisselle' &&
                cell.textContent.trim() !== 'Faire un brouillon du site') {
                cell.textContent = '...';
            }
        });
    });
});



