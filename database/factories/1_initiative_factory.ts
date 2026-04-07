import Initiative from '#models/initiative'
import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'

export const InitiativeFactory = factory
  .define(Initiative, async ({ faker }) => {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      createdAt: DateTime.fromISO(faker.date.recent({ days: 10 }).toISOString()),
    }
  })
  .build()
