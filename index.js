import http from "http"
import fs from "fs"

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const filepath = url.pathname

    fs.readFile(`.${filepath === "/" ? "/index" : filepath}.html`, (err, data) => {
        if (err) {
            fs.readFile("./404.html", (error, data) => {
                if (error) {
                    res.writeHead(404, "text/plain")
                    return res.end("404 Page not found")
                }
                res.writeHead(404, "text/html")
                res.write(data)
                return res.end(`${filepath} was not found`)
            })

        }
        if (filepath === "/404") {
            return
        }
        res.writeHead(200, { "Content-Type": "text/html" })
        return res.end(data)
    })


})


const port = 8000
server.listen(8000, () => {
    console.log(`Server running on http://localhost:${port}`)
})