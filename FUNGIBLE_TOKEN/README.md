# Fungible token

## I. Abstract

This specification is compliant with the [ZRC2-standard](https://github.com/Zilliqa/ZRC/blob/master/zrcs/zrc-2.md) for fungible tokens on Zilliqa. It is made by:

- a [proxy](./token.tyron.scilla) contract that keeps track of the user balances and spender allowances; and

- an [implementation](./tokeni.tyron.scilla) contract that automates a private investor's token release by executing a linear vesting schedule.

## II. Motivation

In private token sales, it is common to arrange a lock-up period for the purchased tokens. Along that period, a vesting schedule takes place to release the tokens to the investor gradually. However, this process can often become cumbersome, requiring coordination and human resources. We developed a decentralized solution that automates the token release according to a linear vesting schedule.

## III. Specification

This implementation introduces the ```lockup_period``` mutable field, measured in blocks and initialized to 2 years approx. It is possible to update this field by calling the ```UpdateLockup``` transition.

To set up a new Investor Account, the Admin must call the ```AddAccount``` transition. First, it fetches the Fund address (the entity holding the tokens sold to the investor), which can get updated at any time by calling the ```UpdateFund``` transition.

```
type Account =
    | Account of BNum Uint128 Uint128 Uint128
```

An Investor Account is four pieces of data:

- the next block number at which a release is possible;

- the vesting period that is the lockup period divided by the number of instalments;

- the number of tokens that are locked; and

- the portion of tokens that get released periodically.

### Is it vested?

When processing a token transfer, the implementation will make sure whether the Originator has an Investor Account. To do so, it executes the ```IsVested``` procedure.  If there is an Account, it checks that the Originator has enough funds so that the transfer does not require any lockup tokens, enabling the investor to behave like a normal user. Furthermore, it updates the Investor Account when due, releasing more tokens by reducing the lockup amount. When the investor purchase is fully vested, their Account gets automatically deleted.
