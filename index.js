import express from "express"
const app = express()

app.get("/", (req, res) => {
  res.send("hej")
})

app.listen(3000, () => {
  console.log(`tjenare hejsan http://localhost:3000`)
})
