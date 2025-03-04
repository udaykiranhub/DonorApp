// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {


    struct Donor {
        string name;
        string bloodType;
    }

    mapping(uint256 => Donor) private donors; 
    mapping(uint256 => bool) private donorExists;
    uint256 public donorCount;  

    event DonorRegistered(uint256 donorID, string name, string bloodType);

    function registerDonor(uint256 _donorID, string calldata _name, string calldata _bloodType) external {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_bloodType).length > 0, "Blood type cannot be empty");
        require(_donorID > 0, "Invalid donor ID");
        require(!donorExists[_donorID], "Donor already registered");

       
        donors[_donorID] = Donor(_name, _bloodType);
        donorExists[_donorID] = true;
        donorCount++;

        emit DonorRegistered(_donorID, _name, _bloodType);
    }

  function getDonorByID(uint256 _donorID) external  view returns (bytes memory) {
    require(donorExists[_donorID], "Donor not found");
    return abi.encode(donors[_donorID]);
}


    function donorExistsCheck(uint256 _donorID) public view returns (bool) {
        return donorExists[_donorID];
    }
}
