import Initiative from '#models/initiative'
import factory from '@adonisjs/lucid/factories'

export const InitiativeFactory = factory
  .define(Initiative, async ({ faker }) => {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
    }
  })
  .build()
