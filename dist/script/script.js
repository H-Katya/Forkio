const burger = () =>{
    const button = document.body.querySelector('.burger-icon');
    const menu = document.querySelector('.menu-wrap');

    button.addEventListener('click', (e)=>{
        menu.classList.toggle('opened')
        e.target.classList.toggle('icon-bars');
        e.target.classList.toggle('icon-xmark');
    })
}
burger()