import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Responses extends BaseSchema {
  protected tableName = 'responses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('text').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

