/**
 * An example on adding recipients to a list
 */


var Silverpop = require('silverpop')


var pod = process.env.SILVERPOP_POD
var username = process.env.SILVERPOP_USERNAME
var password = process.env.SILVERPOP_PASSWORD
var listId = process.env.SILVERPOP_LIST_ID

// Instantiate Silverpop
var silverpop = new Silverpop({
  pod: pod
})

// Login
silverpop.login(username, password, function (err, session) {

  // If authentication fails
  if (!err) {

    // Build the request.  The object gets converted into XML
    var req = {
      AddRecipient: {
        LIST_ID: listId,
        CREATED_FROM: 2,
        SEND_AUTOREPLY: 'true',
        COLUMN: [
          {
            NAME: 'EMAIL',
            VALUE: email
          }
        ]
      }
    }

    // Execute request
    silverpop.request(req, session, function(err, data){

      if (!err) {
        console.log(data)
      }

    })

  }

})
