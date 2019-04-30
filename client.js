const socket = require('socket.io-client')('http://localhost:3000', {
  autoConnect: false,
  reconnection: false,
});

const openThenCloseOnConnect = (recursions) => {
  console.log('---START FUNCTION CALL---');

  socket.once('connect', () => {
    console.log('- connected socket', recursions);

    console.log('- closing socket', recursions);
    socket.close();

    console.log('---END FUNCTION CALL---');
    if (recursions > 0) openThenCloseOnConnect(recursions - 1)

    // use the imeout below and things should always work
    // if (recursions > 0) setTimeout(() => openThenClose(recursions - 1), 500);
  });

  console.log('- opening socket', recursions);
  socket.open();
};


openThenCloseOnConnect(1);

// we expect the output to be...
//
// ---START FUNCTION CALL---
// - opening socket 1
// - connected socket 1
// - closing socket 1
// ---END FUNCTION CALL---
// ---START FUNCTION CALL---
// - opening socket 0
// - connected socket 0
// - closing socket 0
// ---END FUNCTION CALL---
//
// and sometimes it is, but usually it only gets as far as...
//
// ---START FUNCTION CALL---
// - opening socket 1
// - connected socket 1
// - closing socket 1
// ---END FUNCTION CALL---
// ---START FUNCTION CALL---
// - opening socket 0
//
// and then it hangs because the 'connect' event is never triggered
