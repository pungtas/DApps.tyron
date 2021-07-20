# Profit-sharing tokens

A profit-sharing token (PST) enables token holders to become shareholders of the organization behind the PST. The organization can provide products and services to users and collect fees or donations. A PST is a new kind of cryptocurrency that, besides giving token holders the monetary value of the fungible token, also provides: 

- governance rights to community members;

- personal passive income to their members by distributing the organization's profits among token holders.

The profit distribution is coded into the [PST.tyron smart contract](./pst.tyron.scilla) based on the share of each token holder, meaning that if you own 1% of the PST supply, you will get 1% of the profits in every cycle (be it monthly, quarterly, yearly or as defined by the organization).

The organization behind a PST enacts a profit-sharing community (PSC), and its governance should aim at being decentralized. For that purpose, the PST has a voting mechanism when distributing the profits: the smart contract collects the vote of each token holder and ponderates their votes according to their shares, which means that if you own 1% of the PST supply, you will have 1% of the voting decision. Through decentralized governance, the PSC decides what the quorum is and how much the fees are. Fees can get collected depending on the products and services provided by the organization. Communities can also be charities or receive donations, peer-to-peer.


We use the FATF Travel Rule terminology of Originator and Beneficiary to refer to the sender and receiver of a token transfer.

## Proxy smart contract

The PST Proxy smart contract keeps track of the user accounts and the address of the  the contract to upgrade the latter when necessary. Every user call must be to the Proxy, and then this sends a message to the current Implementation.

### User account

Your user account gets constituted by your balance of PSTs, your normalized share and your vote.

*balance*

- Your balance is the amount of PSTs you own, with up to 6 decimals.

*share*

- The normalized PST share results by multiplying the user's balance by the share <code>factor f</code> and then dividing the product by the total token supply.

*vote*

- Your vote can either be Yes or No. You can change it anytime by calling the ```Change Vote``` transition.

#### Share

```
share = balance * f / total_supply
```

Thus, any share can be ```f``` at the most. When distributing a profit <code>P</code>, the total income from that profit gets divided by ```f``` and multiplied by each user's share to calculate their personal income.

```
personal_income = P / f * share
```

#### Vote

A vote can be ```Yes``` or ```No```, and it defaults to ```Yes```. In all profit distributions, each vote gets counted, which settles the voting decision to either ```Yes``` or ```No```. Then, every user vote defaults back to ```Yes```. If the user wants so, they can change their vote by calling the ```Change Vote``` transition. The voting decision gets settled by the procedure ```Update Vote Decision``` (recursively called by the Distribute Profit procedure).

### Proxy transitions

- Upgrade Implementation.

- Update Admin.

- Update fund address: the fund of the profit-sharing community sends $ZIL to buy & distribute the PST to token holders by calling the ```Swap ZIL For PST And Distribute``` transition.

- Pause & unpause.

- Block & unblock.

- Increase and decrease Minter allowance.

- Mint & its callback.

- Burn & its callback.

- Law enforcement wiping burn & its callback.

- Transfer & its callback.

- Increase, decrease Spender allowance & their callback.

- Transfer from & its callback.

- Swap $ZIL for $PST and distribute & its callback: any address can send $ZIL to buy $PST directly from ZilSwap and distribute them among a list of Beneficiaries.

- Change vote.

## Implementations

The profit-sharing token Implementation can be a:

- new token: [PSTi.tyron smart contract](./new-token/PSTi.tyron.scilla)

- wrapped token: [xPSTi.tyron smart contract](./wrapped-token/xPSTi.tyron.scilla)

> You can also access any other <code>.tyron</code> smart contract open-source code by searching in the [SSI Browser](https://ssibrowser.com) by name, e.g. ```pst.tyron```, ```psti.tyron```, ```xpsti.tyron```, etc.

### Implementations transitions

Both Implementations share the following transitions:

- Update Admin: to set the administrator's address up to date, the Admin calls this transition directly (i.e. not through the Proxy).

- Update pauser: direct call from Admin to update the address of the pauser.

- Pause & unpause: only the pauser can call these transitions through the Proxy. When the contract is on pause, no incoming transaction other than ```Unpause``` will go through the Implementation.

- Update Lister: direct call from Admin to update the address of the Lister, that is the entity responsible for blocking and unblocking user addresses.

- Block & unblock: the Implementation makes sure that the Lister is the ```_origin``` of these transactions and that they come from the Proxy.

- Law enforcement wiping burn: when a user's address gets blocked, their account can get removed by the Lister calling this transition.

- Transfer: a transfer request gets accepted when being made through the Proxy. Then the Implementation remote reads the Originator's account from the Proxy and makes sure their balance is sufficient. It remote reads the Beneficiary's account and adds the transfer amount to their account's balance. Finally, sends a message back to the Proxy with the updated balances and messages to both the Originator and Beneficiary.

- Increase and decrease Spender allowance: a Spender is anyone authorized by the user to spend their funds - it is a third party that can transfer the allowance that the user has specified in the ```Increase Allowance``` transition. When both increasing and decreasing allowance, the Implementation remote reads from the Proxy the current allowance of the given Spender and adds or subtracts the allowance amount, respectively. Lastly, the Implementation sends a message to the Proxy with the new allowance.

- Transfer from: this transaction gets executed by a Spender through the Proxy. The Implementation remote reads from the Proxy the Originator's and Beneficiary's accounts, as well as the Spender's allowance. Then it makes the corresponding updates.

### New token transitions

The ```Mint```, ```Burn``` and ```Swap ZIL For PST And Distribute``` transitions vary depending on the Implementation.

- Update Main Minter: direct call from Admin to update the address of the Main Minter, that is the entity responsible for increasing and decreasing Minters' allowances.

- Increase and decrease Minter allowance: the Main Minter must be the ```_origin``` of these transactions.

- Mint: a Minter can create new tokens according to their allowance and send them to a Beneficiary.

- Burn: a Minter can eliminate their balance's funds in a ```Burn``` transaction.

- Swap $ZIL for $PST and distribute: the Proxy makes this call to the Implementation, so the latter executes a swap on ZilSwap, exchanging the amount of $ZIL sent by the Originator for $PST. Therefore, the profit-sharing community generates demand for the profit-sharing token directly on ZilSwap.

### Wrapped token transitions

A wrapped PST has no Minters since every new PST is a wrap of an existing token.

- Mint: to create a wrapped token, the Originator must first increase the allowance of the Implementation as the Spender of the initial token. Then the Implementation will execute a ```Transfer From``` transition to itself, create the wrapped tokens and send them to the Beneficiary.

- Burn: any user can burn their balance of PST which means transferring the initial token back to them (i.e. the Implementation executes a ```Transfer``` of the initial token to the Originator).

- Swap $ZIL for $PST and distribute: the Proxy makes this call to the Implementation, so the latter executes a swap on ZilSwap, exchanging the amount of $ZIL sent by the Originator for the initial token. Then, the Implementation wraps these tokens, minting new wrapped profit-sharing tokens. A different version of this Implementation could swap $ZIL for the $PST instead.

## Acknowledgements

We thank the Singapore dollar $XSGD stable-coin open-source software, [smart-contract code](https://github.com/Xfers/StraitsX-tokens/tree/master/Zilliqa) developed by [Xfers](https://www.xfers.com/sg?) for being the initial fork to develop the profit-sharing token smart contracts.

We thank [Zillacracy](https://zillacracy.com/) as well for its financial support to develop these specifications.
