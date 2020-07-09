'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ToolSchema extends Schema {
  up () {
    this.create('tools', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('title').notNullable()
      table.string('link').notNullable()
      table.string('description')
      table.enu('tags', ['tag1', 'tag2']).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tools')
  }
}

module.exports = ToolSchema
