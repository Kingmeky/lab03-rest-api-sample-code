let SERVER_NAME = 'product-api'
let PORT = 5000;
let HOST = '127.0.0.1';

let getCounter = 0;
let postCounter = 0;

let errors = require('restify-errors');
let restify = require('restify')


  // Getting persistence engine for the products
  , productsSave = require('save')('products')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('**** Resources: ****')
  console.log('********************')
  console.log(' /products')
  console.log(' /products/:id')  
})

server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());



