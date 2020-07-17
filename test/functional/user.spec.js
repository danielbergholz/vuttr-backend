'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

const { test, trait, before } = use('Test/Suite')('UserController')

trait('Test/ApiClient')
trait('Auth/Client')

let user
before(async () => {
  user = await User.create({
    name: 'name',
    email: 'email@gmail.com',
    password: 'password'
  })
})

// STORE
test('It should be able to create user', async ({ client }) => {
  const response = await client.post('/user').send({
    name: 'daniel',
    email: 'daniel@gmail.com',
    password: '123123'
  }).end()

  response.assertStatus(201)
  response.assertJSONSubset({
    name: 'daniel',
    email: 'daniel@gmail.com'
  })
})

test('Request body should have name, email and password to create user', async ({ client }) => {
  const response = await client.post('/user').send({
    name: 'daniel',
    password: '123123'
  }).end()

  const response2 = await client.post('/user').send({
    email: 'daniel@gmail.com',
    password: '123123'
  }).end()

  const response3 = await client.post('/user').send({
    name: 'daniel',
    email: 'daniel@gmail.com'
  }).end()

  response.assertStatus(400)
  response2.assertStatus(400)
  response3.assertStatus(400)
})

test('It should not be able to create existing user', async ({ client }) => {
  const response = await client.post('/user').send({
    name: 'name',
    email: 'email@gmail.com',
    password: 'password'
  }).end()

  response.assertStatus(400)
})

// UPDATE
test('It should not be able to update profile without password', async ({ client }) => {
  const response = await client.put('/user').send({
    name: 'name',
    email: 'email@gmail.com'
  }).loginVia(user, 'jwt').end()

  response.assertStatus(400)
})

test('It should not be able to update profile with wrong password', async ({ client }) => {
  const response = await client.put('/user').send({
    name: 'name',
    password: 'wrong-password'
  }).loginVia(user, 'jwt').end()

  response.assertStatus(400)
})

test('It should be able to update user name and password', async ({ client }) => {
  const response1 = await client.put('/user').send({
    name: 'new-name',
    password: 'password'
  }).loginVia(user, 'jwt').end()

  const response2 = await client.put('/user').send({
    password: 'password',
    newPassword: 'new-password'
  }).loginVia(user, 'jwt').end()

  response1.assertStatus(200)
  response1.assertJSONSubset({
    id: user.id,
    name: 'new-name',
    email: 'email@gmail.com'
  })
  response2.assertStatus(200)
  response2.assertJSONSubset({
    id: user.id,
    name: 'new-name',
    email: 'email@gmail.com'
  })
})

// DELETE
test('It should not be able to delete user without password on request body', async ({ client }) => {
  const response = await client.delete('/user').loginVia(user, 'jwt').end()

  response.assertStatus(400)
})

test('It should not be able to delete user with wrong password', async ({ client }) => {
  const response = await client.delete('/user').send({ password: 'wrong-password' }).loginVia(user, 'jwt').end()

  response.assertStatus(400)
})

test('It should be able to delete logged user', async ({ client }) => {
  const response = await client.delete('/user').send({ password: 'new-password' }).loginVia(user, 'jwt').end()

  response.assertStatus(204)
})
