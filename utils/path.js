const path = require('path');

module.exports = path.dirname(require.main.filename)

//we use require.main.filename instead of process.mainModule.filename because it being depreciated