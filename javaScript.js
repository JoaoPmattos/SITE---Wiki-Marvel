document.addEventListener('DOMContentLoaded', () => {

    /* =================================================
       1. CARROSSEL PRINCIPAL (TOPO DA PÁGINA)
       ================================================= */
    const initMainCarousel = () => {
        const slides = Array.from(document.querySelectorAll('.carrossel-track .slide'));
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        const dotsContainer = document.querySelector('.carousel-indicators');

        // Se não encontrar os elementos, sai da função para não dar erro
        if (!slides.length || !nextButton || !prevButton) return;

        let currentIndex = 0;
        let autoSlideInterval;

        // --- Criação das Bolinhas (Indicadores) ---
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (index === 0) dot.classList.add('active');

            // Clique na bolinha
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval(); // Reinicia o tempo do automático
            });
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(document.querySelectorAll('.indicator'));

        // --- Função para mudar o slide ---
        const goToSlide = (index) => {
            // Remove a classe 'active' do slide e da bolinha atual
            slides[currentIndex].classList.remove('active');
            if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

            // Calcula o novo índice (com looping infinito)
            if (index < 0) {
                currentIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            // Adiciona a classe 'active' no novo slide e bolinha
            slides[currentIndex].classList.add('active');
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        };

        // --- Eventos dos Botões ---
        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetInterval();
        });

        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetInterval();
        });

        // --- Slide Automático (5 segundos) ---
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        };

        const resetInterval = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        // Inicia o automático
        startAutoSlide();
    };


    /* =================================================
       2. CARROSSEL DE PERSONAGENS (DENTRO DO CARD)
       ================================================= */
    const initCharCarousel = () => {
        // Seletores específicos para o carrossel de personagens
        const slides = Array.from(document.querySelectorAll('.char-slide'));
        const nextButton = document.querySelector('.char-next');
        const prevButton = document.querySelector('.char-prev');

        if (!slides.length || !nextButton || !prevButton) return;

        let currentIndex = 0;
        let autoSlideInterval;

        // --- Função para mudar o slide (mais simples, sem bolinhas) ---
        const goToSlide = (index) => {
            slides[currentIndex].classList.remove('active');

            if (index < 0) currentIndex = slides.length - 1;
            else if (index >= slides.length) currentIndex = 0;
            else currentIndex = index;

            slides[currentIndex].classList.add('active');
        };

        // --- Eventos dos Botões ---
        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetInterval();
        });

        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetInterval();
        });

        // --- Slide Automático (um pouco mais rápido: 4 segundos) ---
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 4000);
        };

        const resetInterval = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        startAutoSlide();
    };


    /* =================================================
       3. LÓGICA DE DARK/LIGHT MODE
       ================================================= */
    const initThemeToggle = () => {
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const body = document.body;

        if (!themeToggleBtn || !themeIcon) return; // Segurança

        // Verifica se o usuário já tinha escolhido um tema antes
        const currentTheme = localStorage.getItem('theme');

        // Se salvou "light", aplica o tema e muda o ícone para Sol
        if (currentTheme === 'light') {
            body.classList.add('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que a página suba ao clicar no link #

            // Alterna a classe no body
            body.classList.toggle('light-theme');

            // Lógica de troca de ícone e salvamento
            if (body.classList.contains('light-theme')) {
                // Mudou para CLARO
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light'); // Salva preferência
            } else {
                // Mudou para ESCURO
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark'); // Salva preferência
            }
        });
    };

    // =================================================
    // INICIALIZAÇÃO DE TUDO
    // =================================================
    initMainCarousel();
    initCharCarousel();
    initThemeToggle();
});