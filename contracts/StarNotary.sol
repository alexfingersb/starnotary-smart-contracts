pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {

    struct Star {
        string name;
        string story;
        string ra;
        string dec;
        string mag;
        bool registered;
    }

    mapping(int256 => Star) public indexedToStarInfo;

    mapping(uint256 => Star) public tokenIdToStarInfo;

    mapping(uint256 => uint256) public mappingStarsForSale;

    int256 index = 1;

    modifier uniqueStar(string _ra, string _dec, string _mag) {
        uint256 tokenId = createTokenId(_ra, _dec, _mag);
        bool registered = tokenIdToStarInfo[tokenId].registered;
        require(!registered, "This star has already been registered");
        _;
    }

    function createStar(string _name, string _story, string _ra, string _dec, string _mag) public uniqueStar(_ra, _dec, _mag) {
        uint256 tokenId = createTokenId(_ra, _dec, _mag);
        Star memory newStar = Star(_name, _story, _ra, _dec, _mag, true);

        tokenIdToStarInfo[tokenId] = newStar;
        indexedToStarInfo[index++] = newStar;

        _mint(msg.sender, tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(this.ownerOf(_tokenId) == msg.sender,"Only owner can put stars for sale!");

        mappingStarsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(mappingStarsForSale[_tokenId] > 0, "Star not found!");

        uint256 starCost = mappingStarsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);

        require(msg.value >= starCost, "Insufficient value");

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);

        if (msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }

        starOwner.transfer(starCost);
    }

    function starsForSale(uint256 _tokenId) public view returns (uint256 price) {
        return mappingStarsForSale[_tokenId];
    }

    function checkIfStarExist(string _ra, string _dec, string _mag) public view returns (bool exists) {
        uint256 tokenId = createTokenId(_ra, _dec, _mag);
        return tokenIdToStarInfo[tokenId].registered;
    }

    function getStar(string _ra, string _dec, string _mag) public view returns (string name, string story, string ra, string dec, string mag) {
        uint256 tokenId = createTokenId(_ra, _dec, _mag);
        Star memory star = tokenIdToStarInfo[tokenId];
        return (star.name, star.story, star.ra, star.dec, star.mag);
    }

    function getStarByIndex(int256 _index) public view returns (string name, string story, string ra, string dec, string mag) {
        Star memory star = indexedToStarInfo[_index];
        return (star.name, star.story, star.ra, star.dec, star.mag);
    }

    function createTokenId(string _ra, string _dec, string _mag) public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(_ra, _dec, _mag)));
    }

}