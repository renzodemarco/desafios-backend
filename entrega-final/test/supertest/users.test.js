import env from '../../src/config/env.config.js'
import { expect } from 'chai'
import supertest from 'supertest'
import { generateToken } from '../../src/utils/jwt.js'

const requester = supertest(`http://localhost:${env.PORT}/api`)

describe("Testeando un flujo de operaciones para Users...", () => {
    const email = "renzo@gmail.com"
    let cookie

    it("Debería registrar un usuario", async () => {
        const data = { first_name: "Renzo", email, password: "1234" }
        const response = await requester.post('/auth/register').send(data)
        const { statusCode } = response
        expect(statusCode).to.be.equals(201)
    })

    it("Debería iniciar sesión", async () => {
        const data = { email, password: "1234" }
        const response = await requester.post('/auth/login').send(data)
        const { _body, headers } = response 
        const token = headers["set-cookie"][0]
        cookie = {
            name: token.split("=")[0],
            value: token.split("=")[1]
        }
        expect(response.status).to.be.equals(200)
        expect(cookie.name).to.be.equals("accessToken")
        expect(cookie.value).to.be.ok
    })

    it("Debería crearse un carrito vacío al registrar el usuario", async () => {
        const response = await requester.get('/auth/current').set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body } = response
        expect(_body).to.have.property('cart')
        expect(_body.cart).to.have.property('products').that.is.an('array').that.is.empty;
    })

    it("Debería cerrar sesión", async () => {
        const response = await requester.post('/auth/signout').set("Cookie", [cookie.name + "=" + cookie.value])
        expect(response.status).to.be.equals(200)
    })

    it("Debería modificar la contraseña", async() => {
        const token = generateToken({ email })
        const data = { email, password: "4321" }
        const response = await requester.put('/auth').send(data).set('Authorization', `Bearer ${token}`)
        expect(response.status).to.be.equals(200)
    })

    it("Debería iniciar sesión con la contraseña nueva", async () => {
        const data = { email, password: "4321" }
        const response = await requester.post('/auth/login').send(data)
        expect(response.status).to.be.equals(200)
        expect(response._body).to.have.property("accessToken")
    })

    it("Debería cambiar de rol a premium", async () => {
        const response = await requester.put('/auth/prem').send({role: 'premium'}).set("Cookie", [cookie.name + "=" + cookie.value])
        expect(response._body.role).to.be.equals('premium')
    })

    it("Debería eliminar al usuario", async () => {
        const response = await requester.delete('/auth').set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body, statusCode } = response
        expect(statusCode).to.be.equals(200)
        expect(_body.success).to.be.true
    })

})