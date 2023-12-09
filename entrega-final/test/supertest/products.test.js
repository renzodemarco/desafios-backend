import env from '../../src/config/env.config.js'
import { expect } from 'chai'
import supertest from 'supertest'

const requester = supertest(`http://localhost:${env.PORT}/api`)

describe("Testeando un flujo de operaciones para Products...", () => {
    let cookie
    let prodId

    it("Debería iniciar sesión el admin", async () => {
        const data = { email: 'admincoder@coder.com', password: 'adminCod3r123' }
        const response = await requester.post('/auth/login').send(data)
        const { headers } = response 
        const token = headers["set-cookie"][0]
        cookie = {
            name: token.split("=")[0],
            value: token.split("=")[1]
        }
        expect(cookie.name).to.be.equals("accessToken")
        expect(cookie.value).to.be.ok
    })

    it("Debería leer todos los productos", async () => {
        const response = await requester.get('/products')
        const { _body, statusCode } = response
        expect(statusCode).to.be.equals(200)
        expect(_body.docs).to.be.an('array')
    })

    it("Debería crear un producto", async () => {
        const data = { title: "Producto", description: "Descripción", year: 2023, price: 100, code: "abcdef", stock: 10, category: 'pop' }
        const response = await requester.post('/products').send(data).set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body, statusCode } = response
        prodId = _body._id
        expect(statusCode).to.be.equals(201)
    })

    it("Debería leer el producto creado", async () => {
        const response = await requester.get(`/products/${prodId}`)
        const { _body, statusCode } = response
        expect(statusCode).to.be.equals(200)
        expect(_body.title).to.be.equals("Producto")
        expect(_body.price).to.be.equals(100)
    })

    it("Debería actualizar el producto creado", async () => {
        const data = { title: "Producto actualizado", price: 120 }
        const response = await requester.put(`/products/${prodId}`).send(data).set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body, statusCode } = response
        expect(statusCode).to.be.equals(200)
        expect(_body.title).to.be.equals("Producto actualizado")
        expect(_body.price).to.be.equals(120)
    })

    it("Debería eliminar el producto creado", async () => {
        const response = await requester.delete(`/products/${prodId}`).set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body, statusCode } = response
        expect(statusCode).to.be.equals(200)
        expect(_body.year).to.be.equals(2023)
    })

})
