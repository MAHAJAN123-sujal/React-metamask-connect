import React, { useState } from 'react';
import { ethers } from 'ethers';

import ContractABI from './ContractABI.json';

const WalletCard = () => {

    const ContractAdd = '0xE9Fd6c60D5051072FeF94175b506B3417fB65088';

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect wallet');

    const [voteCount, setVoteCount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    const connWalletHandler = () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangedHandler(result[0]);
                    setConnButtonText('Connected..!!');
                })
        } else {
            setErrorMessage("Metamask Not Installed");
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        updateEthers();
    }

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        let tempContract = new ethers.Contract(ContractAdd, ContractABI, tempSigner);
        setContract(tempContract);
    }

    const voteHandler = (event) => {
        event.preventDefault();
        const candidate = event.target.candidateName.value;
        contract.vote(candidate)
            .then(() => {
                getVotes(candidate);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const getVotes = async (candidate) => {
        let votes = await contract.getVotes(candidate);
        setVoteCount(votes.toString());
    }

    return (
        <>
            <h3>Voting System using Smart Contract</h3>
            <button onClick={connWalletHandler}>{connButtonText}</button>

            <h4>Address: {defaultAccount}</h4>

            <form onSubmit={voteHandler}>
                <input id='candidateName' type="text" placeholder="Candidate Name" />
                <button type={"submit"}>Vote</button>
            </form>

            <form onSubmit={(e) => { e.preventDefault(); getVotes(e.target.candidateName.value); }}>
                <input id='candidateName' type="text" placeholder="Candidate Name" />
                <button type={"submit"}>Get Vote Count</button>
            </form>

            <div>
                {voteCount !== null && <p>Vote Count: {voteCount}</p>}
            </div>

            {errorMessage}
        </>
    )
}

export default WalletCard;
