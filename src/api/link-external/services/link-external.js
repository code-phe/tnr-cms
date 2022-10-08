'use strict';

/**
 * link-external service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::link-external.link-external');
