require('newrelic');
const express = require('express');
const httpProxy = require('http-proxy');
const PORT = process.env.PORT || 8080;

const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://htlin.io';  //serves mortgage calculator
const serverTwo = 'http://sdcloadbalancer-369030579.us-east-1.elb.amazonaws.com';  //serves home description
const serverThree = 'http://13.56.254.51'; //serves nearby homes
const serverFour = 'http://ec2-18-219-60-186.us-east-2.compute.amazonaws.com'; //serves image carousel
const app = express();

app.use('/homes/:id', express.static('./public'));

app.all('/homes/:id/prices', function (req, res) {
  apiProxy.web(req, res, { target: serverOne });
});

app.all('/homes/:index/detail-information', function(req, res) {
  apiProxy.web(req, res, {target: serverTwo});
// });

app.all('/homes/:id/nearbyHomes', function(req, res) {
  apiProxy.web(req, res, {target: serverThree});
});

app.all('/homes/:houseID', function(req, res) {
  apiProxy.web(req, res, {target: serverFour});
});

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

