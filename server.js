const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/", (req, res) => {
      const actualPage = "/index";
      app.render(req, res, actualPage);
    });

    server.get("/aboutUs", (req, res) => {
      const actualPage = "/aboutUs";
      app.render(req, res, actualPage);
    });
    server.get("/ads", (req, res) => {
      const actualPage = "/ads";
      app.render(req, res, actualPage);
    });
    server.get("/helpCenter", (req, res) => {
      const actualPage = "/helpCenter";
      app.render(req, res, actualPage);
    });
    server.get("/privacy", (req, res) => {
      const actualPage = "/privacy";
      app.render(req, res, actualPage);
    });
    server.get("/support", (req, res) => {
      const actualPage = "/support";
      app.render(req, res, actualPage);
    });
    server.get("/terminalboard", (req, res) => {
      const actualPage = "/terminalboard";
      app.render(req, res, actualPage);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(5000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:5000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
