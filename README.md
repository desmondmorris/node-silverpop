# Silverpop

<a href="https://nodei.co/npm/silverpop/"><img src="https://nodei.co/npm/silverpop.png"></a>

A library for accessing the [Silverpop Enagage](http://silverpop.com) service.


## Installation

    npm install silverpop

## Usage

### Configuration

```JavaScript
var Silverpop = require('silverpop');

var options = {
    pod: 1,
    username: 'USERNAME',
    password: 'PASSWORD'
}

var silverpop = new Silverpop(options);

```

## Changelog
* **0.0.1**: Initial implementation with basic API request endpoint
