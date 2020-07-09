'use strict'

const { test, trait } = use('Test/Suite')('SessionController')

trait('Test/ApiClient')

test('It should return JWT token', async ({ client }) => {
  await client.post('/user').send({
    name: 'testejwt',
    email: 'testejwt@gmail.com',
    password: '123123'
  }).end()

  const response = await client.post('/session').send({
    email: 'testejwt@gmail.com',
    password: '123123'
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    type: 'bearer'
  })
})

test('It should not return JWT token if the password is wrong', async ({ client }) => {
  const response = await client.post('/session').send({
    email: 'testejwt@gmail.com',
    password: 'wrong-password'
  }).end()

  response.assertStatus(401)
})

test('It should not return JWT token if the user does not exist', async ({ client }) => {
  const response = await client.post('/session').send({
    email: 'non-existing-user@gmail.com',
    password: '1231233'
  }).end()

  response.assertStatus(401)
})
