import request from "supertest"
import server from "../../server"

describe("POST /api/products", () => {
    test("Should display validation errors", async () => {
        const res = await request(server).post("/api/products").send({
            
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(4)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })

    test("Should validate that the price is greater than 0", async () => {
        const res = await request(server).post("/api/products").send({
            name: "Test Product",
            price: 0
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })

    test("Should validate that the price is a number and greater than 0", async () => {
        const res = await request(server).post("/api/products").send({
            name: "Test Product",
            price: "test"
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(2)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(1)
    })

    test("Should create a new product", async () => {
        const res = await request(server).post("/api/products").send({
            name: "Test Product",
            price: 10
        })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("data")

        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)
    })
})

describe("GET /api/products", () => {
    test("Should check if api/products url exist", async () => {
        const res = await request(server).get("/api/products")

        expect(res.status).not.toBe(404)
    })

    test("GET a JSON Response with products", async () => {
        const res = await request(server).get("/api/products")

        expect(res.status).toBe(200)
        expect(res.headers["content-type"]).toMatch(/json/)
        expect(res.body).toHaveProperty("data")
        expect(res.body.data).toHaveLength(1)

        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty("errors")
    })
})

describe("GET /api/products/:id", () => {
    test("Should return a 404 response for a non-existent product", async () => {
        const productId = 10000
        const res = await request(server).get(`/api/products/${productId}`)

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("error")
        expect(res.body.error).toBe("Product not found")
    })

    test("Should check a valid ID in the URL", async () => {
        const res = await request(server).get("/api/products/not-valid-url")

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)
    })

    test("GET a JSON Response with a single product", async () => {
        const res = await request(server).get("/api/products/1")

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("data")
    })
})

describe("PUT /api/products/:id", () => {
    test("Should check a valid ID in the URL", async () => {
        const res = await request(server).put("/api/products/not-valid-url").send({
            name: "Test Product",
            price: 100,
            availability: true
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)
    })

    test("Should display validation error messages when updating a product", async () => {
        const res = await request(server).put("/api/products/1").send({})

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(5)
        expect(res.body.errors).toBeTruthy()

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
    })

    test("Should validate that the price is greater than 0", async () => {
        const res = await request(server).put("/api/products/1").send({
            name: "Test Product",
            price: 0,
            availability: true
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors[0].msg).toBe("Price must be greater than 0")

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
    })

    test("Should return a 404 response for a non-existent product", async () => {
        const productId = 10000
        const res = await request(server).put(`	/api/products/${productId}`).send({
            name: "Test Product",
            price: 100,
            availability: true
        })

        expect(res.status).toBe(404)
        expect(res.body.error).toBe("Product not found")

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
    })

    test("Should update an existing product with valid data", async () => {
        const res = await request(server).put(`	/api/products/1`).send({
            name: "Test Product",
            price: 100,
            availability: true
        })

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("data")

        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty("errors")
    })
})

describe("PATCH /api/products/:id", () => {
    test("Should check a valid ID in the URL", async () => {
        const res = await request(server).patch("/api/products/not-valid-url").send({})

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
    })

    test("Should return a 404 response for a non-existent product", async () => {
        const productId = 10000
        const res = await request(server).patch(`/api/products/${productId}`).send({})

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("error")
        expect(res.body.error).toBe("Product not found")

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
    })

    test("Should update an existing product with valid data", async () => {
        const res = await request(server).patch(`/api/products/1`).send({})

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("data")

        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty("errors")
    })
})

describe("DELETE /api/products/:id", () => {
    test("Should check a valid ID in the URL", async () => {
        const res = await request(server).delete("/api/products/not-valid-url")

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("errors")
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("Id must be a positive integer")
    })

    test("Should return a 404 response for a non-existent product", async () => {
        const productId = 10000
        const res = await request(server).delete(`/api/products/${productId}`)

        expect(res.status).toBe(404)
        expect(res.body.error).toBe("Product not found")

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty("data")
    })

    test("Should delete an existing product", async () => {
        const res = await request(server).delete(`/api/products/1`)

        expect(res.status).toBe(200)
        expect(res.body.data).toBe("Product deleted")

        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty("errors")
    })
})