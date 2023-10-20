import { faker } from '@faker-js/faker'

const categories = ['rock', 'pop', 'jazz', 'latin', 'metal', 'electro', 'rap']

const getRandomCategory = () => {
    const randomIndex = Math.floor(Math.random() * categories.length)
    return categories[randomIndex]
}

export default function generateMockProduct() {
    return {
        title: faker.music.songName(),
        description: faker.person.fullName(),
        year: faker.number.int({min: 1920, max: 2023}),
        price: faker.number.int({min: 100, max: 250}),
        code: faker.number.int({min: 100000, max: 999999}).toString(),
        stock: faker.number.int({min: 1, max: 100}),
        thumbnail: [],
        category: getRandomCategory(),
        status: true
    }
}