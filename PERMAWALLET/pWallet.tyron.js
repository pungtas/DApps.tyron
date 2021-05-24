/*
PERMAWALLET.tyron: SSI permawallet smart contract.
Tyron Self-Sovereign Identity Protocol.
Copyright (C) Tyron Pungtas and its affiliates.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

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
