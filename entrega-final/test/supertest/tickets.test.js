import env from '../../src/config/env.config.js'
import { expect } from 'chai'
import supertest from 'supertest'

const requester = supertest(`http://localhost:${env.PORT}/api`)

describe("Testeando un flujo de operaciones para Tickets...", () => {
    let cookie

    it("Debería iniciar sesión un nuevo usuario", async () => {
        const data = { email: "usuario@gmail.com", password: "1234" }
        const response = await requester.post('/auth/login').send(data)
        const { headers } = response 
        const token = headers["set-cookie"][0]
        cookie = {
            name: token.split("=")[0],
            value: token.split("=")[1]
        }
        expect(response.status).to.be.equals(200)
        expect(cookie.name).to.be.equals("accessToken")
        expect(cookie.value).to.be.ok
    })

    it("Debería agregar un producto a su carrito", async () => {
        const response = await requester.post('/carts/64d7bf86678402946f7a126a').set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body } = response
        expect(response.status).to.be.equals(200)
        expect(_body.products[0].product).to.be.equals('64d7bf86678402946f7a126a')
    })

    it("Debería crear un nuevo ticket", async () => {
        const response = await requester.post('/tickets').set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body } = response
        expect(response.status).to.be.equals(201)
        expect(_body.ticket).to.have.property('products')
    })

    it("Debería quedar con el carrito vacío", async () => {
        const response = await requester.get('/carts').set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body } = response
        expect(response.status).to.be.equals(200)
        expect(_body.products).to.be.an('array').to.be.empty
    })
})