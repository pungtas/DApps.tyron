# $TYRON & $SI

TYRON is the fungible token for the TYRON Community DApp, the network's Governing & Profit Sharing Community, managing the token liquidity to ensure its decentralized exchange. Owning TYRON does not entitle its holder to receive payments from anyone (meaning that TYRON is not a security).

TYRON has a scarce max supply of 10 million tokens. One TYRON can be divided into 1,000,000,000,000 EPU. Hence, EPU is the smallest unit of the TYRON Token.

This token works through two smart contracts. A [Proxy](./token.tyron.scilla) that records the user's balances and expenditures, and an [Implementation](./tokeni.tyron.scilla) that automates the token release.
By transmuting TYRON Token ($TYRON) or another stablecoin, (e.g. zUSDT.), you can obtain the Self-Sufficient Identity Dollar ($SI), an algorithmic stablecoin created to join the TYRON Community DApp, buy NFT Usernames, p2p exchange and other upcoming utilities in DeFi applications.

The Self-Sovereign Identity Dollar ($SI) is equivalent to 1.0 US dollars.
Such parity is represented as follows:
```
1.0 $SI = 1.0 zUSDT or 1.0 $SI = 1.33 XSGD
1.0 TYRON = 1.0 $SI (at the beginning when TYRON costs 1.0 zUSDT)
```
The exchange rate for $TYRON for $SI is read in real-time from the TYRON and $SI liquidity pools on the TYRON Community DApp.

This transmutation decreases the total supply of $TYRON by the same equivalent proportion in dollars. Whenever $SI is minted, the same amount of TYRON with de same value is burned.

---

Our smart contract [$SI Implementation](./%24si.tyron.scilla) allows it to be managed, tracked, owned and traded peer-to-peer across portfolios or exchanges, thanks to the ZRC-2 interface. To understand the structure and parts of it, you can check our [Contract Parts of the $SI](README.%24SI.md).