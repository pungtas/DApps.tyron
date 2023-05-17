# DEFIxWALLET

DEFIxWALLET is a Decentralised Finance Smart Contract Wallet designed to provide secure and convenient management of your SSI (Self-Sovereign Identity) account in the world of DeFi.

The open-source code is available here: [DEFIxWALLET v0.12](./DEFIxWALLET_v0.12.scilla)

## Features

- **Secure**: DEFIxWALLET utilises the power of blockchain technology to ensure the security and immutability of your SSI account and transactions.
- **Decentralised**: The wallet operates on Zilliqa, a decentralised public network, removing the need for intermediaries and enabling you to have full control over your funds.
- **Smart Contracts**: DEFIxWALLET leverages smart contracts to facilitate seamless interaction with various DeFi protocols, including decentralised exchanges, staking, liquid staking, and more, such as the $TYRON S$I Governing & Profit-Sharing Community.
- **Swap Any Token**: Easily swap any token in different/multiple decentralised exchanges directly from within the wallet, providing you with access to a wide range of trading options.
- **$ZIL Staking**: Stake your $ZIL tokens directly on Zillion, the non-custodial staking dApp, earning staking rewards while keeping control of your funds.
- **Liquid Staking**: Take advantage of Avely liquid staking capabilities, allowing you to stake your assets while maintaining their liquidity in stZIL for additional DeFi opportunities.
- **Social Recovery**: Protect your DeFi assets with Social Recovery by using your NFT domain as the contract owner instead of a regular address. This way, your DEFIxWALLET ensures enhanced security and safer recovery options.
- **User-Friendly Interface**: The wallet will provide a user-friendly interface on the [SSI Browser](https://tyron.network), making it easy to navigate and manage your SSI account and DeFi activities on various decentralised finance protocols.
- **Interoperability**: DEFIxWALLET is compatible with multiple DeFi protocols, allowing you to access and interact with different decentralised applications.
- **Community and Support**: Join our vibrant community of SSI and DeFi enthusiasts to learn, share ideas, and receive support for any queries or issues you may have.

## Supported transactions

To get the most out of your DEFIxWALLET, all the following transactions are supported:

1. **Configuration**: _UpdateDomain_ (to change the contract owner), _AcceptPendingDomain_, _Pause_, _Unpause_, and _UpdateDeadline_.
2. **Wallet**: _AddFunds_ and _SendFunds_ for $ZIL tokens. And for ZRC2 tokens: _RecipientAcceptTransfer_, _RecipientAcceptTransferFrom_, _Transfer_, _TransferSuccessCallBack_, and _UpdateAllowance_.
3. **DEXs**: _AddLiquidity_, _RemoveLiquidity_, _SwapExactZILForTokens_, _SwapExactTokensForZIL_, and _SwapExactTokensForTokens_.
4. **Staking**: _DelegateStake_, _DelegateStakeSuccessCallBack_, _WithdrawStakeRewards_, _WithdrawStakeRewardsSuccessCallBack_, _WithdrawStakeAmt_, _WithdrawStakeAmtSuccessCallBack_, _CompleteWithdrawal_, _CompleteWithdrawalSuccessCallBack_, _CompleteWithdrawalNoUnbondedStakeCallBack_, _ReDelegateStake_, _ReDelegateStakeSuccessCallBack_, _RequestDelegatorSwap_, _ConfirmDelegatorSwap_, _RevokeDelegatorSwap_, and _RejectDelegatorSwap_.
5. **Liquid Staking**: _DelegateLiquidStake_, _WithdrawTokensAmt_, _WithdrawTokensAmtSuccessCallBack_, and _ChownStakeConfirmSwap_.

## Contributing

Contributions to DEFIxWALLET are welcome! To share suggestions, bug reports, or if you would like to contribute to the wallet's development, please send a pull request.

## Contact

For any inquiries or support, you can reach us at pungtas@ssiprotocol.com or join our community on [Telegram](https://t.me/ssiprotocol).

