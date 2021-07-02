# Profit-Sharing Tokens

A Profit-Sharing Token (PST) enables token holders to become shareholders of the organization behind the PST, which provides products and services to users. It is a new kind of cryptocurrency that - besides giving token holders the monetary value of the fungible token - also provides governance rights and, more importantly, a passive income by distributing the organization's profits among token holders. Such a distribution is coded into the PST smart contract based on the share of each token holder, meaning that if you own 10% of the PST supply, you will get 10% of the profits in every cycle (be it monthly, quarterly, yearly, among others).

The organization behind a PST enacts a Profit-Sharing Community (PSC), and its governance should aim at being decentralized. For that purpose, the PST has a voting mechanism when distributing the profits: the smart contract collects the vote of each token holder and ponderates their votes according to their shares, which means that if you own 10% of the PST supply, you will have 10% of the voting decision. Through decentralized governance, the PSC decides what the quorum is and how much the fees are. Fees can get collected depending on the products and services provided by the organization.

## Proxy smart contract

The PST proxy smart contract keeps track of the user accounts and the address of the implementation contract to upgrade the latter when necessary. Every user call must be to the proxy, and then this sends a message to the current implementation.

### User account

The user account gets constituted by their balance of PSTs, their normalized share and their vote. The normalized PST share results by multiplying the user's balance by the share factor "f" and then dividing the product by the total token supply.  

#### Share

```
share = (balance * f)/ total_supply
```

Thus, any share can be "f" at the most. When distributing a profit P, this gets divided by the factor "f" and then multiplied by each user's share to calculate their income.

```
user_profit_share = P/f * share
```

#### Vote

A vote can be Yes or No, and it defaults to Yes. In all profit distributions (when counting and collecting the voting decisions), every user vote defaults back to Yes. If the user wants so, they can change their vote by calling the ```Change Vote``` transition.

The voting decision gets settled by the ```Update Vote Decision``` procedure (which gets called by the ```Distribute Profit``` procedure).

### Transitions

- Upgrade implementation

- Update proxy's admin

- Update fund address: the fund of the Profit-Sharing Community sends $ZIL to buy & distribute the PST to token holders by calling the ```Swap ZIL For PST And Distribute``` transition.

- Pause & unpause

- Block & unblock

- Increase and decrease minter allowance

- Mint & its callback

- Burn & its callback

- Law enforcement wiping burn & its callback

- Transfer & its callback

- Increase, decrease allowance & its callback

- Transfer from & its callback

- Swap $ZIL for $PST and distribute & its callback: any address can send $ZIL to buy $PST directly from ZilSwap and distribute them among a list of beneficiaries.

- Change vote
