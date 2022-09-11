# TYRON fungible token

## I. Summary

TYRON is the fungible token for the **TYRON Governing & Profit-Sharing Community** (TYRON Community DApp), which manages its liquidity to ensure its decentralized exchange. You can use TYRON tokens to join the TYRON Community DApp, but without entitling you as a holder of TYRON to receive payments of any kind from any person (meaning that it is not a security). 

This specification is compliant with the [ZRC2-standard](https://github.com/Zilliqa/ZRC/blob/master/zrcs/zrc-2.md) for fungible tokens on Zilliqa. It is made by:

- A [proxy](./token.tyron.scilla) smart contract that keeps records of the user balances and spender allowances; and

- An [implementation](./tokeni.tyron.scilla) smart contract that automates a private investor's token release by executing a linear vesting schedule.

## II. Motivation

It is common to arrange a lock-up period for the purchased tokens in private token sales. Along that period, a vesting schedule takes place to gradually release the tokens to the investor. However, this process can often become cumbersome, requiring coordination and human resources. We developed a decentralized solution that automates the token release according to a linear vesting schedule.

## III. Specification

One of the basic features of smart contracts is that they cannot be changed once deployed, which means that they are immutable. However, in order to manage an upgradeable decentralized application, we use a **proxy** pattern to keep records of user balances.

The proxy smart contract is a storage layer that users interact with directly and is in charge of forwarding transactions to a second contract, the **implementation**, which contains the logic and sends callbacks to the proxy.
		
The implementation has the application logic that users want to interact with, but - instead of interacting directly with this contract, they call the proxy contract's functions (called transitions) - which means that the user interacts with the Implementation contract through the Proxy contract. This relationship is possible by the proxy contract's ability to store the address of the logical contract and vice-versa. And as a result of this chaining, it is possible to change the implementation contract to a different one for an upgrade, to fix bugs, or introduce new features.

For fungible tokens, the [implementation](./tokeni.tyron.scilla) automates the transfers and token release for private investors. During that period, a vesting schedule gradually releases the tokens. And the [p
roxy](./token.tyron.scilla) keeps records of the user balances and spender allowances.

### Investor account

The implementation introduces the ```lockup_period``` mutable field, measured in blocks and initialized to 2 years approx. It is possible to update this field by calling the ```UpdateLockup``` transition.

To set up a new Investor Account, the Admin must call the ```AddAccount``` transition. First, it fetches the Fund address (the entity holding the tokens sold to the investor), which can get updated at any time by calling the ```UpdateFund``` transition.

```
type Account =
    | Account of BNum Uint128 Uint128 Uint128
```

The following four pieces of data make up an Investor Account:

- The following block number at which a release is possible;

- The vesting period that is the lockup period divided by the number of installments;

- The number of tokens that are locked; and

- The portion of tokens that get released periodically.

#### Is it vested?

When processing a token transfer, the implementation will ensure whether the Originator has an Investor Account. To do so, it executes the ```IsVested``` procedure. If there is an Account, it checks that the Originator has enough funds so that the transfer does not require any lockup tokens, enabling the investor to behave like a regular user. Furthermore, it updates the Investor Account, releasing more tokens by reducing the lockup amount when able to do so. When the investor purchase is fully vested, their Account gets automatically deleted.