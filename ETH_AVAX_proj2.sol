// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract VotingSystem {
    mapping(string => uint256) private votes;

    event VoteCasted(string candidate, uint256 votes);

    function vote(string memory candidate) public {
        votes[candidate]++;
        emit VoteCasted(candidate, votes[candidate]);
    }

    function getVotes(string memory candidate) public view returns (uint256) {
        return votes[candidate];
    }
}
