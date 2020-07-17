'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

class ToolSchema extends Schema {
  up () {
    this.create('tools', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('title').notNullable().unique()
      table.string('link').notNullable()
      table.string('description')
      table.specificType('tags', Env.get('DB_CONNECTION') === 'sqlite' ? 'character varying(255)' : 'character varying(255)[]')
      // SERÁ QUE VAI DAR MERDA ESSA LINHA DE CIMA?
      table.timestamps()
    })
  }

  down () {
    this.drop('tools')
  }
}

module.exports = ToolSchema
