const {v4: uuidv4} = require('uuid')

function generateUniqueId(req, res, next) {

    req.uniqueId = uuidv4(); // Generating a unique ID using uuidv4 and attaching it to the request object
    next();
}
module.exports=  {generateUniqueId}
