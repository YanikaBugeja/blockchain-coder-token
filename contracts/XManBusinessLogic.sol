// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./XManToken.sol";

contract XManBusinessLogic is XManToken {

    uint256 digitsDNA = 16;
    uint XManTokenCost = 100;
    uint modulusDNA = 10 ** digitsDNA;

    address private owner;
    event NewXMan(string name, uint dna);
    event OwenerSet (address indexed oldOwner, address indexed newOwner);

    struct XMan {
        string name;
        uint dna;
    }

    XMan[] public xmen;

    mapping (address => uint) ownerXManCount;
    mapping (address => XMan[]) public xMenToOwner;

    modifier isOwner() {
        require(msg.sender == owner, "Owner Not Identified");
        _;
    }

    constructor() {
        owner = msg.sender;
        emit OwenerSet(address(0), owner);
    }

    function changeOwner(address newOwner) public isOwner {
        owner = newOwner;
        emit OwenerSet(owner, newOwner);
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function _createXMan(string memory _name, uint _dna) internal {
        XMan[] storage xmenOwner = xMenToOwner[msg.sender];
        xmenOwner.push(XMan(_name, _dna));
        emit NewXMan(_name, _dna);
    }

    function getXManCount() external view returns (uint) {
        XMan[] storage xmenOwner = xMenToOwner[msg.sender];
        return xmenOwner.length;
    }

    function returnXMan(uint index) external view returns (string memory, uint) {
        XMan[] storage xmenOwner = xMenToOwner[msg.sender];
        XMan memory xman = xmenOwner[index];
        return (xman.name ,xman.dna);
    }

    function _generateRandomDNA(string memory _str) private view returns (uint) {
        uint random = uint(keccak256(abi.encodePacked(_str)));
        return random % modulusDNA;
    }

    function createRandomXMan(string memory _name, uint amount) public payable{
        require(amount >= XManTokenCost, "100 XMT Minimum Tokens Required");

        transfer(owner, amount);

        uint randomDNA = _generateRandomDNA(_name);
        _createXMan(_name, randomDNA);
    }
}
