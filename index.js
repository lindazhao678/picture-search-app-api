const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const config= require('config');

const pxApiRootURL = config.get("pxApiRootURL");
const pxApiKey= config.get("pxApiKey");
const perPage = config.get("perPage");
const imageType = config.get("imageType");

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    const api = `${pxApiRootURL}/?key=${pxApiKey}&per_page=${perPage}&image_type=${imageType}`;
    axios.get(api)
    .then((response) => {
        res.json(response.data)
    })
    .catch((err) => {
        console.log(err)
    })
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, () => console.log(`Server is running on ${port}`))