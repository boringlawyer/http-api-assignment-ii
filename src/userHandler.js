const users = {};

const getUsers = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(users));
  response.end();
};

const getNotReal = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.write('{"id": "notFound", "message": "This is not the page you are looking for"}');
  response.end();
};

// with a little help from https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
const addUser = (request, response) => {
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    const pairs = body.split('&');
    const newEntry = {};
    // for (const p of pairs) {
    for (let i = 0; i < pairs.length; ++i) {
      const [key, value] = pairs[i].split('=');
      newEntry[key] = value;
    }
    if (!newEntry.name || !newEntry.age) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.write('{"id": "missingParams", "message": "Name and age are both required"}');
      response.end();
      return;
    }
    if (users[newEntry.name] && newEntry.age) {
      users[newEntry.name] = newEntry;
      response.writeHead(204);
      response.end();
    } else {
      users[newEntry.name] = newEntry;
      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.write('{"message": "Created successfully"}');
      response.end();
    }
  });
};

module.exports = {
  getUsers,
  getNotReal,
  addUser,
};
