const errors = require('feathers-errors');
const makeDebug = require('debug');
const AfpNews = require('afpnews-api');

const debug = makeDebug('afpNews');

class Service extends AfpNews {
  constructor (options) {
    super(options)
    this.storageKey = options.storageKey || 'afpNews'
    this.tokenKey = options.tokenKey || 'token'
  }

  async create (credentials) {
    this.resetToken()
    await this.authenticate(credentials)
    return {
      [this.tokenKey]: this.token
    }
  }

  async find (params) {
    this.resetToken()

    if (!params.query) {
      return Promise.reject(new errors.BadRequest())
    }

    let token
    if (params.user && params.user[this.storageKey] && params.user[this.storageKey][this.tokenKey]) {
      token = params.user[this.storageKey][this.tokenKey]
      this.token = token
    } else {
      return Promise.reject(new Error('There is no token. Try to authenticate again'))
    }

    const result = await this.search(params.query)

    if (this.token.accessToken === token.accessToken) {
      return result
    } else {
      return Object.assign(result, { [this.tokenKey]: this.token })
    }
  }
}

module.exports = function init (options) {
  debug('Initializing afpNews plugin');
  return new Service(options);
}
