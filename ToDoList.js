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
        if (!hasBeenModified && this.textContent.trim() === 'Buy some tomatoes') {
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

const Empty = document.querySelectorAll('button[class="Empty"]'); // Sélectionner tous les boutons

Empty.forEach(button => { // Pour chaque bouton
    button.addEventListener('click', function() { // Au clic sur le bouton
        cells.forEach(cell => { // Pour chaque cellule
            // Si la cellule contient "..."
            if (cell.textContent.trim() === '...') {
                cell.textContent = '...';
            }
            // Si la cellule contient "Buy some tomatoes"
            if (cell.textContent.trim() === 'Buy some tomatoes') {
                cell.textContent = 'Buy some tomatoes';
            }
            // Si la cellule contient "Study math"
            if (cell.textContent.trim() === 'Study math') {
                cell.textContent = 'Study math';
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
                cell.textContent.trim() !== 'Buy some tomatoes' &&
                cell.textContent.trim() !== 'Study math' &&
                cell.textContent.trim() !== 'Wash the dishes' &&
                cell.textContent.trim() !== 'Do the site\'s template') {
                cell.textContent = '...'; // Remettre "..."
            }
        });
    });
});



