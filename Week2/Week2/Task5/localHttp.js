const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Welcome to YouTube Music\n');
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});
