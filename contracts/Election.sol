//SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

contract Election {
    
    // Constructor
    constructor () {
        addCandidate("candidate 1");
        addCandidate("candidate 2");
    }

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    mapping(uint => Candidate) public candidates; 
    mapping(address=>bool) public voters; 
    uint public candidatesCount;

    function addCandidate(string memory name) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, name, 0);

    }

    function vote(uint _candidateId) public {
      require(!voters[msg.sender], "not the voter");

      require(_candidateId > 0 && _candidateId <=candidatesCount, "not equal to candidate count");  
      voters[msg.sender]=true;
      candidates[_candidateId].voteCount ++;
      emit votedEvent(_candidateId);
    }

   event votedEvent ( uint indexed _candidateId);
}