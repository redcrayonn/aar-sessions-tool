const express = require('express')
const config = require('config')
const axios = require('axios')
const app = express()
const port = 3000

const token = config.get('token');

app.get('/', (req, res) => {
    let start = req.query.start;
    let stop = req.query.stop;
    res.setHeader('Content-Type', 'application/json');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // for all requests
    axios
        .get(`https://api.battlemetrics.com/servers/1611557/relationships/sessions?start=${start}&stop=${stop}`)
        .then(response => { console.log('success: ' + response.data.data); res.send(response.data.data); console.log('success: ' + response.data.data);})
        .catch(response => { console.log('failure: ' + response.data.data)})
    }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
