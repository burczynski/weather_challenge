'use strict';
// If deployed on internal routing system like Heroku
const getRealIp = (req) => {
   let ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr) {
    let list = ipAddr.split(",");
    ipAddr   = list[list.length-1];
  } else {
    ipAddr = req.socket.remoteAddress;
  }
  return ipAddr;
};

module.exports = getRealIp;