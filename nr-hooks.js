'use strict'

const instrumentation = require('./lib/instrumentation')

module.exports = [{
    type: 'datastore',
    moduleName: 'couchbase',
    onRequire: instrumentation.initialize
}]