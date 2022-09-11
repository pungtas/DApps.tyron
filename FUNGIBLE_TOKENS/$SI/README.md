# Self-Sovereign Identity Dollar

## I. Summary

The Self-Sovereign Identity Dollar (SSI Dollar, $SI) is a stablecoin, 100% decentralized and compatible with the Zilliqa fungible token standard (ZRC2), which is equivalent to one US dollar (USD). On the Zilliqa platform, such parity is represented as follows: 

```
1.0 $SI = 1.0 zUSDT
```

You can get an $SI loan by locking your assets (over-collateralization) while keeping ownership of them.

Supported collaterals are:

- ZIL

You can also swap from other stablecoins, such as zUSDT, to $SI.

SSI dollars can also come into existence through the transmutation of TYRON, which decreases the token supply. In this case, whenever you mint $SI, TYRON with the same value is burned.

The exchange rate to transmute TYRON into $SI gets read in real-time from the TYRON/$SI liquidity pair in the TYRON Governing & Profit-Sharing Community (TYRON Community DApp).

Rewards to the TYRON Community DApp get distributed to its participants by depositing them into the TYRON and $SI liquidity pools. Community participants can accrue their earnings by removing liquidity.
 
The SSI Dollar decentralized application allows $SI to be managed, tracked, owned, and traded peer-to-peer via wallets or exchanges, thanks to the ZRC-2 interface.

## II. Motivation

We are going through a period of humanitarian and economic crises, where many countries and communities are not getting their human rights fulfilled. Access to housing, education, services, decent food, etc., has become more complicated and problematic. The factor most strongly affecting this situation is the loss of purchasing power in emerging markets due to inflation, which is now also suffered by many developed countries.

In response to these crises, which so far show no signs of slowing down or remedying, this project presents a proposal for the creation of a 100% decentralized currency, which among its benefits, can offer conditions of stability and equal opportunities for the entire population, regardless of their identity conditions.

Creating this stable and decentralized coin has several functionalities that we consider very useful to counteract the economic situation we are currently facing. On the one hand, it is beneficial for creating conditions of stability in emerging markets. On the other hand, the way it gets made allows the user to maintain ownership of their assets and, simultaneously, get a loan in Self-Sovereign Identity Dollars. Then the user can use their $SI to provide liquidity in decentralized exchanges, join the TYRON Governing & Profit-Sharing Community and other DeFi applications, and make decentralized exchanges to other fiat currencies and peer-to-peer transfers.

## III. Specification

The Self-Sovereign Identity Dollar ($SI) consists of a stable and fully decentralized coin, which can be created by over-collateralising assets or swapping from other stablecoins. The $SI DApp is a Decentralized Finance (DeFi) application made of two smart contracts:

- [Proxy](./ssiDollar.scilla)

- [Implementation](./ssiDollarImpl.scilla)

## Smart contracts

The **```Library```** contains purely mathematical functions and constants, including utility functions with match statements and other the contract's functions. 

**```Immutable parameters```** are values defined at contract deployment, and you cannot modify them afterwards. They are available to use anywhere in the contract, but using them as initial values for the fields is a common practice.

#### Proxy

- ```contract_owner```: the implementation address
- ```name```: Self-Sovereign Identity Dollar
- ```symbol```: $SI
- ```decimals```: 12
- ```init_suppy```: 0
- ```init_balances```: empty

#### Implementation

- ```init_username```: tyronmapu.did (the DID Controller)
- ```proxy```: the proxy address
- ```init```: the Init DApp address
- ```init_factor```: 1000000
- ```init_zildex```: the DragonDex address

**```Fields```** are mutable variables representing the state of the contract, and each declaration is with the keyword **field**.

#### Proxy

- ```implementation```: the implementation address
- ```balances```: records of the users' balance
- ```total_supply```: the amount of Self-Sovereign Identity Dollar in existence
- ```allowances```: spender balances
- ```version```: contract version

#### Implementation

