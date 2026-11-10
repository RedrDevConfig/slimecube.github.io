/* PERSONALIZA TU PORTFOLIO AQUÍ. No necesitas tocar script.js. */
window.PORTFOLIO_CONFIG = {
  siteName: "Home",
  owner: "SlimeCube",
  background: {
    page: "#06070a",
    commissions: "#06070a"
  },
  languages_default: "en",
  minecraftVersion: "1.21.X",
  discordUrl: "https://discord.gg/Fg8XAN8Ek6",
  twitterUrl: "https://x.com/_SlimeCube_",
  youtubeUrl: "https://www.youtube.com/@SlimeCube_Studios",
  avatar_profile: "assets/images/slime.png",

  /* Estadísticas manuales; Builds se calcula según las imágenes del portfolio. */
  stats: { clients: 1, tools: 3 },
  counterApiUrl: "https://api.counterapi.dev/v2/mauricio-salvadors-team/portfolio-visits/up",

  /* Cambia las rutas por tus imágenes. Pon tus archivos en assets/images/. */
  images: {
    hero: "assets/images/hero.jpg",
    about: "assets/images/about.jpg"
  },

  builds: [
    { title: "BoxPvP Arena", description: "Arena PvP temática para tu servidor.", image: "assets/images/boxpvp.jpg", link: "box-pvp/index.html" },
    { title: "Lobby", description: "Un punto de entrada único para tu comunidad.", image: "assets/images/lobby.jpg", link: "lobbys/index.html" },
    { title: "FullPvP Map", description: "Spawn, minas y zonas de combate.", image: "assets/images/fullpvp.jpg", link: "fullpvp/index.html" }
  ],

commissions: [
    {
        title: "Box PvP",
        description: "Una caja cerrada para pelear, con el tema que quieras. Es lo que más me piden y donde más rápido trabajo.",
        link: "box-pvp/index.html"
    },
    {
        title: "Lobby",
        description: "Es lo principal del servidor: donde caen los usuarios al ingresar por primera vez y la impresión que se llevan.",
        link: "lobbys/index.html"
    },
    {
        title: "FullPvP",
        description: "Un mundo entero de PvP: spawn, minas y zona de combate, todo en el mismo mapa.",
        link: "fullpvp/index.html"
    }
],

  buildPages: [
    { title: "BoxPvP", description: "Arenas PvP personalizadas para tu servidor.", image: "assets/images/boxpvp.png", link: "box-pvp/index.html" },
    { title: "Lobbys", description: "Spawns y lobbies diseñados para tu comunidad.", image: "assets/images/lobby.png", link: "lobbys/index.html" },
    { title: "FullPvP", description: "Mapas de combate, minas y zonas personalizadas.", image: "assets/images/fullpvp.png", link: "fullpvp/index.html" }
  ]
};

document.documentElement.style.setProperty("--page-background", window.PORTFOLIO_CONFIG.background.page);
document.documentElement.style.setProperty("--commissions-background", window.PORTFOLIO_CONFIG.background.commissions);