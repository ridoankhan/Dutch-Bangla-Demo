const express = require('express');
const path = require('path');


class App {

    constructor() {
        this.app = express();
        this.configure();
    }

    
    configure() {
        this.app.use(express.static("public"));

    }

    getApp() {
        return this.app;
    }

}

module.exports = App;