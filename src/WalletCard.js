import React, {useState} from 'react';
import { ethers } from 'ethers';

import ContractABI from './ContractABI.json';


const WalletCard = () =>{

    const ContractAdd = '0x7c401A5d02Ab48AA4F19c2e43Bf495198355211C';

    const [errorMessage,setErrorMessage] = useState(null);
    const [defaultAccount,setDefaultAccount]  = useState(null);
    const [connButtonText,setConnButtonText] = useState('Connect wallet');

    const [currContractVal,setCurrContractVal] = useState(null);

    const [provider,setProvider] = useState(null);
    const [signer,setSigner] = useState(null);
    const [contract,setContract] = useState(null);

    const connWalletHandler = ()=>{
        if(window.ethereum){
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(result =>{
                accountChangedHandler(result[0]);
                setConnButtonText('Connected..!!');
            })
        }
        else{
            setErrorMessage("Metamask Not Installed");
        }
    }

    const accountChangedHandler = (newAccount) =>{
        setDefaultAccount(newAccount);
        updateEthers();
    }

    const updateEthers = () =>{
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        let tempContract = new ethers.Contract(ContractAdd, ContractABI, tempSigner);
        setContract(tempContract);
    }

    const getCurrVal = async() =>{
        let val = await contract.get();
        setCurrContractVal(val);
    }

    const setHandler = (event) =>{
        try{
            event.preventDefault();
            contract.set(event.target.setText.value);
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <>
        <h3>Getting and setting up message using Smart Contract</h3>
        <button onClick={connWalletHandler}>{connButtonText}</button>
        
        <h4>Address: {defaultAccount}</h4>
        

        <form onSubmit={setHandler}>
            <input id='setText' type="text" />
            <button type={"submit"}>Set Current text</button>
        </form>

        <button onClick={getCurrVal}>Get current value</button>
        <div>
            {currContractVal}
        </div>

        {errorMessage}
        </>
    )
}

export default WalletCard; 