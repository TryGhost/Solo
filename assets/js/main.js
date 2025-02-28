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
    var addAnchors = () => {
        var headings = document.querySelectorAll('.gh-content h1, .gh-content h2, .gh-content h3, .gh-content h4, .gh-content h5, .gh-content h6')
        headings.forEach((heading) => {
            heading.insertAdjacentHTML('beforeend', `
                <button class="anchor-link" aria-label="Copy link to this section">
                    <svg width="1em" height="0.85em" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                </button>
            `)

            const anchor = heading.querySelector('.anchor-link');
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const url = new URL(window.location.href);
                url.hash = heading.id;
                
                // Try modern clipboard API first
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url.toString())
                        .then(() => {
                            showCopiedFeedback(anchor);
                        })
                        .catch(() => {
                            // Fallback for clipboard API failure
                            fallbackCopy(url.toString(), anchor);
                        });
                } else {
                    // Fallback for browsers without clipboard API
                    fallbackCopy(url.toString(), anchor);
                }
            });
        });
    }

    function showCopiedFeedback(element) {
        element.classList.add('copied');
        // For screen readers
        element.setAttribute('aria-label', 'Link copied to clipboard');
        
        setTimeout(() => {
            element.classList.remove('copied');
            element.setAttribute('aria-label', 'Copy link to this section');
        }, 2000);
    }

    function fallbackCopy(text, element) {
        // Create temporary input
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';  // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        
        // Handle iOS devices
        if (navigator.userAgent.match(/ipad|iphone/i)) {
            textArea.contentEditable = true;
            textArea.readOnly = true;
            const range = document.createRange();
            range.selectNodeContents(textArea);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }

        try {
            document.execCommand('copy');
            showCopiedFeedback(element);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }

        document.body.removeChild(textArea);
    }

    document.addEventListener('DOMContentLoaded', addAnchors)
})(window, document);
