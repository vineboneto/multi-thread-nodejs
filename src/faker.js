const { faker, Faker } = require('@faker-js/faker')
const fake = new Faker({ locale: 'pt_BR', locales: faker.locales })

module.exports = fake
