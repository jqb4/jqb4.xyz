// Funkce pro náhodný hod kostkou
function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

// Funkce pro hod konkrétní kostkou po kliknutí
function rollSingleDice(event) {
    const dice = event.currentTarget;

    // Zkontrolujeme, jestli kostka není skrytá nebo již není v procesu hodu
    if (dice.classList.contains('hidden') || dice.isRolling) {
        return;  // Zabráníme opakovanému kliknutí
    }

    const sides = parseInt(dice.getAttribute('data-sides'));  // Získání počtu stran z atributu
    const rollResult = rollDice(sides);  // Generování náhodného čísla

    // Skryjeme kostku a označíme jako házenou (blokuje další kliknutí)
    dice.classList.add('hidden');
    dice.isRolling = true;

    // Po 600 ms (čas skrytí) zobrazíme nové číslo a kostku
    setTimeout(() => {
        dice.innerHTML = `${rollResult}`;
        dice.classList.remove('hidden');  // Kostka se opět zobrazí

        setTimeout(() => {
            dice.isRolling = false;  // Kostka je připravena k dalšímu hodu
        }, 5000);  // Zpoždění po zobrazení
    }, 600);  // Nové číslo a znovu objevení kostky po 600 ms
}

// Funkce pro nastavení všech kostek
function setupDice() {
    document.querySelectorAll('.dice').forEach(dice => {
        // Přiřazení atributu data-sides pro každou kostku podle její třídy
        if (dice.classList.contains('d4')) {
            dice.setAttribute('data-sides', 4);
        } else if (dice.classList.contains('d6')) {
            dice.setAttribute('data-sides', 6);
        } else if (dice.classList.contains('d8')) {
            dice.setAttribute('data-sides', 8);
        } else if (dice.classList.contains('d10')) {
            dice.setAttribute('data-sides', 10);
        } else if (dice.classList.contains('d12')) {
            dice.setAttribute('data-sides', 12);
        } else if (dice.classList.contains('d20')) {
            dice.setAttribute('data-sides', 20);
        }

        dice.isRolling = false;  // Inicializace kontrolní proměnné

        // Přidání události kliknutí na každou kostku
        dice.addEventListener('click', rollSingleDice);
    });
}

// Spuštění při načtení stránky
document.addEventListener('DOMContentLoaded', setupDice);
