import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
    // Add Splide JS (already done in your original code)
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js';
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css';
    document.head.appendChild(link);

    const carousel = document.createElement('div');
    carousel.className = 'splide';

    const track = document.createElement('div');
    track.className = 'splide__track';

    const ul = document.createElement('ul');
    ul.className = 'splide__list';

    [...block.children].forEach((row) => {
        const parts = row.querySelectorAll(':scope > div');
        const desktopDiv = parts[0];
        const mobileDiv = parts[1];
        const linkDiv = parts[2];

        const desktopPic = desktopDiv?.querySelector('picture');
        const mobilePic = mobileDiv?.querySelector('picture');
        const link = linkDiv?.querySelector('a');

        const li = document.createElement('li');
        li.className = 'splide__slide';

        const desktopBanner = document.createElement('div');
        desktopBanner.className = 'desktop-banner';
        if (desktopPic && link) {
            const desktopLink = link.cloneNode(true);
            desktopLink.innerHTML = '';
            desktopLink.appendChild(createOptimizedPicture(
                desktopPic.querySelector('img').src,
                desktopPic.querySelector('img').alt || '',
                false,
                [{ width: '750' }]
            ));
            desktopBanner.appendChild(desktopLink);
        }

        const mobileBanner = document.createElement('div');
        mobileBanner.className = 'mobile-banner';
        if (mobilePic && link) {
            const mobileLink = link.cloneNode(true);
            mobileLink.innerHTML = '';
            mobileLink.appendChild(createOptimizedPicture(
                mobilePic.querySelector('img').src,
                mobilePic.querySelector('img').alt || '',
                false,
                [{ width: '750' }]
            ));
            mobileBanner.appendChild(mobileLink);
        }

        li.appendChild(desktopBanner);
        li.appendChild(mobileBanner);
        ul.appendChild(li);
    });

    block.innerHTML = '';
    track.appendChild(ul);
    carousel.appendChild(track);
    block.appendChild(carousel);

    script.onload = () => {
        new Splide(carousel, {
            type: 'slide',
            perPage: 1,
            perMove: 1,
            pagination: true,
            arrows: false,
            height: '25rem',
            autoplay: true,
            breakpoints: {
                768: {
                    height: '30rem',
                },
            },
        }).mount();
    };
}
