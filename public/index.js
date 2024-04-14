"use strict";
const header = document.getElementById('header');
const main = document.getElementById('main');
const mainStartOffset = (main === null || main === void 0 ? void 0 : main.offsetHeight) || 0;
const toTop = document.getElementById('to-top');
toTop.addEventListener('click', (e) => {
    window.location.hash = "";
    main === null || main === void 0 ? void 0 : main.scrollTo(0, 0);
});
if (main && header) {
    main.addEventListener('scroll', (e) => {
        let scrollPos = (e.target).scrollTop;
        if (scrollPos > (mainStartOffset / 2)) {
            if (header.className === 'home') {
                header.className = '';
            }
        }
        else {
            if (header.className !== 'home') {
                header.className = 'home';
            }
        }
    });
}
document.querySelectorAll('a[href*="#"]').forEach((e) => {
    const target = e;
    target.addEventListener('click', (e) => {
        const hash = target.hash;
        const hashTarget = document.querySelector(hash);
        if (hashTarget) {
            e.preventDefault();
            window.location.hash = hash;
            setTimeout(() => {
                main === null || main === void 0 ? void 0 : main.scrollTo(0, (hashTarget.offsetTop - (100 + 10)));
            }, 10);
        }
    });
});
