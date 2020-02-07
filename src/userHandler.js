const url = require('url');
let users = {yee: "haw"};

const getUsers = (request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(users));
    response.end();
};

module.exports = {
    getUsers
};