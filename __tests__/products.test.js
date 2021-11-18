require("jest")
import request from "supertest"

describe("products", () => {
  it("get products", async () => {
    const res = await request.get("/products")
  })
})
