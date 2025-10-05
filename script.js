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
        dot.addEventListener('click', function
