const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const config = require('config');

const perPage = config.get("perPage");
const imageType = config.get("imageType");

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    const q = req.query.q;
    const page = req.query.page;

    
    const api = `${process.env.PX_API_ROOTURL}/?key=${process.env.PX_API_KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=${imageType}`;
    console.log('api: ', api);

    axios.get(api)
        .then((response) => {
            console.log(response);
            res.json(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port, () => console.log(`Server is running on ${port}`))