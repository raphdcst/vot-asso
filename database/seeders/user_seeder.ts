import { UserFactory } from '#database/factories/0_user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.createMany(10)
  }
}
