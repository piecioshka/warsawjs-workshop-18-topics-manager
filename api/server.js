require("dotenv").config();

const path = require("path");
const PORT = process.env.PORT || 2095;
const PATH = path.join(__dirname, "database.json");

const jsonServer = require("json-server");
const app = jsonServer.create();

// Middleware: static files
const middlewares = jsonServer.defaults({
    static: path.join(__dirname, "..", "dist"),
});

app.use(middlewares);

// Middleware: rewrite paths
const rewriter = jsonServer.rewriter({
    "/api/*": "/$1",
});
app.use(rewriter);

// Middleware: router
const router = jsonServer.router(PATH);
app.use(router);

app.listen(PORT, function () {
    console.log(`JSON Server is running at http://localhost:${PORT}`);
});

module.exports = app;
