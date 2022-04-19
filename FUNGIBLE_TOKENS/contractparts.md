# Contract Parts - Fungible Tokens

One of the basic rules of smart contracts is that they cannot be changed once it is deployed, which means that they are immutable. However, to manage Fungible Tokens accounts, an upgradeable smart contract that uses a special **Proxy** pattern is necessary to keep track of user balances.

This contract is a storage layer that users interact with directly and is in charge of forwarding transactions to and from the second contract, the **Implementation**, which contains the logic.

This second contract uses the business logic that users want to interact with, but instead of interacting directly with the contract, they call functions of the proxy contract.
In other words, the user interacts with the Implementation contract through the Proxy contract. This is made possible by the proxy contract's ability to store the address of the logical contract. And as a result of this chaining, it is possible to change the implementation contract to a different one.

In this case, the [Implementation](./tokeni.tyron.scilla) automates the token release for the purchased tokens. During that period, a vesting schedule takes place to release the tokens gradually.  
And the [Proxy](./token.tyron.scilla) keeps track of the user balances and spender allowances, in addition to storing the address of the logic contract. 

--- 

## Structure:

## *Proxy*:
### Immutable Parameters:
- contract_owner
- Init_supply
- Init_balances

### Fields:
- Implementation
- Balances
- Total_supply
- Allowances

### Procedures:
- ThrowError
- VerifyCaller

### Transitions:
- UpdateImplementation
- Mint
- Burn
- TransmuteCallBack
- Transfer
- TransferCallBack
- IncreaseAllowance
- DecreaseAllowance
- AllowanceCallBack
- TransferFrom

---

## *Implementation*:

### Immutable Parameters:
- Init_controller
- Proxy

### Fields:
- Controller
- Paused
- Fund
- Insurance
- Pauser
- Minter
- Lister
- Blocked
- Accounts
- Lockup_period
- Counter

### Procedures:
- Throw Error
- Throw If Not Proxy
- Verify Controller
- Is Pauser
- Is Paused
- Is Not Paused
- Is LIster
- Is Blocked
- Is Not Null
- Is Not Blocked
- Is Minter
- Throw If Same Addr
- Is Sufficient
- Is Vested
- Transfer NFT Username Upgrade

### Transitions:
- Update Controller
- Update Pauser
- Pause
- Unpause
- UpdateMinter
- UpdateLister
- Block
- Unblock
- UpdateFund
- Update Insurance
- Update Lockup
- Add Acount
- Mint
- Transfer
- Increase Allowance
- Decrase Allowance
- Burn
- Transfer From
- Transfer NFT Username Upgrade
- Recalibrate
- Update Treasury