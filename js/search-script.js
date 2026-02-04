const burgerBtn = document.querySelector('#burgerBtn');
const headerMenu = document.querySelector('#header-menu');
const fromInput = document.querySelector('#from');
const toInput = document.querySelector('#to');
const dateInput = document.querySelector('#departure-date');
const searchForm = document.querySelector('.search-form');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    headerMenu.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    burgerBtn.setAttribute('aria-expanded', isMenuOpen);
    
    if (isMenuOpen) {
        document.addEventListener('click', handleCloseMenuClick, { capture: true });
    } else {
        document.removeEventListener('click', handleCloseMenuClick, { capture: true });
    }
}

function handleCloseMenuClick(event) {
    if (
        !headerMenu.contains(event.target) && 
        event.target !== burgerBtn && 
        !burgerBtn.contains(event.target)
    ) {
        toggleMenu();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    const departureDate = dateInput?.value || '';

    if (!from || !to || !departureDate) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }

    const selectedDate = new Date(departureDate);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        alert('Нельзя выбрать дату в прошлом!');
        return;
    }

    alert(
        `✅ БИЛЕТ УСПЕШНО ВЫБРАН!\n\n` +
        `Откуда: ${from}\n` +
        `Куда: ${to}\n` +
        `Дата вылета: ${departureDate}\n\n` +
        `Перейти к оплате?`
    );

 
    if (isMenuOpen) toggleMenu();
}

function init() {
    if (burgerBtn) {
        burgerBtn.addEventListener('click', toggleMenu);
        burgerBtn.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMenu();
            }
        });
    }
    
    if (searchForm) {
        searchForm.addEventListener('submit', handleFormSubmit);
    }
    
   
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', init);