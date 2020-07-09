'use strict'

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.post()

    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
