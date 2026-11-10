(() => {
  const languages = window.PORTFOLIO_LANGUAGES || {};
  const languageKey = "portfolio-language";
  const initialLanguage = localStorage.getItem(languageKey);
  const supportedLanguage = language => Object.hasOwn(languages, language);
  const defaultLanguage = window.PORTFOLIO_CONFIG?.languages_default;
  let currentLanguage = supportedLanguage(initialLanguage)
    ? initialLanguage
    : supportedLanguage(defaultLanguage) ? defaultLanguage : "en";

  const applyLanguage = language => {
    if (!supportedLanguage(language)) return;
    currentLanguage = language;
    localStorage.setItem(languageKey, language);

    const dictionary = languages[language];
    const page = document.body.dataset.page;
    document.documentElement.lang = language;
    document.title = dictionary.pages[page] || dictionary.title;
    const description = dictionary.descriptions?.[page];
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const value = dictionary.strings[element.dataset.i18n];
      if (value !== undefined) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
      const value = dictionary.strings[element.dataset.i18nAriaLabel];
      if (value !== undefined) element.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-i18n-content]").forEach(element => {
      const value = dictionary.strings[element.dataset.i18nContent];
      if (value !== undefined) element.setAttribute("content", value);
    });
    const projectDescription = dictionary.strings.projectImages?.[page]?.description;
    document.querySelectorAll("[data-i18n-project-description]").forEach(element => {
      if (projectDescription) element.textContent = projectDescription;
    });
    document.querySelectorAll("[data-language]").forEach(button => {
      const selected = button.dataset.language === language;
      button.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll("[data-current-language]").forEach(element => {
      element.textContent = language.toUpperCase();
    });
    document.dispatchEvent(new CustomEvent("portfolio-language-change", { detail: { language } }));
  };

  window.PORTFOLIO_I18N = {
    get language() {
      return currentLanguage;
    },
    text(key) {
      return languages[currentLanguage].strings[key];
    },
    item(group, title, field, fallback) {
      return languages[currentLanguage].strings[group]?.[title]?.[field] ?? fallback;
    },
    apply: applyLanguage
  };

  document.querySelectorAll("[data-language]").forEach(button => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.language);
      const menu = button.closest("[data-language-menu]");
      if (menu) {
        menu.hidden = true;
        menu.previousElementSibling.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.querySelectorAll("[data-language-toggle]").forEach(button => {
    button.addEventListener("click", () => {
      const menu = button.nextElementSibling;
      menu.hidden = !menu.hidden;
      button.setAttribute("aria-expanded", String(!menu.hidden));
    });
  });
  document.addEventListener("click", event => {
    if (!(event.target instanceof Element) || event.target.closest(".language-switch")) return;
    document.querySelectorAll("[data-language-menu]:not([hidden])").forEach(menu => {
      menu.hidden = true;
      menu.previousElementSibling.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    document.querySelectorAll("[data-language-menu]:not([hidden])").forEach(menu => {
      menu.hidden = true;
      menu.previousElementSibling.setAttribute("aria-expanded", "false");
    });
  });
  applyLanguage(currentLanguage);
})();
