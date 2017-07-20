var test = require('tape')
var ethUtil = require('ethereumjs-util')
var recoverer = require('./recoverer')

/*
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
*/

test('with go-ethereum outputs', function (t) {
  t.plan(1)
  const address = '0x386f78eceae3db8f90e52c85533d3d6c8187e77d'
  const message = 'foo'
  const messageHash = '0x41b1a0649752af1b28b3dc29a1556eee781e4a4c3a1f7f53f90fa834de098c4d'
  const signature = '0x01f9dee34e06267d413c462565f329d210926eca51b2c8f8e225921e5fa6fbb429d7e87053940b8491e7a89318dfec619046ce01a3a7b74d19574b78575613bd1b'

  const accused = recoverer(message, signature)
  t.equal(accused.toLowerCase(), address.toLowerCase(), 'accuse the right person')
})

function concatSig (sig) {
  const { v, r, s } = sig
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
