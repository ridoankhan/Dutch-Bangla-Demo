require("dotenv").config();
const http = require("http");
const App = require("./app/app.js");

const consola = require("consola");

class Server {
    constructor(params) {
        this.app = new App();
    }

    async configureServer() {
        try {
        } catch (error) {}
    }

    async startServer() {
        try {
            const isConfigured = await this.configureServer();
            this.server = http.createServer(this.app);
            this.server.listen(process.env.PORT, () => {
                consola.info(
                    `server is running at http://localhost:${process.env.PORT}`,
                );
            });
        } catch (error) {
            consola.error(error);
            this.startServer();
        }
    }
}

module.exports = Server;

const server = new Server();
server.startServer();
