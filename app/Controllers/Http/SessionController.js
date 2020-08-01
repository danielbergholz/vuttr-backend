'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.post()

    const token = await auth.attempt(email, password)

    const user = await User.findBy('email', email)

    return { ...token, user }
  }
}

module.exports = SessionController
