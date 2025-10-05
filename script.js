document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.parallax-section');
    const contents = document.querySelectorAll('.content');
    const dots = document.querySelectorAll('.dot');
    const audio = document.getElementById('backgroundMusic');
    const audioControl = document.getElementById('audioControl');
    let isPlaying = false;
    
    // Автозапуск музыки
    audio.play().then(() => {
        isPlaying = true;
        audioControl.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(error => {
        console.log('Автозапуск музыки заблокирован браузером');
        isPlaying = false;
        audioControl.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // Контрол музыки
    audioControl.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            audioControl.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            audioControl.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    contents[0].classList.add('visible');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = entry.target.querySelector('.content');
                content.classList.add('visible');
                
                const index = Array.from(sections).indexOf(entry.target);
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) dots[index].classList.add('active');
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const sectionIndex = this.getAttribute('data-section');
            sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    function updateCountdown() {
        const eventDate = new Date('November 28, 2025 17:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
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
});
