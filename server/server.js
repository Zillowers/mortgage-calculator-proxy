const express = require('express');
const httpProxy = require('http-proxy');
const PORT = process.env.PORT || 8080;

const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://htlin.io/';  //serves mortgage calculator
// const serverTwo = 'http://localhost:3002';  //serves home description
// const serverThree = 'http://localhost:3003'; //serves nearby homes
// const serverFour = 'http://localhost:3004'; //serves image carousel

const app = express();

app.use('/homes/:id', express.static('./public'));

app.all("/api/homes/:id/prices", function (req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, { target: serverOne });
});

// app.all('/api/homes/:index/detail-information', function(req, res) {
//   console.log('redirecting to Server2');
//   apiProxy.web(req, res, {target: serverTwo});
// });

// app.all('/nearbyhomes', function(req, res) {
//   console.log('redirecting to Server3');
//   apiProxy.web(req, res, {target: serverThree});
// });

// app.all('/images/:houseID', function(req, res) {
//   console.log('redirecting to Server4');
//   apiProxy.web(req, res, {target: serverFour});
// });

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

