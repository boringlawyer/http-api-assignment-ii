const http = require('http');
const fs = require('fs');
const url = require('url');
const fileHandler = require('./fileHandler');
const userHandler = require('./userHandler');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    switch(url.parse(request.url, true).pathname) {
        case '/':
            fileHandler.getIndex(request, response);
            break;
        case '/style.css':
            fileHandler.getStyle(request, response);
            break;
        case '/getUsers':
            userHandler.getUsers(request, response);
            break;
    }
}

http.createServer(onRequest).listen(port);