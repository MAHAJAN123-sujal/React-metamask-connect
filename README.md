# ETH_AVAX_proj2

This project connects a React application to MetaMask, allowing users to set and get a text message stored on the Ethereum blockchain using a smart contract.

## Description

The `ETH_AVAX_proj2` project includes a smart contract and a React frontend that interact with each other. The smart contract allows users to store and retrieve a text message, while the React application connects to MetaMask for user authentication and interaction with the smart contract.

## Contract Details

The `ETH_AVAX_proj2` smart contract is written in Solidity and includes the following functionalities:

### State Variables

- `string public textVal`: Stores the current text message.

### Events

- `event StoreText(string s)`: Emitted when a new text message is stored.

### Functions

#### set

```solidity
function set(string memory myText) public {
    textVal = myText;
    emit StoreText(myText);
}
```

#### get

```solidity
function get() public view returns (string memory) {
    return textVal;
}
```

## Frontend Details

The frontend of the `ETH_AVAX_proj2` project is a React application that interacts with the smart contract using ethers.js.

### Main Components

- **App.js**: Renders the `WalletCard` component.
- **WalletCard.js**: Contains the logic for connecting to MetaMask and interacting with the smart contract.

### Key Functions

#### App.js

```javascript
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WalletCard />
      </header>
    </div>
  );
}
```

#### WalletCard.js

- **connWalletHandler**: Connects to MetaMask.

```javascript
const connWalletHandler = () => {
    if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(result => {
                accountChangedHandler(result[0]);
                setConnButtonText('Connected..!!');
            });
    } else {
        setErrorMessage("Metamask Not Installed");
    }
};
```

- **accountChangedHandler**: Updates the account information.

```javascript
const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
};
```

- **updateEthers**: Sets up ethers.js provider, signer, and contract.

```javascript
const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
    let tempContract = new ethers.Contract(ContractAdd, ContractABI, tempSigner);
    setContract(tempContract);
};
```

- **getCurrVal**: Retrieves the current text message from the smart contract.

```javascript
const getCurrVal = async () => {
    let val = await contract.get();
    setCurrContractVal(val);
};
```

- **setHandler**: Sets a new text message in the smart contract.

```javascript
const setHandler = (event) => {
    event.preventDefault();
    contract.set(event.target.setText.value);
};
```

### Usage

```javascript
return (
    <>
        <h3>Getting and setting up message using Smart Contract</h3>
        <button onClick={connWalletHandler}>{connButtonText}</button>
        <h4>Address: {defaultAccount}</h4>
        <form onSubmit={setHandler}>
            <input id='setText' type="text" />
            <button type="submit">Set Current text</button>
        </form>
        <button onClick={getCurrVal}>Get current value</button>
        <div>{currContractVal}</div>
        {errorMessage}
    </>
);
```

## Deployment

### Smart Contract

To deploy the `ETH_AVAX_proj2` smart contract:

1. Open [Remix](https://remix.ethereum.org/).
2. Create a new file and paste the smart contract code.
3. Compile the contract.
4. Deploy the contract to your desired Ethereum network.

### React Application

To run the React application:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`.
4. Start the application: `npm start`.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Authors

Sujal Mahajan

## Contributing

Contributions are welcome! Feel free to submit changes or improvements.

---

This README provides a concise guide to understanding, deploying, and using the `ETH_AVAX_proj2` smart contract and React application.
