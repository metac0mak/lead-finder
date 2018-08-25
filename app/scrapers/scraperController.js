'use strict'

const Boom = require('boom')

module.exports = function scraperController() {
  return {
    async scrapeUrl(request, reply) {
      let response
      try{
        //response = await scraperService.findAll()
        response = { boom: '!goes the dynamite!'}
        return reply(response)
      } catch(e){
        //log.error(e)
        return reply(Boom.badRequest(e))
      }
    }
  }
}
