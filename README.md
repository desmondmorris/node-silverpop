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
    pod: 1
}

var silverpop = new Silverpop(options);

```

### Login

```JavaScript

silverpop.login(username, password, function(err, sessionid){
  if (!err) {
    console.log('I am your sessionid: ' + sessionid);
  }
});
```

### Logout

```JavaScript

silverpop.logout(sessionid, function(err, result){
  if (!err) {
    console.log('Logged out');
  }
});
```

## Changelog
* **0.0.1**: Initial implementation with basic API request, login and logout endpoints
