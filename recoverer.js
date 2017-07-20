var ethUtil = require('ethereumjs-util')

module.exports = function (msg, sigHex) {

  const msgHash = ethUtil.sha3(new Buffer(msg))
  const sigParams = ethUtil.fromRpcSig(sigHex)
  console.dir({ v: sigParams.v })
  const publicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s)

  const sender = ethUtil.bufferToHex(ethUtil.publicToAddress(publicKey))
  return sender

}
