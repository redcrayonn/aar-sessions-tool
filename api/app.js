const express = require('express')
const config = require('config')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 3000

const bmToken = config.get('bmToken');
const cavToken = config.get('cavToken');

// Fuck you, cors.
app.use(cors())

// Get battlemetrics users
app.get('/bm/:serverid/sessions', (req, res) => {
    let start = req.query.start;
    let stop = req.query.stop;
    let serverId = req.params.serverid;
    res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    axios.defaults.headers.common['Authorization'] = `Bearer ${bmToken}`; // for all requests
    axios
        .get(`https://api.battlemetrics.com/servers/${serverId}/relationships/sessions?start=${start}&stop=${stop}`)
        .then(response => { console.log('success: ' + response.data.data); res.send(response.data.data); console.log('success: ' + response.data.data);})
        .catch(response => { console.log('failure: ' + response)})
    }
)

// Get active cav users
app.get('/cav/active', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    axios.defaults.headers.common['Authorization'] = `Bearer ${cavToken}`; // for all requests
    axios
      .get(`https://api.7cav.us/v1/users/active`)
      .then(response => { res.send(response.data.data.users); })
      .catch(response => { console.log('failure: ' + response) });
    }
)

// Get cav servers
app.get('/bm/servers', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    axios.defaults.headers.common['Authorization'] = `Bearer ${bmToken}`; // for all requests
    axios
      .get(`https://api.battlemetrics.com/servers?filter[rcon]=true`)
      .then(response => { res.send(response.data.data); console.log(response);})
      .catch(response => { console.log('failure: ' + response) });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


