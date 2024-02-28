const http = require("http")

app = require("./app")

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Listening port ${PORT}`)
})