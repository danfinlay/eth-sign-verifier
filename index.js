var recoverer = require('./recoverer')

var address = '0x1dba1131000664b884a1ba238464159892252d3a'
var msg = 'https://www.reddit.com/r/ethereum/comments/6obofq/a_modified_version_of_a_common_multisig_had_a/'
var claimed = '0xe7bf6c80979b6633dc9bdc7ae556f40ceb43eee2ba8b2a7deaf9b838dd8b21d46858b62b0b01b257f7194de03366f09aa89115717f8860b4620d8a6c92cbeec71c'

const sender = recoverer(msg, claimed)

console.dir({ sender, address })
console.log(`the sender's claim is ${sender.toLowerCase() === address.toLowerCase()}`)

