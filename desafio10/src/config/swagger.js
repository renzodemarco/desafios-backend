import __dirname from '../dirname.js'

const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "CODERHOUSE APP",
            description: "API para el curso de Programación Backend de Coderhouse"
        }
    },
    apis: [__dirname + "/config/docs/*.yaml"]
}

export default options