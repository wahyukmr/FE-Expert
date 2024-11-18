import "regenerator-runtime"; /* for async await transpile */
import "../assets/styles/main.scss";
import "../components/index.js";
import "../layouts/index.js";
import AppController from "./controllers/appController.js";

document.addEventListener("DOMContentLoaded", () => {
  const skipToContent = document.querySelector(".skip-to-content");
  const main = document.querySelector("main-component").shadowRoot.querySelector("main");

  skipToContent.addEventListener("click", (e) => {
    e.preventDefault();
    main.focus();
    main.scrollIntoView({ behavior: "smooth" });
  });

  new AppController();
});
