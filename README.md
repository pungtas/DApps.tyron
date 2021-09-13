Welcome to the open-source ```.tyron``` smart contracts, which are the core of the [Tyron Self-Sovereign Identity Protocol](https://www.ssiprotocol.com). They are in active development, and you can find them in their corresponding folders:

- [did.tyron](./DID/did.tyron.scilla): W3C decentralized identifier smart contract
- DID dapps:
    - [xwallet.tyron](./DID/DIDdapps/DIDxWallet/xwallet.tyron.scilla): decentralized identifier smart contract wallet (DIDxWallet)
    - [coop.tyron](./DID/DIDdapps/COOP/coop.tyron.scilla): decentralized identifier NFT cooperative project
- [permawallet.tyron](./PERMAWALLET/permawallet.tyron.js): permaweb wallet smart contract
- Profit-sharing token (PST) smart contracts:
    - [documentation](./PST/README.md) 
    - [pst.tyron](./PST/pst.tyron.scilla): proxy smart contract
    - implementations:
        - [psti.tyron](./PST/new-token/psti.tyron.scilla): fungible PST
        - [wpsti.tyron](./PST/wrapped-token/wpsti.tyron.scilla): wrapped ZRC2-standard to PST