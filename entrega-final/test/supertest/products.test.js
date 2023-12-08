import env from '../../src/config/env.config.js'
import { expect } from 'chai'
import supertest from 'supertest'

const requester = supertest(`http://localhost:${env.PORT}/api`)

describe("Testeando un flujo de operaciones para Products...", () => {
    let prodId
    let cookie

    it("Testeando que se registra un usuario", async () => {
        const data = { first_name: "Renzo", email: "renzo@gmail.com", password: "1234" }
        const response = await requester.post('/auth/register').send(data)
        const { statusCode } = response
        expect(statusCode).to.be.equals(201)
    })

    it("Testeando que el usuario inicie sesión", async () => {
        const data = { email: "renzo@gmail.com", password: "1234" }
        const response = await requester.post('/auth/login').send(data)
        const { headers } = response 
        const token = headers["set-cookie"][0]
        console.log(token)
        cookie = {
            name: token.split("=")[0],
            value: token.split("=")[1]
        }
        expect(cookie.name).to.be.equals("accessToken")
        expect(cookie.value).to.be.ok
    })

    it("Testeando que se elimina el usuario", async () => {
        const response = await requester.delete('/auth').set("Cookie", [cookie.name + "=" + cookie.value])
        const { _body, statusCode } = response
        expect(statusCode).to.be.equals(200)
        expect(_body.success).to.be.true
    })

})