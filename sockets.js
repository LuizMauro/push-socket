var global = require("./global.js");

function triggerSocket(myEvent, data) {
  global.io.sockets.to(myEvent).emit(myEvent, {
    data,
  });
}

module.exports = { triggerSocket };
