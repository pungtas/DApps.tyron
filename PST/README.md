# Profit-sharing tokens

A profit-sharing token (PST) enables token holders to become shareholders of the organization behind the PST. The organization can provide products and services to users and collect fees or donations. A PST is a new kind of cryptocurrency that, besides giving token holders the monetary value of the fungible token, also provides: 

- governance rights to community members;

- personal passive income to their members by distributing the organization's profits among token holders.

The profit distribution is coded into the [PST.tyron smart contract](./pst.tyron.scilla) based on the share of each token holder, meaning that if you own 1% of the PST supply, you will get 1% of the profits in every cycle (be it monthly, quarterly, yearly or as defined by the organization).

The organization behind a PST enacts a profit-sharing community (PSC), and its governance should aim at being decentralized. For that purpose, the PST has a voting mechanism when distributing the profits: the smart contract collects the vote of each token holder and ponderates their votes according to their shares, which means that if you own 1% of the PST supply, you will have 1% of the voting decision. Through decentralized governance, the PSC decides what the quorum is and how much the fees are. Fees can get collected depending on the products and services provided by the organization. Communities can also be charities or receive donations, peer-to-peer.

## Proxy smart contract

The PST proxy smart contract keeps track of the user accounts and the address of the implementation contract to upgrade the latter when necessary. Every user call must be to the proxy, and then this sends a message to the current implementation.

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

- Upgrade implementation.

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

- Swap $ZIL for $PST and distribute & its callback: any address can send $ZIL to buy $PST directly from ZilSwap and distribute them among a list of beneficiaries.

- Change vote.

## Implementations

The profit-sharing token implementation can be a:

- new token: [PSTi.tyron smart contract](./new-token/PSTi.tyron.scilla)

- wrapped token: [xPSTi.tyron smart contract](./wrapped-token/xPSTi.tyron.scilla)

> You can also access any other <code>.tyron</code> smart contract open-source code by searching in the [SSI Browser](https://ssibrowser.com) by name, e.g. ```pst.tyron```, ```psti.tyron```, ```xpsti.tyron```, etc.

Both implementations share the following:

### Implementations transitions

Both implementations share the following transitions:

- Update Admin: to set the administrator's address up to date, the Admin calls this transition directly (i.e. not through the proxy).

- Update pauser: direct call from Admin to update the address of the pauser.

- Pause & unpause: only the pauser can call these transitions through the proxy. When the contract is on pause, no incoming transaction other than ```Unpause``` will go through the implementation.

- Update Lister: direct call from Admin to update the address of the Lister, that is the entity responsible for blocking and unblocking user addresses.

- Block & unblock: the implementation makes sure that the Lister is the ```_origin``` of these transactions and that they come from the proxy.

- Law enforcement wiping burn: when a user's address gets blocked, their account can get removed by the Lister calling this transition.

- Update Main Minter: direct call from Admin to update the address of the Main Minter, that is the entity responsible for increasing and decreasing Minters' allowances.

- Increase and decrease Minter allowance: the Main Minter must be the ```_origin``` of this transaction.

- Transfer.

- Increase and decrease Spender allowance.

- Transfer from.

## Acknowledgements

We thank the Singapore dollar $XSGD stable-coin open-source software, [smart-contract code](https://github.com/Xfers/StraitsX-tokens/tree/master/Zilliqa) developed by [Xfers](https://www.xfers.com/sg?) for being the initial fork to develop the profit-sharing token smart contracts.

We thank [Zillacracy](https://zillacracy.com/) as well for its financial support to develop these specifications.
