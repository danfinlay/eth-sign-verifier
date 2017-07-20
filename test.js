var test = require('tape')
var ethUtil = require('ethereumjs-util')
var recoverer = require('./recoverer')

test('sign and recover', function (t) {
  t.plan(1)
  const address = '0x29c76e6ad8f28bb1004902578fb108c507be341b'
  const privKeyHex = '4af1bceebf7f3634ec3cff8a2c38e51178d5d4ce585c52d6043e5e2cc3418bb0'
  const privKey = new Buffer(privKeyHex, 'hex')
  const message = 'Hello, world!'
  const messageHash = ethUtil.sha3(message)

  const sig = concatSig(ethUtil.ecsign(messageHash, privKey))

  const verified = recoverer(message, sig)

  t.equal(verified, address)
})

// https://github.com/ethereum/go-ethereum/blob/f272879e5ac464b7260e898c0de0721c46d59195/crypto/crypto_test.go
test('with go-ethereum inputs', function (t) {
  var testAddrHex = "970e8128ab834e8eac17ab8e3812f010678cf791"
  var testPrivHex = "289c2857d4598e37fb9647507e47a309d6133539bf21a8b9cb6df88fd5232032"

  const message = 'foo'
  const messageHash = ethUtil.sha3(message)

  const sig = concatSig(ethUtil.ecsign(messageHash, privKey))

  const verified = recoverer(message, sig)

  t.equal(verified, address)

})

function concatSig (sig) {
  const { v, r, s } = sig
  console.dir({ v, r, s })
  const rSig = ethUtil.fromSigned(r)
  const sSig = ethUtil.fromSigned(s)
  const vSig = v
  const rStr = padWithZeroes(ethUtil.toUnsigned(rSig).toString('hex'), 64)
  const sStr = padWithZeroes(ethUtil.toUnsigned(sSig).toString('hex'), 64)
  const vStr = ethUtil.stripHexPrefix(ethUtil.intToHex(vSig))
  return ethUtil.addHexPrefix(rStr.concat(sStr, vStr)).toString('hex')
}

function padWithZeroes (number, length) {
  var myString = '' + number
  while (myString.length < length) {
    myString = '0' + myString
  }
  return myString
}
