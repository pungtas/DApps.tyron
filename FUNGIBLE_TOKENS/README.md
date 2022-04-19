# Fungible token

## I. Abstract

This specification is compliant with the [ZRC2-standard](https://github.com/Zilliqa/ZRC/blob/master/zrcs/zrc-2.md) for fungible tokens on Zilliqa. It is made by:

- A [proxy](./token.tyron.scilla) smart contract that keeps track of the user balances and spender allowances; and

- An [implementation](./tokeni.tyron.scilla) smart contract that automates a private investor's token release by executing a linear vesting schedule.

## II. Motivation

It is common to arrange a lock-up period for the purchased tokens in private token sales. Along that period, a vesting schedule takes place to gradually release the tokens to the investor. However, this process can often become cumbersome, requiring coordination and human resources. We developed a decentralized solution that automates the token release according to a linear vesting schedule.

## III. Specification

This implementation introduces the ```lockup_period``` mutable field, measured in blocks and initialized to 2 years approx. It is possible to update this field by calling the ```UpdateLockup``` transition.

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

### Is it vested?

When processing a token transfer, the implementation will ensure whether the Originator has an Investor Account. To do so, it executes the ```IsVested``` procedure. If there is an Account, it checks that the Originator has enough funds so that the transfer does not require any lockup tokens, enabling the investor to behave like a regular user. Furthermore, it updates the Investor Account, releasing more tokens by reducing the lockup amount when able to do so. When the investor purchase is fully vested, their Account gets automatically deleted.

# Documentation
- [Contract Parts](./contractparts.md) : Upgradeables Smart Contacts for Fungible Tokens.

- [TYRON COMMUNITY DAPP](TYRONCommunityDApp.md) :  Specification and description of TYRON Token and $SI.
