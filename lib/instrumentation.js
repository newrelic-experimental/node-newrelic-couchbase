'use strict'

exports.initialize = function initialize(shim, couchbase) {
    shim.setDatastore("COUCHBASE");

    shim.setParser(couchbaseQueryParser)

    shim.__wrappedPoolConnection = false

    var proto = couchbase.BucketImpl.prototype

    // record db operations
    shim.recordOperation(proto, ['connect', 'disconnect', 'invalidateQueryCache'], {callback: shim.LAST})

    //record db queries
    shim.recordQuery(proto, ['insert', 'upsert', 'replace', 'append', 'prepend', 'counter', 
                        'mapGet', 'mapRemove', 'mapSize', 'mapAdd', 
                        'listGet', 'listAppend', 'listPush', 'listPrepend', 'listShift', 
                        'listRemove', 'listSet', 'listSize',
                        'setAdd', 'setExists', 'setSize', 'setRemove', 
                        'queuePush', 'queuePop', 'queueSize', 
                         'get', 'getMulti', 'getAndTouch', 'getAndLock', 'getReplica', 
                        'touch', 'unlock', 'remove'], describeQuery)

    shim.recordQuery(proto, ['query'], describeN1QLQuery)

}

function couchbaseQueryParser(query) {
    let parsedQuery = query.split(",,,,")
    
    let operation = "other"
    let collection = this.collectionName || 'unknown'
    let rawQuery = ""
    if (parsedQuery.length > 1) {
        operation = parsedQuery[0]
        collection = parsedQuery[1]
        rawQuery = parsedQuery[2]
    }

    if (operation === 'query') {
        
    }
    //console.log(operation + " :: " + collection)
    return {operation, collection}
}

function describeN1QLQuery(shim, func, name, args) {
    let bucketname = this.name
    let query = ''
    if (shim.isString(name) && (bucketname)) {
        query =  `${name},,,,${bucketname}`  ;
    }

    let parameters = {host: null, port_path_or_id: null, database_name: null, params: args[1]}
    return {
        stream: false,
        query: query,
        callback: shim.LAST,
        promise: false,
        parameters: parameters,
        record: true
    }
}

function describeQuery(shim, func, name, args) {
    let bucketname = this.name
    let query = ''
    if (shim.isString(name) && (bucketname)) {
        query =  `${name},,,,${bucketname}`  ;
    }

    let callback = shim.LAST
    let promise = false
    let callbackFn = args[args.length]
    if (callbackFn && typeof(callbackFn) == "function") {
        promise = false
    } else {
        promise = true
    }
    let parameters = {host: null, port_path_or_id: null, database_name: null, params: args[1]}
    return {
        stream: false,
        query: query,
        callback: callback,
        promise: promise,
        parameters: parameters,
        record: true
    }
}

