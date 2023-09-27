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

// Get all products in the system
server.get('/products', function (req, res, next) {
  console.log('GET /products');

  // counter code
  getCounter++;
  console.log('GET:' + getCounter, 'POST' + postCounter);

  // Find every entity within the given collection
  productsSave.find({}, function (error, products) {

    // Return all of the products in the system
    res.send(products)
  })
})

// Get a single product by their product id
server.get('/products/:id', function (req, res, next) {
  console.log('GET /products/:id params=>' + JSON.stringify(req.params));

  // Find a single product by their id within save
  productsSave.findOne({ _id: req.params.id }, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new Error(JSON.stringify(error.errors)))

    if (product) {
      // Send the product if no issues
      res.send(product)
    } else {
      // Send 404 header if the product doesn't exist
      res.send(404)
    }
  })
})

// Create a new product
server.post('/products', function (req, res, next) {
  console.log('POST /products params=>' + JSON.stringify(req.params));
  console.log('POST /products body=>' + JSON.stringify(req.body));

  let newproduct = {
    productname: req.body.name, 
    price: req.body.age,
    quantity: req.body.quantity
  }

  // Creating product using persistence engine
  productsSave.create( newproduct, function (error, product) {
    // total count for post
    postCounter++;
    console.log('GET:' + getCounter, 'POST' + postCounter);

    // If there are any errors, pass to the next
    if (error) return next(new Error(JSON.stringify(error.errors)))

    // Send the product if no issues
    res.send(201, product)
  })
})

// Update a product by their id
server.put('/products/:id', function (req, res, next) {
  console.log('POST /products params=>' + JSON.stringify(req.params));
  console.log('POST /products body=>' + JSON.stringify(req.body));
  

  let newproduct = {
    _id: req.body.id,
    productname: req.body.productname, 
    price: req.body.price,
    quantity: req.body.price
  }
  
  // Updating product with the persistence engine
  productsSave.update(newproduct, function (error, product) {
    // If there are any errors, pass them to next in the correct format
    if (error) return next(new Error(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send(200)
  })
})

// Delete product with the given id
server.del('/products', function (req, res, next) {
  console.log('DELETE /products');
  // Delete the product with the persistence engine
  productsSave.deleteMany({}, function (error) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new Error(JSON.stringify(error.errors)))

    // Send a 204 response
    res.send(204)
  })
})





