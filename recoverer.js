module.exports = function (msg, sigHex) {

  var ethUtil = require('ethereumjs-util')

  const msgHash = ethUtil.sha3(new Buffer(msg))
  const sigParams = ethUtil.fromRpcSig(sigHex)
  const publicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s)

  const sender = ethUtil.bufferToHex(ethUtil.publicToAddress(publicKey))
  return sender

}
