document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.parallax-section');
    const contents = document.querySelectorAll('.content');
    const dots = document.querySelectorAll('.dot');
    
    // Показываем первую секцию
    if (contents[0]) {
        contents[0].classList.add('visible');
    }
    
    // Наблюдатель для анимации секций
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = entry.target.querySelector('.content');
                if (content) {
                    content.classList.add('visible');
                }
                
                const index = Array.from(sections).indexOf(entry.target);
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        if (section) observer.observe(section);
    });
    
    // Навигация по точкам
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionIndex = this.getAttribute('data-section');
            if (sections[sectionIndex]) {
                sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Таймер обратного отсчета
    function updateCountdown() {
        const eventDate = new Date('November 28, 2025 18:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            // Если событие уже прошло
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Параллакс эффект
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Управление музыкой
    const audioControl = document.getElementById('audioControl');
    const music = document.getElementById('bg-music');
    
    if (audioControl && music) {
        let isPlaying = false;
        
        audioControl.addEventListener('click', function() {
            if (isPlaying) {
                music.pause();
                audioControl.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                music.play().catch(error => {
                    console.log('Не удалось запустить музыку:', error);
                });
                audioControl.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
        
        // Обновляем иконку при изменении состояния музыки
        music.addEventListener('play', function() {
            audioControl.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        });
        
        music.addEventListener('pause', function() {
            audioControl.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        });
        
        // Автозапуск музыки при первом взаимодействии
        document.addEventListener('click', function initAudio() {
            if (music.paused && !isPlaying) {
                music.play().catch(error => {
                    console.log('Автозапуск музыки заблокирован');
                });
            }
            document.removeEventListener('click', initAudio);
        });
    }

    // Отправка формы
    const attendanceForm = document.getElementById('attendanceForm');
    if (attendanceForm) {
        const SCRIPT_URL = 'https://script
