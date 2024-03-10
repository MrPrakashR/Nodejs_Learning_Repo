const http = require("http")

// Network operation uses main thread
// except for dns
const server = http.createServer(
    (_,res) => {
        console.log("request received") 
        // When once request is under process other request will not to be taken because of single thread of javascript.
        while(1); // This will occupy complete stack so no response will be return 
        res.end("hello\b\n")
    }
)
server.listen(1337)
console.log("Server is listning on 1337")