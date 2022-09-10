/*
permawallet.tyron: permaweb wallet smart contract
Self-Sovereign Identity Protocol
Copyright Tyron Mapu Community Interest Company 2022. All rights reserved.
You acknowledge and agree that Tyron Mapu Community Interest Company (“Tyron”) (or Tyron’s licensors) own all legal right, title and interest in and to the work, software, application, source code, documentation and any other documents in this repository (collectively, the “Program”), including any intellectual property rights which subsist in the Program (whether those rights happen to be registered or not, and wherever in the world those rights may exist), whether in source code or any other form.
Subject to the limited license below, you may not (and you may not permit anyone else to) distribute, publish, copy, modify, merge, combine with another program, create derivative works of, reverse engineer, decompile or otherwise attempt to extract the source code of, the Program or any part thereof, except that you may contribute to this repository.
You are granted a non-exclusive, non-transferable, non-sublicensable license to distribute, publish, copy, modify, merge, combine with another program or create derivative works of the Program (such resulting program, collectively, the “Resulting Program”) solely for Non-Commercial Use as long as you:
1. give prominent notice (“Notice”) with each copy of the Resulting Program that the Program is used in the Resulting Program and that the Program is the copyright of Tyron; and
2. subject the Resulting Program and any distribution, publication, copy, modification, merger therewith, combination with another program or derivative works thereof to the same Notice requirement and Non-Commercial Use restriction set forth herein.
“Non-Commercial Use” means each use as described in clauses (1)-(3) below, as reasonably determined by Tyron in its sole discretion:
1. personal use for research, personal study, private entertainment, hobby projects or amateur pursuits, in each case without any anticipated commercial application;
2. use by any charitable organization, educational institution, public research organization, public safety or health organization, environmental protection organization or government institution; or
3. the number of monthly active users of the Resulting Program across all versions thereof and platforms globally do not exceed 10,000 at any time.
You will not use any trade mark, service mark, trade name, logo of Tyron or any other company or organization in a way that is likely or intended to cause confusion about the owner or authorized user of such marks, names or logos.
If you have any questions, comments or interest in pursuing any other use cases, please reach out to us at mapu@ssiprotocol.com.*/

export function handle( state, action ){
    const input = action.input;
    const id = input.id;
    const key = input.key;
    
    if( state.ssi !== action.caller ){
        throw new ContractError('Wrong caller.')
    }

    if( input.function === 'ssi' ){
        const addr = input.ssi;
        if( typeof addr !== 'string' ){
            throw new ContractError(`Invalid address: ${ addr }.`)
        }
        state.ssi = addr;

        return { state }
    }

    if( input.function === 'ssiComm' ){
        const ssicomm = input.ssicomm;
        if( typeof key !== 'string' ){
            throw new ContractError(`Invalid key: ${ key }.`)
        }

        state.ssiComm = ssicomm;
        state.keys.ssiComm = key;

        return { state }
    }

    if( input.function === 'trp' ) {
        const message = input.trmessage;
        const trkey = input.trkey;
        
        if( typeof trkey !== 'string' ){
            throw new ContractError(`Invalid Travel Rule SSI Key: ${ trkey }.`)
        }

        state.trp.message = message;
        state.trp.key = trkey;

        return { state }
    }

    if( input.function === 'registerKey' ){
        if( typeof id !== 'string' || id.length < 3) {
            throw new ContractError(`Invalid ID: ${ id }.`)
        }
    
        if( typeof key !== 'string' ){
            throw new ContractError(`Invalid key: ${ key }.`)
        }

        if( !state.keys[id] ){
            state.keys[id] = key;
        } else {
            throw new ContractError('Key ID already registered.')
        }

        return { state }
    }
  
    if( input.function === 'updateKey' ){
        if( typeof id !== 'string' || id < 3 ){
            throw new ContractError(`Invalid ID: ${ id }.`)
        }
    
        if( typeof key !== 'string'){
            throw new ContractError(`Invalid key: ${ key }.`)
        }

        if( !state.keys[id] ){
            throw new ContractError('Key ID not registered.')
        }

        state.keys[id] = key;
        
        return { state }
    }

    if( input.function === 'deleteKey' ){
        if( typeof id !== 'string' || id < 3 ){
            throw new ContractError(`Invalid ID: ${ id }.`)
        }
    
        if( typeof key !== 'string' ){
            throw new ContractError(`Invalid key: ${ key }.`)
        }

        if( !state.keys[id] ){
            throw new ContractError('Key ID not registered.')
        }

        delete state.keys[id];
        
        return { state }
    }

    throw new ContractError(`No function supplied or function not recognised: ${ input.function }`)
}
