document.addEventListener("DOMContentLoaded", () => {
    // Alternância do modo escuro
    const darkModeToggle = document.getElementById("darkModeToggle");
    var currentLanguage = document.documentElement.lang;

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Atualiza o texto do botão com base no idioma e no modo
        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.textContent = (currentLanguage === 'en') ? "☀️ Light Mode" : "🌙 Modo Claro";
        } else {
            darkModeToggle.textContent = (currentLanguage === 'en') ? "🌙 Dark Mode" : "☀️ Modo Escuro";
        }
    });

    // Define o texto inicial do botão com base no idioma atual
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = (currentLanguage === 'en') ? "☀️ Light Mode" : "🌙 Modo Claro";
    } else {
        darkModeToggle.textContent = (currentLanguage === 'en') ? "🌙 Dark Mode" : "☀️ Modo Escuro";
    }
});