- ```nft_username```: tyronmapu.did (the DID Controller)
- ```pending_username```: to update the NFT Username
- ```xinit```: the Init DApp address
- ```pauser```: the address that can pause the contract
- ```paused```: status of the contract
- ```lister```: the address that can block and unblock users
- ```blocked```: the blocked addresses
- ```services```: the DID Services
- ```zilSsiRate```: the ZIL$SI exchange rate times the factor
- ```factor```: 1000000
- ```zil_dex```: the DragonDex address
- ```accounts```: the user accounts
- ```version```: contract version

**```Procedures```** perform specific functionalities; they are not part of the public interface of the contract and are thus not be invoked by sending a message to the contract. The only way to execute a procedure is to call it from a transition or another procedure. Each declaration is with the keyword **procedure**ß.

#### Proxy

- ```VerifyCaller```: when verifying the caller, only the DID Controller or implementation addresses are allowed
- ```ThrowIfSameAddr```: throws an error if both given addresses are the same

#### Implementation

- ```SupportTyron```: sends ZIL to the Donate DApp
- ```ThrowIfNotProxy```: verifies that the proxy is the address calling
- ```VerifyController```: authenticates that the DID Controller is the origin of the transaction
- ```IsPauser```: authenticates that the **pauser** is the origin of the transaction
- ```IsPaused``` & ```IsNotPaused```: verify the status of the contract
- ```IsLister```: authenticates that the **lister** is the origin of the transaction
- ```AmountIsNotNull```: confirms that the amount is not zero
- ```AddrIsNotNull```: proves that the address is not null
- ```IsBlocked``` & ```IsNotBlocked```: verify the status of the user address
- ```ThrowIfSameAddr```: throws an error if both given addresses are the same
- ```IsSufficient```: verifies that the balance is greater than the given amount
- ```ThrowIfSameName```: throws an error if both given usernames are the same
- ```IsValidToSelf```: throws an error if the given address is not the implementation
- ```FetchServiceAddr```: gets the address of a DID Service
- ```FetchSsiZilRate```: updates the ZIL$SI exchange rate
- ```LockZIL```: increases the ZIL locked in the user account
- ```ReleaseZIL```:  unlocks ZIL and sends them back to the owner

**```Transitions```** define how the state of the contract may change. They are the public interface of a smart contract since transitions get invoked by sending a message to the contract. To declare a transition, use the keyword **transition**.

#### Proxy

- ```UpdateImplementation```: to update the implementation address
- ```Mint```: to create $SI
- ```Burn```: to destroy $SI
- ```TransmuteCallBack```: balance callback from the implementation
- ```Transfer```: to send $SI from the originator to the beneficiary
- ```TransferCallBack```: updates the balances of the originator and the beneficiary
- ```IncreaseAllowance``` & ```DecreaseAllowance```: to modify the amount of $SI that a spender can transfer
- ```AllowanceCallBack```: updates the allowance of a given spender
- ```TransferFrom```: for a spender to send $SI from the originator to the beneficiary

#### Implementation

- ```UpdateUsername```: requests a new username for the DID Controller
- ```AcceptPendingUsername```: updates the username of the DID Controller
- ```UpdateFactor```: updates the value of the factor
- ```UpdatePauser```: updates the address of the **pauser**
- ```Pause``` & ```Unpause```: to change the status of the smart contract
- ```UpdateLister```: updates the address of the **lister**
- ```Block``` & ```Unblock```: to change the status of a user address
- ```UpdateZilDex```: updates the address of DragonDex
- ```AddFunds```: to increase the amount of ZIL locked in a user account
- ```Mint```: creates $SI
- ```RecipientAcceptTransferFrom```: receives tokens
- ```TransferFromSuccessCallBack```: confirms the release of tokens
- ```Burn```: destroys $SI and unlocks ZIL by calling the **ReleaseZIL** procedure
- ```Transfer```: sends $SI from the originator to the beneficiary
- ```IncreaseAllowance``` & ```DecreaseAllowance```: to modify the amount of $SI that a spender can transfer
- ```TransferFrom```: a spender sends $SI from the originator to the beneficiary