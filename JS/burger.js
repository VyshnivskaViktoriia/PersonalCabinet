document.querySelector('.burger-body').addEventListener('click', () => {
    document.querySelector('.navigation').classList.toggle('open');
    document.querySelector('.burger-body').classList.toggle('active');
});