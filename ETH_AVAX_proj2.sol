// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ETH_AVAX_proj2{
    string public textVal;

    event StoreText(string s);

    function set(string memory myText) public{
        textVal = myText;
        emit StoreText(myText);
    }

    function get() public view returns(string memory){
        return textVal;
    }
}
