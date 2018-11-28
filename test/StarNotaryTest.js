const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => {

    let tokenId;

    const starName = "Star power 103!";
    const starStory = "I love my wonderful star";
    const starCent = "ra_032.155";
    const starDec = "dec_121.874";
    const starMag =  "mag_245.978";

    beforeEach(async function () {
        this.contract = await StarNotary.new({from: accounts[0]});
        tokenId = await this.contract.createTokenId(starCent, starDec, starMag)
    })

    describe('can create a star', () => {
        it('create a star and and check its data', async function() {
            await this.contract.createStar(starName, starStory, starCent, starDec, starMag)
            let star = await this.contract.tokenIdToStarInfo(tokenId);
            assert.deepEqual(star,[starName, starStory, starCent, starDec, starMag, true])
        })

        it('create a star and get it by index one', async function() {
            await this.contract.createStar(starName, starStory, starCent, starDec, starMag)
            let star = await this.contract.indexedToStarInfo(1);
            assert.deepEqual(star,[starName, starStory, starCent, starDec, starMag, true])
        })

        it('check if the star exists with coordinates', async function() {
            await this.contract.createStar(starName, starStory, starCent, starDec, starMag)
            assert.isTrue(await this.contract.checkIfStarExist(starCent, starDec, starMag));
        })

        it('check if the star do not exists with coordinates', async function() {
            assert.isFalse(await this.contract.checkIfStarExist(starCent, starDec, starMag));
        })

        it('can register a star that has been registered', async function() {
            let user1 = accounts[1]
            await this.contract.createStar(starName, starStory, starCent, starDec, starMag, {from: user1})
        })
    })

    describe('buy and selling stars', async function() {
        let user1 = accounts[1]
        let user2 = accounts[2]
        let starPrice = web3.toWei(.01,'ether')

        beforeEach(async function() {
            await this.contract.createStar(starName, starStory, starCent, starDec, starMag, {from: user1})
        })

        describe('user1 can sell a star', () => {
            it('user1 can put up their star for sale', async function() {
                await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})
                assert.equal(await this.contract.starsForSale(tokenId), starPrice)
            })

            it('user1 gets the funds after selling a star', async function() {
                let starPrice = web3.toWei(.05,'ether')
                await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})

                let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
                await this.contract.buyStar(tokenId, {from: user2, value: starPrice})
                let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)

                assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(),
                        balanceOfUser1AfterTransaction.toNumber())
            })
        })

        describe('user2 can buy a star that was put up for sale', () => {
            beforeEach(async function() {
                await this.contract.putStarUpForSale(tokenId, starPrice, {from: user1})
            })

            it('user2 is the owner of the star after they buy it', async function() {
                await this.contract.buyStar(tokenId, {from: user2, value: starPrice})

                assert.equal(await this.contract.ownerOf(tokenId), user2)
            })

            it('user2 correctly has their balance changer', async function() {
                let overpaidAmount = web3.toWei(.05, 'ether')

                const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
                await this.contract.buyStar(tokenId,{from:user2, value: overpaidAmount, gasPrice: 0})
                const balanceOfUser2AfterBuyStar = web3.eth.getBalance(user2)

                assert.equal(balanceOfUser2BeforeTransaction.sub(balanceOfUser2AfterBuyStar), starPrice)
            })
        })
    })

    describe('test for approve', async function() {
        let user1 = accounts[1];
        let user2 = accounts[2];

        describe('can transfer single star rights', function() {

            it('user1 can transfer the star rights', async function() {
                await this.contract.createStar(starName, starStory, starCent, starDec, starMag, {from: user1});
                await this.contract.approve(user2, tokenId, {from: user1});
                let approvedAddress = await this.contract.getApproved(tokenId);
                assert.equal(user2, approvedAddress);
            });

            it('user2 can transfer the star', async function() {
                await this.contract.createStar(starName, starStory, starCent, starDec, starMag, {from: user2});
                await this.contract.safeTransferFrom(user2, user1, tokenId, {from: user2});
                assert.equal(await this.contract.ownerOf(tokenId), user1);
            });
        });

        describe('can transfer multiple star rights', async function() {
            it('user1 can transfer all rights to user 2', async function() {
                await this.contract.createStar(starName, starStory, starCent, starDec, starMag, {from: user1});
                await this.contract.setApprovalForAll(user2, true, {from: user1});

                assert.isTrue(await this.contract.isApprovedForAll(user1, user2));
            });

            it('user2 can transfer all stars', async function() {
                await this.contract.createStar(starName, starStory, starCent, starDec, starMag, {from: user1});
                await this.contract.safeTransferFrom(user1, user2, tokenId, {from: user1});
                assert.equal(await this.contract.ownerOf(tokenId), user2);
            });

        });
      });

})