async function loadHTML(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        document.getElementById(id).innerHTML = data;
    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

loadHTML('navbar', 'navbar.html');
loadHTML('hero', 'hero.html');
loadHTML('sidebar', 'sidebar.html');
loadHTML('footer', 'footer.html');

async function loadMainContent(page) {
    const contentMap = {
        'alerts': '../examples/components/alerts.html',
        'buttons': 'components/buttons.html',
        'cards': 'components/cards.html'
    };

    const contentFile = contentMap[page] || 'default-content.html';

    try {
        const response = await fetch(contentFile);
        const content = await response.text();
        document.getElementById('main-content').innerHTML = content;
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

loadMainContent('alerts');

// Search input functionality
document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const links = document.querySelectorAll('.sidebar a');

    links.forEach(link => {
        const text = link.textContent.toLowerCase();
        link.classList.toggle('hidden', !text.includes(query));
    });
});

// Handling DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // Close alert functionality
    document.querySelectorAll('.zc-alert-close').forEach(button => {
        button.addEventListener('click', () => {
            const alert = button.parentElement;
            alert.style.animation = "fadeOut 0.3s ease-in-out";
            setTimeout(() => alert.remove(), 300);
        });
    });

    // Copy-to-clipboard functionality
    const copyIcon = document.getElementById('copy-icon');
    const codeSnippet = document.getElementById('css-snippet');
    const copyStatus = document.getElementById('copy-status');

    if (copyIcon && codeSnippet) {
        copyIcon.addEventListener('click', async () => {
            try {
                const codeContent = codeSnippet.innerText.trim();
                await navigator.clipboard.writeText(codeContent);
                copyIcon.classList.replace('fa-copy', 'fa-check');
                copyStatus.innerText = "Code copied!";
                copyStatus.style.color = "#28a745";

                setTimeout(() => {
                    copyIcon.classList.replace('fa-check', 'fa-copy');
                    copyStatus.innerText = "";
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code: ', err);
                copyStatus.innerText = "Failed to copy!";
                copyStatus.style.color = "#dc3545";
            }
        });
    }
});
