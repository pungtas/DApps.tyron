## **Parts of the $SI Smart Contract**

**```Library```**: Contains purely mathematical functions like Program Constants, Utility Functions, the Match Statements, and the contract's functions. 

**```Immutable parameters```**: These values must get defined at contract deployment, and you cannot modify them afterwards. They can be used anywhere in the contract, but they are usually useful as initial values for the fields.
- Init Controller 
- Proxy
- Init token
- Init Community

**```Fields```**: Represent the mutable state (mutable variables) of the contract, and each declaration must be prefixed with the keyword field.
- Controller
- Paused
- Insurance 
- Pauser
- Lister
- Blocked
- Counter
- Token #
- Community #

**```Procedures```**: Procedures perform specific functionalities; they are not part of the public interface of the contract and may not be invoked by sending a message to the contract. The only way to invoke a procedure is to call it from a transition or another procedure. 

- Throw error
- Throw if not proxy
- Verify controller
- Is pauser
- Is paused
- Is not paused
- Is lister
- Is blocked
- Is not null
- Is not blocked
- Throw if same address
- Is sufficient
- Is valid to self
- Transfer NFT username upgrade

**```Transitions```**: Define how the state of the contract may change. The contract transitions are the public interface for the contract since transitions may be invoked by sending a message to the contract. 
These are defined with the keyword transition followed by the parameters to be passed.

- Update controller
- Update pauser
- Pause
- Unpause
- Update lister
- Block
- Unblock
- Update insurance
- Update token #
- Update community #
- Mint
- Burn success call-back #
- Transfer
- Increase allowance
- Decrease allowance
- Burn
- Mint success call- back #
- Transfer from
- Transfer NFT username upgrade
- Recalibrate
- Update treasury