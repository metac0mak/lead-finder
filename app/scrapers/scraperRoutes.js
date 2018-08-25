'use strict'

const Joi = require('joi')
const Boom = require('boom')
const controller = 'scraperController'

module.exports = [
  {
        method: 'GET',
        path: `/scrapers/{url}/`,
        config: {
            // TODO: Implement dependency injection
            handler: (request, h) => {
              let response = h.response({ boom: '!goes the dynamite!'})
              response.type('application/json');
              try{
                //response = await scraperService.findAll()
                response = { boom: '!goes the dynamite!'}
                return response
              } catch(e){
                //log.error(e)
                return Boom.badRequest(e)
              }
            },
            description: 'Scrape source from url',
            notes: 'todo',
            tags: ['api'],
            validate: {
                params: {
                    url : Joi.string()
                            .required()
                            .example('http://www.gmail.com'),
                }
            }
        },
    }

]
