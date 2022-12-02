const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv');

const app = express();
env.config();

const db = require('./config/config');
const allRoutes = require('./routes/index.router');

const PORT = process.env.PORT || 3000

app.use(allRoutes)
app.use(bodyParser.json({
    limit: '30mb', 
    extended: true
  })
);
app.use(bodyParser.urlencoded({ 
    limit: '30mb', 
    extended: true 
  })
);
app.use(cors());
// app.use(express.json())


db
  .then(() => app.listen(PORT, () => 
    console.log("server running on port " + PORT)
    ))
  .catch((error) => 
    console.log(`${error.message} didn't connect`)
    );