function initParallax() {
    jarallax(document.querySelectorAll('.has-parallax-feed .gh-card'), {
        speed: 0.8,
    });
}

(function () {
    if (!document.body.classList.contains('has-background-about')) return;

    const about = document.querySelector('.gh-about');
    if (!about) return;

    const image = about.querySelector('.gh-about-image');

    if (!image.naturalWidth) {
        imagesLoaded(image, function () {
            about.style.setProperty('--about-height', image.clientWidth * image.naturalHeight / image.naturalWidth + 'px');
        });
    }
})();

(function () {
    initParallax();
})();

(function () {
    const toggle = document.querySelector('[data-toggle-comments]');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
        document.body.classList.toggle('comments-opened');
    });
})();

(function () {
    const element = document.querySelector('.gh-article-excerpt');
    if (!element) return;

    let text = element.textContent;
    const emojiRE = /\p{EPres}|\p{ExtPict}/gu;

    const emojis = text.match(emojiRE);
    if (!emojis) return;

    emojis.forEach(function (emoji) {
        text = text.replace(emoji, `<span class="emoji">${emoji}</span>`);
    });

    element.innerHTML = text;
})();

(function () {
    pagination(true, initParallax);
})();

(function (window, document) {
    const TOOLTIP_TEXTS = {
        default: 'Copy link to this section',
        copied: 'Link copied!'
    };

    var addAnchors = () => {
        var headings = document.querySelectorAll('.gh-content h1, .gh-content h2, .gh-content h3, .gh-content h4, .gh-content h5, .gh-content h6')
        headings.forEach((heading) => {
            heading.insertAdjacentHTML('beforeend', `
                <button class="anchor-link" 
                    aria-label="${TOOLTIP_TEXTS.default}"
                    data-tooltip="${TOOLTIP_TEXTS.default}"
                    data-tooltip-copied="${TOOLTIP_TEXTS.copied}">
                    <svg width="1em" height="0.85em" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                </button>
            `)

            const anchor = heading.querySelector('.anchor-link');
            anchor.addEventListener('click', async (e) => {
                e.preventDefault();
                const url = new URL(window.location.href);
                url.hash = heading.id;
                
                try {
                    await navigator.clipboard.writeText(url.toString());
                    showCopiedFeedback(anchor);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    anchor.setAttribute('aria-label', 'Failed to copy link');
                }
            });
        });
    }

    function showCopiedFeedback(element) {
        element.classList.add('copied');
        element.setAttribute('aria-label', TOOLTIP_TEXTS.copied);
        element.setAttribute('data-tooltip', TOOLTIP_TEXTS.copied);
        
        setTimeout(() => {
            element.classList.remove('copied');
            element.setAttribute('aria-label', TOOLTIP_TEXTS.default);
            element.setAttribute('data-tooltip', TOOLTIP_TEXTS.default);
        }, 2000);
    }

    document.addEventListener('DOMContentLoaded', addAnchors)
})(window, document);
