import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('initiatives', (table) => {
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable('initiatives', (table) => {
      table.dropForeign(['user_id'])
      table.dropColumn('user_id')
    })
  }
}
