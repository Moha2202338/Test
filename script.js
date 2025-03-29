let isDarkMode = true;

// تطبيق الثيم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
        isDarkMode = savedMode === 'true';
    }
    applyTheme();
});

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    applyTheme();
}

function applyTheme() {
    const root = document.documentElement;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (isDarkMode) {
        root.style.setProperty('--primary-color', '#1a2a33');
        root.style.setProperty('--secondary-color', '#2c3e50');
        root.style.setProperty('--text-color', '#fff');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
    } else {
        root.style.setProperty('--primary-color', '#f5f5f5');
        root.style.setProperty('--secondary-color', '#e0e0e0');
        root.style.setProperty('--text-color', '#333');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }
}

function showContent(contentId) {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'flex';

    setTimeout(() => {
        const contents = document.querySelectorAll('.content');
        contents.forEach(content => {
            content.classList.add('hidden');
        });

        const contentToShow = document.getElementById(contentId);
        if (contentToShow) {
            contentToShow.classList.remove('hidden');
            contentToShow.scrollIntoView({ behavior: 'smooth' });
        }

        if (loading) loading.style.display = 'none';
    }, 500);
}

function hideContent() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'flex';

    setTimeout(() => {
        const contents = document.querySelectorAll('.content');
        contents.forEach(content => {
            content.classList.add('hidden');
        });
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (loading) loading.style.display = 'none';
    }, 500);
}

function searchHadith() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const hadiths = document.querySelectorAll('.hadith');
    let found = false;

    hadiths.forEach(hadith => {
        const text = hadith.innerText.toLowerCase();
        if (text.includes(query)) {
            hadith.style.display = 'block';
            found = true;
        } else {
            hadith.style.display = 'none';
        }
    });

    if (query === '') {
        hadiths.forEach(hadith => {
            hadith.style.display = 'block';
        });
    }

    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        if (content.querySelector('.hadith')) {
            content.style.display = 'block';
        }
    });
}

// التنقل السلس للروابط الداخلية
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


