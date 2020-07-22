'use strict'

/*
|--------------------------------------------------------------------------
| Redis Configuaration
|--------------------------------------------------------------------------
|
| Here we define the configuration for redis server. A single application
| can make use of multiple redis connections using the redis provider.
|
*/

const Env = use('Env')

const Url = require('url-parse')
const REDIS_URL = new Url(Env.get('REDIS_URL'))

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | connection
  |--------------------------------------------------------------------------
  |
  | Redis connection to be used by default.
  |
  */
  connection: 'default',

  /*
  |--------------------------------------------------------------------------
  | default connection config
  |--------------------------------------------------------------------------
  |
  | Configuration for a named connection.
  |
  */
  default: {
    host: REDIS_URL.host || '127.0.0.1',
    port: REDIS_URL.port || 6379,
    password: REDIS_URL.password || null,
    user: REDIS_URL.username || null,
    db: 0,
    keyPrefix: ''
  },

  /*
  |--------------------------------------------------------------------------
  | cluster config
  |--------------------------------------------------------------------------
  |
  | Below is the configuration for the redis cluster.
  |
  */
  cluster: {
    clusters: [{
      host: '127.0.0.1',
      port: 6379,
      password: null,
      db: 0
    },
    {
      host: '127.0.0.1',
      port: 6380,
      password: null,
      db: 0
    }]
  }
}
