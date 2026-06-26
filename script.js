document.querySelectorAll('.video-thumbnail').forEach(video => {
    video.addEventListener('click', () => {
        const videoId = video.getAttribute('data-video');
        alert(`Здесь запустится плеер для ВИДЕО ${videoId}`);
    });
});

document.querySelector('.play-now-btn').addEventListener('click', () => {
    alert('Запуск игры!');
});
