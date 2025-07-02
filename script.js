document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();
    // Initialize Highlight.js
    hljs.highlightAll();

    // --- SCROLL & OBSERVER LOGIC ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    const sections = document.querySelectorAll('section[id]');
    const bottomNavLinks = document.querySelectorAll('#bottom-nav a');
    const backToTopButton = document.getElementById('back-to-top');

    const observerOptions = { rootMargin: '-40% 0px -55% 0px', threshold: 0.1 };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                bottomNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Floating Nav visibility based on footer
    const footerElement = document.querySelector('footer');
    const bottomNavElement = document.getElementById('bottom-nav');

    if (footerElement && bottomNavElement) {
        const footerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        bottomNavElement.style.transform = 'translateX(-50%) translateY(200%)';
                        bottomNavElement.style.opacity = '0';
                        backToTopButton.style.transform = 'translateY(150%)';
                    } else {
                        bottomNavElement.style.transform = 'translateX(-50%) translateY(0)';
                        bottomNavElement.style.opacity = '1';
                        if (window.scrollY > 300) {
                            backToTopButton.style.transform = 'translateY(0)';
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );
        footerObserver.observe(footerElement);
    }

    // --- Chart.js Implementations ---
    let attritionChart, reasonsChart;

    function renderCharts() {
        const textColor = '#334155';
        const gridColor = 'rgba(226, 232, 240, 0.5)';
        const chartFont = { family: 'Inter' };

        if (attritionChart) attritionChart.destroy();
        if (reasonsChart) reasonsChart.destroy();

        const attritionByDivisionData = {
            labels: ['Customer Service', 'Product Development', 'Finance', 'Sales', 'HR'],
            datasets: [{
                label: 'Tingkat Atrisi (%)',
                data: [19.93, 19.24, 19.00, 15.73, 14.14],
                backgroundColor: 'rgba(239, 68, 68, 0.6)',
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 1,
                borderRadius: 4,
            }]
        };
        attritionChart = new Chart(document.getElementById('attritionByDivisionChart'), {
            type: 'bar',
            data: attritionByDivisionData,
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { titleFont: chartFont, bodyFont: chartFont } },
                scales: {
                    x: { beginAtZero: true, grid: { color: gridColor }, ticks: { font: chartFont, color: textColor } },
                    y: { grid: { display: false }, ticks: { font: chartFont, color: textColor } }
                }
            }
        });

        const reasonsData = {
            labels: ['Workload', 'Low Salary', 'Poor Management', 'Lack of Growth', 'Personal Reasons'],
            datasets: [{
                label: 'Jumlah Kasus',
                data: [60, 50, 44, 21, 11],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.6)',
                    'rgba(234, 179, 8, 0.6)',
                    'rgba(249, 115, 22, 0.6)',
                    'rgba(139, 92, 246, 0.6)',
                    'rgba(100, 116, 139, 0.6)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(234, 179, 8, 1)',
                    'rgba(249, 115, 22, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(100, 116, 139, 1)'
                ],
                borderWidth: 1,
            }]
        };
        reasonsChart = new Chart(document.getElementById('reasonsChart'), {
            type: 'pie',
            data: reasonsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: chartFont, color: textColor }
                    }
                }
            }
        });
    }
    
    renderCharts();
});
