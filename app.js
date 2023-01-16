import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
)
app.use(cookieParser())

app.use((req, res) => {
  console.log(req.cookies)
  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  }
  res.cookie("cooki", "I am a horse"+Math.round(Math.random()*10000), cookieOptions)
  res.send("potato, " + JSON.stringify(req.cookies))
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
