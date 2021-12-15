let hamebarger = document.querySelector('.hamberger');
let times = document.querySelector('.times');
let mobileNav = document.querySelector('.mobile-nav');
let faq = document.querySelector('.faq1');

hamebarger.addEventListener('click',function(){
    mobileNav.classList.add('open');
});

times.addEventListener('click',function(){
    mobileNav.classList.remove('open')
});

faq.addEventListener('click',function(){
    mobileNav.classList.remove('open')
});