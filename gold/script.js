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
        const eventDate = new Date('November 28, 2025 17:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;
        
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

    // Обработка формы
    const form = document.getElementById('attendanceForm');
    const messageDiv = document.getElementById('message');

    if (form && messageDiv) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                attendance: formData.get('attendance')
            };

            const scriptURL = 'https://script.google.com/macros/s/AKfycbymR8vXztyWVqvjsfbuEHW00bFp7VqedODVu1MXwBoeR8UdkVkFzp_ce_CJWNT5E-SP/exec';

            fetch(scriptURL, {
                method: 'POST',
                body: new URLSearchParams(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then(response => {
                if (response.ok) {
                    showMessage('Сіздің жауабыңыз сәтті жіберілді! Рахмет!', 'success');
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Қате орын алды. Өтінеміз, кейінірек қайталап көріңіз.', 'error');
            });
        });

        function showMessage(text, type) {
            messageDiv.textContent = text;
            messageDiv.className = `message ${type}`;
            messageDiv.style.display = 'block';
            
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
});
