const http = require("http")

// Network operation uses main thread
// except for dns
const server = http.createServer(
    (_,res) => res.end("hello\b\n")
)
server.listen(1337)
console.log("Server is listning on 1337")