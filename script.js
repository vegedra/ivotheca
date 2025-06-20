document.addEventListener("DOMContentLoaded", () => {
  const currentLanguage = document.documentElement.lang;

  // Carrega header e footer, depois remove classe "oculto" do body
  Promise.all([
    fetch("/header.html").then(res => res.text()),
    fetch("/footer.html").then(res => res.text())
  ]).then(([header, footer]) => {
    document.getElementById("header").innerHTML = header;
    document.getElementById("footer").innerHTML = footer;
    document.body.classList.remove("oculto");
    window.scrollTo(0, 0);

    // Agora que o header está no DOM, podemos configurar o botão de modo escuro
    const darkModeToggle = document.getElementById("darkModeToggle");
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      if (darkModeToggle) {
        darkModeToggle.textContent = (currentLanguage === 'en') ? "☀️ Light Mode" : "☀️ Modo Claro";
      }
    } else {
      if (darkModeToggle) {
        darkModeToggle.textContent = (currentLanguage === 'en') ? "🌙 Dark Mode" : "🌙 Modo Escuro";
      }
    }

    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDarkModeActive = document.body.classList.contains("dark-mode");
        localStorage.setItem('darkMode', isDarkModeActive);
        darkModeToggle.textContent = isDarkModeActive
          ? (currentLanguage === 'en' ? "☀️ Light Mode" : "☀️ Modo Claro")
          : (currentLanguage === 'en' ? "🌙 Dark Mode" : "🌙 Modo Escuro");
      });
    }
  });

  // Ajusta o iframe do widget
  const iframe = document.querySelector('.widget-iframe-container iframe');
  if (iframe) {
    iframe.onload = function () {
      this.style.height = (this.contentWindow.document.body.scrollHeight + 20) + 'px';
    };
    window.addEventListener('resize', function () {
      iframe.style.height = (iframe.contentWindow.document.body.scrollHeight + 20) + 'px';
    });
  }
});
