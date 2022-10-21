const prisma = require('./db')

const faker = require('./faker')

prisma.tbl_temp
  .createMany({
    data: new Array(10000).fill(0).map((_) => ({ nome: faker.name.firstName() })),
  })
  .then(console.log)
  .catch(console.log)
