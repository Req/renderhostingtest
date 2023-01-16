import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// Cookie handling test
app.use(cors({ origin: "https://testrender-fe.onrender.com", credentials: true }))
app.use(cookieParser())
app.use((req, res) => {
  console.log(req.cookies)
  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  }
  if (!req.cookies.session) {
    res.cookie("session", "sessid_" + Date.now(), cookieOptions)
    res.send("Welcome!")
  } else {
    res.send("Welcome back agent " + req.cookies.session)
  }
})

// Setup
const port = process.env.PORT || 5000
const server = app.listen(port, () => console.log("Listening on port: " + port))
process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...")
  console.log(err)
  server.close(() => {
    process.exit(1)
  })
})
