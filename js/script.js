const burgerBtn = document.querySelector('#burgerBtn');
const headerMenu = document.querySelector('#header-menu');
const fromInput = document.querySelector('#from'); 
const toInput = document.querySelector('#to'); // НОВОЕ: Находим поле "Куда"

const selectButtons = document.querySelectorAll('.btn-select');
const searchForm = document.querySelector('.search-form');
const roundTripCheckbox = document.querySelector('[name="trip-type"]');
// ВАЖНО: Убедитесь, что в HTML у поля даты id="departure-date", 
// либо замените здесь '#departure-date' на '#date'
const dateInput = document.querySelector('#departure-date') || document.querySelector('#date'); 

let isMenuOpen = false;

// 2. Функция меню
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
    if (!headerMenu.contains(event.target) &&
        event.target !== burgerBtn &&
        !burgerBtn.contains(event.target)) {
        toggleMenu();
    }
}

// 3. Обработка кнопок "Выбрать" на карточках
selectButtons.forEach(button => {
    button.addEventListener('click', function() { // Добавил слушатель клика, которого не было в вашем коде явно
        const card = button.closest('.destination-card');
        const image = card.querySelector('.destination-img');
        const destinationName = image.getAttribute('alt');
        
        // ИЗМЕНЕНО: Когда выбираем карточку, логичнее заполнять "Куда", а не "Откуда"
        toInput.value = destinationName; 
        
        // Фокус на поле даты после выбора
        if(dateInput) dateInput.focus();
        searchForm.scrollIntoView({ behavior: 'smooth' });
    });
});

// 4. Обработка отправки формы
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const from = fromInput.value.trim();
    const to = toInput.value.trim(); // НОВОЕ: Получаем значение "Куда"
    const departureDate = dateInput ? dateInput.value.trim() : '';
    
    // Если полей пассажиров и чекбокса нет в HTML, ставим значения по умолчанию, чтобы код не ломался
    const passengersInput = document.querySelector('#passengers');
    const passengers = passengersInput ? passengersInput.value : '1';
    
    const isRoundTrip = roundTripCheckbox ? roundTripCheckbox.checked : false;
    
    let isValid = true;
    let errorMessage = '';
    
    if (from === '') {
        isValid = false;
        errorMessage += '* Пожалуйста, укажите город отправления\n';
    }
    // НОВОЕ: Проверка поля "Куда"
    if (to === '') {
        isValid = false;
        errorMessage += '* Пожалуйста, укажите город прибытия (Куда)\n';
    }
    if (departureDate === '') {
        isValid = false;
        errorMessage += '* Пожалуйста, укажите дату вылета\n';
    }
    
    if (!isValid) {
        alert('Ошибка в форме: \n' + errorMessage);
        return;
    }
    
    const tripTypeText = isRoundTrip ? 'туда и обратно' : 'в одну сторону';
    
    // ИЗМЕНЕНО: Добавлено поле "Куда" в вывод
    alert(`Поиск билетов: 
Откуда: ${from} 
Куда: ${to}
Дата вылета: ${departureDate}
Пассажиров: ${passengers}
Тип поездки: ${tripTypeText}`);
});

// 5. Работа клавиатурой (бургер)
if(burgerBtn) {
    burgerBtn.addEventListener('keydown', function(event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            toggleMenu();
        }
    });
    burgerBtn.addEventListener('click', toggleMenu); // Добавил клик на сам бургер
}

// 6. Изменение размера окна
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
    }
});

function init() {
    console.log("Сайт ПУТЬ-КОМПАС.РУ инициализирован!");
}

init();