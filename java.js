document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const nav = document.querySelector('nav');
    const body = document.body;

    function toggleMenu() {
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isExpanded);
        nav.setAttribute('aria-expanded', !isExpanded);
        
        // Блокировка скролла
        body.style.overflow = isExpanded ? 'auto' : 'hidden';
        
        // Управление отображением с анимацией
        if (!isExpanded) {
            nav.style.display = 'block';
        } else {
            setTimeout(() => {
                nav.style.display = 'none';
            }, 500);
        }
    }

    //  клик по бургеру
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.gallery-track');
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    const visibleItems = 3;
    let currentIndex = 0;
    
    // Клонируем элементы для бесконечного эффекта
    const cloneItems = [];
    for (let i = 0; i < visibleItems; i++) {
        cloneItems.push(items[i].cloneNode(true));
        
        // Для (6-го слайда) заменяем изображение
        const clone = items[items.length - 1 - i].cloneNode(true);
        if (i === 0) { // клон  (6-го) элемента
            const img = clone.querySelector('img');
            if (img) {
                img.src = 'https://psv4.userapi.com/s/v1/d/Kp6oVhdfy960lMDnvRmKIslBXMJMi8QrsSmM6zZoy9NgYCAbA4VTwFDfxugt65BddQ7hAmujg5g9wxNYnq1w1Zm3q1h8mv-gr_K3FR2ZFqP5By8TcPhNxQ/lisa.png';
                img.alt = 'Лисичка';
            }
        }
        cloneItems.push(clone);
    }
    
    cloneItems.forEach(clone => {
        track.appendChild(clone);
    });
    
    // Обновляем общий список элементов
    const allItems = document.querySelectorAll('.gallery-item');
    currentIndex = visibleItems; 
    
    function updateSlider() {
        // Показываем текущие видимые элементы
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].style.display = 'none';
        }
        
        for (let i = 0; i < visibleItems; i++) {
            const index = (currentIndex + i) % allItems.length;
            allItems[index].style.display = 'flex';
        }
    }
    
    prevBtn.addEventListener('click', function() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = allItems.length - visibleItems;
        }
        updateSlider();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex++;
        if (currentIndex > allItems.length - visibleItems) {
            currentIndex = 0;
        }
        updateSlider();
    });
    
    // Инициализация
    updateSlider();
});