const express = require("express");

const app = express();

global.__basedir = __dirname;


app.get('/',(req, res, next)=>{
  res.status(200).send("UploadFiles_API")
  .catch(next)
 })
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:8080', 'https://khairokom33.azurewebsites.net','http://localhost:4200','http://localhost:2146','http://localhost:8888','http://localhost:8080'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});



const evokeRoutes = require("./routes/upload.route");

app.use(express.urlencoded({ 
  extended: true 
}));

evokeRoutes(app);


const port =  8888;
app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Handle error
app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error('Error occured'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

