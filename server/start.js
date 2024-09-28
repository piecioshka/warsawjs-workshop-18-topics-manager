const PATH = "server/database.json";
const PORT = process.env.PORT || 2095;

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(PATH);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(PORT, function () {
    console.log(`JSON Server is running. http://localhost:${PORT}`);
});
