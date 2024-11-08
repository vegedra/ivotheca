document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const currentLanguage = document.documentElement.lang;

    // Verifica o estado do modo escuro no localStorage e aplica se necessário
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = (currentLanguage === 'en') ? "☀️ Light Mode" : "🌙 Modo Claro";
    } else {
        darkModeToggle.textContent = (currentLanguage === 'en') ? "🌙 Dark Mode" : "☀️ Modo Escuro";
    }

    // Alternância do modo escuro
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDarkModeActive = document.body.classList.contains("dark-mode");

        // Armazena o estado do modo escuro no localStorage
        localStorage.setItem('darkMode', isDarkModeActive);

        // Atualiza o texto do botão com base no idioma e no modo
        darkModeToggle.textContent = isDarkModeActive
            ? (currentLanguage === 'en' ? "☀️ Light Mode" : "🌙 Modo Claro")
            : (currentLanguage === 'en' ? "🌙 Dark Mode" : "☀️ Modo Escuro");
    });
});
