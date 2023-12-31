const http = require('http')
const fetch = require("node-fetch")

http.createServer(async function (req, res) {
    if (req.method == 'POST') {
        var body = ''

        req.on('data', function (data) {
            body += data
        });

        req.on('end', async function () {
            console.log("Body:", body)

            if (body.slice(0,39) != "https://api.coingecko.com/api/v3/coins/" && body.slice(0,35) != "https://api.coinbase.com/v2/prices/") {
                res.end()
                return
            }

            res.write(JSON.stringify(await (await fetch(body)).json()))
            res.end()
        });
    }
    if (req.method == 'GET') {
        res.write("Hola!")
        res.end()
    }
}).listen(process.env.PORT)
console.log("Port:", process.env.PORT)
