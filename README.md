[![New Relic Experimental header](https://github.com/newrelic/open-source-office/raw/master/examples/categories/images/Experimental.png)](https://github.com/newrelic/open-source-office/blob/master/examples/categories/index.md#new-relic-experimental)

[![Coverage Status][1]][2]

New Relic's official Couchbase version 2.6.x instrumentation for use with the
[Node agent](https://github.com/newrelic/node-newrelic). This module is a
dependency of the agent and is installed with it by running:

```sh
npm install git+https://github.com/newrelic-experimental/newrelic-node-couchbase
```

```js
// index.js
require('newrelic'); // from the newrelic agent install
require('@newrelic/couchbase')
```

### Supported modules

- [`couchbase`](https://www.npmjs.com/package/couchbase) version 2.6.x

For more information, please see the agent [installation guide][3], and
[compatibility and requirements][4].

[1]: https://coveralls.io/repos/github/newrelic/node-newrelic-couchbase/badge.svg?branch=master
[2]: https://coveralls.io/github/newrelic/node-newrelic-couchbase?branch=master
[3]: https://docs.newrelic.com/docs/agents/nodejs-agent/installation-configuration/install-nodejs-agent
[4]: https://docs.newrelic.com/docs/agents/nodejs-agent/getting-started/compatibility-requirements-nodejs-agent