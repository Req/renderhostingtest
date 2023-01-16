import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// GLOBAL MIDDLEWARE
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
)

app.use(cookieParser())

app.use((req, res) => {
  res.send("potato")
})

const port = process.env.PORT || 5000
const server = app.listen(port, () => console.log("Listening on port: " + port))

process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...")
  console.log(err)
  server.close(() => {
    process.exit(1)
  })
})
