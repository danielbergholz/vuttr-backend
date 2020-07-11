'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// USER ROUTES ******************************************************

// LIST ALL USERS
Route.get('/user', 'UserController.index')
// CREATE USER
Route.post('/user', 'UserController.store')
// UPDATE USER
Route.put('/user', 'UserController.update').middleware('auth')
// DELETE USER
Route.delete('/user', 'UserController.destroy').middleware('auth')

// SESSION ROUTES ***************************************************
// CREATE SESSION
Route.post('/session', 'SessionController.store')
