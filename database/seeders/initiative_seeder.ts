import { InitiativeFactory } from '#database/factories/1_initiative_factory'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const user = await User.findByOrFail('id', '1')

    await InitiativeFactory.merge({ userId: user.id }).createMany(10)
  }
}
