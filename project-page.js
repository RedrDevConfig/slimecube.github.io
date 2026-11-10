(() => {
  const config = window.PORTFOLIO_CONFIG || {};
  document.querySelectorAll("[data-site-name]").forEach(element => {
    element.textContent = config.siteName || "SLIMECUBE";
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  menuButton?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  const images = [...document.querySelectorAll(".detail-images img")];
  const count = document.querySelector("[data-capture-count]");
  const label = document.querySelector("[data-capture-label]");
  if (!count) return;

  const updateCaptureLabel = () => {
    if (!label) return;
    label.textContent = window.PORTFOLIO_I18N.text(Number(count.textContent) === 1 ? "capture" : "captures");
  };
  document.addEventListener("portfolio-language-change", updateCaptureLabel);
  updateCaptureLabel();

  Promise.all(images.map(image => new Promise(resolve => {
    const finish = () => resolve(image.naturalWidth > 0);
    if (image.complete) {
      finish();
      return;
    }

    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
    image.loading = "eager";
  }))).then(loadedImages => {
    images.forEach((image, index) => {
      if (!loadedImages[index]) image.remove();
    });
    const total = loadedImages.filter(Boolean).length;
    count.textContent = total;
    updateCaptureLabel();
  });
})();
