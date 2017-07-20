# Eth_Sign Verifier

Honestly, this is my first time writing eth_sign verification code. I've told everyone to move to personal_sign, ever since the community agreed it was more secure.

https://medium.com/metamask/the-new-secure-way-to-sign-data-in-your-browser-6af9dd2a1527

That said, a user made a claim on reddit with eth.sign, and when I fail to verify it, I can't help but think we just have crap tooling around eth.sign.

https://www.reddit.com/r/ethereum/comments/6obofq/a_modified_version_of_a_common_multisig_had_a/dkg4i7e/

I've got good geth inputs in the tests now (`npm test`), but the main tool (`recoverer.js`) is failing to extract the signer's address correctly.

Not sure how to verify the geth signature in JS currently.  PRs welcome!

