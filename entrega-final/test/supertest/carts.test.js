import env from '../../src/config/env.config.js'
import { expect } from 'chai'
import supertest from 'supertest'

const requester = supertest(`http://localhost:${env.PORT}/api`)

describe("Testeando un flujo de operaciones para Carts...", () => {
    let cookie
    let cartId

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

    it("Debería leer todos los carritos", async () => {
        const response = await requester.get('/carts/all').set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body, statusCode } = response
        expect(statusCode).to.be.equals(200)
        expect(_body).to.be.an('array')
    })

    it("Debería crear un carrito nuevo", async () => {
        const response = await requester.post('/carts').set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body, statusCode } = response
        cartId = _body._id
        expect(statusCode).to.be.equals(201)
        expect(_body).to.have.property("_id")
        expect(_body.products).to.be.an('array').to.be.empty
    })

    it("Debería leer el carrito creado", async () => {
        const response = await requester.get(`/carts/${cartId}`).set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body, statusCode } = response
        expect(statusCode).to.be.equals(200)
        expect(_body.products).to.be.an('array').to.be.empty
    })

    it("Debería agregar un producto al carrito", async () => {
        const response = await requester.post(`/carts/${cartId}/products/64d7bf86678402946f7a126a`).set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body, statusCode } = response
        expect(statusCode).to.be.equals(200)
        expect(_body.products[0].product).to.be.equals('64d7bf86678402946f7a126a')
        expect(_body.products[0].quantity).to.be.equals(1)
    })

    it("Debería modificar la cantidad de producto en el carrito", async () => {
        const data = { quantity: 3 }
        const response = await requester.put(`/carts/${cartId}/products/64d7bf86678402946f7a126a`).send(data).set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body, statusCode } = response
        expect(statusCode).to.be.equals(200)
        expect(_body.products[0].quantity).to.be.equals(3)
    })

    it("Debería eliminar el carrito", async () => {
        const response = await requester.delete(`/carts/destroy/${cartId}`).set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body, statusCode } = response
        expect(statusCode).to.be.equals(200)
        expect(_body).to.have.property("_id")
    })
})
