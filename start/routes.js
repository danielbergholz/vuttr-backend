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

// CREATE USER
Route.post('/user', 'UserController.store')
// UPDATE USER
Route.put('/user', 'UserController.update').middleware('auth')
// DELETE USER
Route.delete('/user', 'UserController.destroy').middleware('auth')

// SESSION ROUTES ***************************************************

// CREATE SESSION
Route.post('/session', 'SessionController.store')

// TOOL ROUTES ******************************************************

// LIST TOOLS
Route.get('/tool', 'ToolController.index').middleware('auth')
// CREATE TOOL
Route.post('/tool', 'ToolController.store').middleware('auth')
// UPDATE TOOL
Route.put('/tool', 'ToolController.update').middleware('auth')
// DELETE TOOL
Route.delete('/tool/:id', 'ToolController.destroy').middleware('auth')
