const App = require('./app.js');
const http = require('http');


class Server {

    constructor() {
        this.app = new App();
        this.port = process.env.PORT;
    }

    createServer() {
        this.server = http.createServer(this.app.getApp());
    }

    startListening() {
        this.server.listen(this.port, () => console.log(`Uni Authority user interface is running on: http://localhost:${this.port}`));
    }
}

const server = new Server();
server.createServer();
server.startListening();