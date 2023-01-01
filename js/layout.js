const asideToggleButton = document.getElementById('closeAside');
asideToggleButton.addEventListener('click', handleAside);

function handleAside () {
    const aside = document.querySelector('aside');
    aside.classList.toggle('closed');

} 

const asideCloseButton = document.getElementById('closeAsideSmall');
asideCloseButton.addEventListener('click', handleAsideSmall);

function handleAsideSmall () {
    const asideCloseButton = document.querySelector('aside');
    asideCloseButton.classList.toggle('closed');

} 