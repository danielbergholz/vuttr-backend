'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tool = use('App/Models/Tool')
const User = use('App/Models/User')

const { test, trait, before } = use('Test/Suite')('ToolController')

trait('Test/ApiClient')
trait('Auth/Client')

let user
let otherTool
before(async () => {
  user = await User.create({
    name: 'user',
    email: 'user@gmail.com',
    password: 'password'
  })
  otherTool = await Tool.create({
    user_id: user.id,
    title: 'other-title',
    link: 'https://other-link.com/',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']
  })
})

// STORE
test('It should be able to create tool', async ({ client }) => {
  const response = await client.post('/tool').send({
    title: 'title',
    link: 'https://link.com/',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']
  }).loginVia(user, 'jwt').end()

  response.assertStatus(201)
})

test('It should not be able to create tool without title, link or tags on request body', async ({ client }) => {
  const response1 = await client.post('/tool').send({
    link: 'https://github.com/typicode/hotel',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']
  }).loginVia(user, 'jwt').end()

  const response2 = await client.post('/tool').send({
    title: 'hotel',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']
  }).loginVia(user, 'jwt').end()

  const response3 = await client.post('/tool').send({
    title: 'hotel',
    link: 'https://github.com/typicode/hotel',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.'
  }).loginVia(user, 'jwt').end()

  response1.assertStatus(400)
  response2.assertStatus(400)
  response3.assertStatus(400)
})

test('It should not be able to create tool with same title', async ({ client }) => {
  const response = await client.post('/tool').send({
    title: 'title',
    link: 'https://link.com/',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']
  }).loginVia(user, 'jwt').end()

  response.assertStatus(400)
})

// UPDATE
test('It should not be able to update tool without tool id or title on request body', async ({ client }) => {
  const tools = await Tool.find(1)

  const response1 = await client.put('/tool').send({
    title: 'new-title',
    link: 'https://link.com',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
  }).loginVia(user, 'jwt').end()

  const response2 = await client.put('/tool').send({
    id: tools.id,
    link: 'https://link.com',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
  }).loginVia(user, 'jwt').end()

  response1.assertStatus(400)
  response2.assertStatus(400)
})

test('It should not be able to update tool title with existing one', async ({ client }) => {
  const tools = await Tool.findBy('title', 'title')

  const response = await client.put('/tool').send({
    id: tools.id,
    title: 'other-title',
    link: 'https://link.com',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
  }).loginVia(user, 'jwt').end()

  response.assertStatus(400)
})

test('It should be able to update tool', async ({ client }) => {
  const tools = await Tool.find(1)

  const response = await client.put('/tool').send({
    id: tools.id,
    title: 'new-title',
    link: 'https://newlink.com',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
  }).loginVia(user, 'jwt').end()

  response.assertStatus(200)
  response.assertJSONSubset({
    id: tools.id,
    title: 'new-title',
    link: 'https://newlink.com',
    description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
    tags: ['node', 'organizing', 'new tag 1', 'new tag 2']
  })
})

// DELETE
test('It should not be able to delete tool with wrong id', async ({ client }) => {
  const response = await client.delete('/tool/wrong-id').loginVia(user, 'jwt').end()

  response.assertStatus(400)
})

test('It should be able to delete tool', async ({ client }) => {
  const tools = await Tool.find(1)

  const response = await client.delete(`/tool/${tools.id}`).loginVia(user, 'jwt').end()

  response.assertStatus(204)
})
