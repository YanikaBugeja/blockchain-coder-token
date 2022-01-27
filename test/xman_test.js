const { assert } = require("console");

var XManBusinessLogic = artifacts.require('./XManBusinessLogic.sol');

contracts('XManBusinessLogic', (accounts) => {
  let contractInstance;
  const SUPPLY = 1000000;

  beforeEach(async () => {
    contractInstance = await XManBusinessLogic.deployed()
  })

  it('Get Account Balance - Should put 1000000 tokens in the initial account', async () => {
    let accountBalance = await contractInstance.balanceOf.call(accounts[0])

    assert.equals(
      accountBalance.valueOf(),
      SUPPLY,
      'Initial supply does not match to 1000000'
    )
  })

  it('Transferring XMan Tokens - Should send 10 XMan tokens', async () => {
    var fristAccount = accounts[0];
    var secondAccount = accounts[1];
    var fristAccountStartBalance = await contractInstance.balanceOf.call(accounts[0]);
    var secondAccountStartBalance = await contractInstance.balanceOf.call(accounts[1]);

    await contractInstance.transfer(secondAccount, 10, {from: fristAccount})

    var fristAccountFinalBalance = await contractInstance.balanceOf.call(fristAccount);
    var secondAccountFinalBalance = await contractInstance.balanceOf.call(secondAccount);
    var firstAccountBalance = fristAccountStartBalance - 10;
    var secondAccountBalance = secondAccountStartBalance + 10;

    assert.equals(
      fristAccountFinalBalance.toNumber(),
      firstAccountBalance,
      'XMan Tokens Transfer Failed From Sender'
    )

    assert.equals(
      secondAccountFinalBalance.toNumber(),
      secondAccountBalance,
      'XMan Tokens Transfer Failed From Receiver'
    )
  })

  it('Transferring XMan Tokens - Should send 10 XMan tokens', async () => {
    var fristAccount = accounts[0];
    var secondAccount = accounts[1];
    var fristAccountStartBalance = await contractInstance.balanceOf.call(accounts[0]);
    var secondAccountStartBalance = await contractInstance.balanceOf.call(accounts[1]);

    await contractInstance.transfer(secondAccount, 10, {from: fristAccount})

    var fristAccountFinalBalance = await contractInstance.balanceOf.call(fristAccount);
    var secondAccountFinalBalance = await contractInstance.balanceOf.call(secondAccount);
    var firstAccountBalance = fristAccountStartBalance - 10;
    var secondAccountBalance = secondAccountStartBalance + 10;

    assert.equals(
      fristAccountFinalBalance.toNumber(),
      firstAccountBalance,
      'XMan Tokens Transfer Failed From Sender'
    )

    assert.equals(
      secondAccountFinalBalance.toNumber(),
      secondAccountBalance,
      'XMan Tokens Transfer Failed From Receiver'
    )
  })

  it('Returning XMan - Should return the identified', async () => {
    const GAS_LIMIT = 500000;

    let XManQuery = await contractInstance.getXManCount({from: account[0], gas: GAS_LIMIT});
    assert.equals(
      XManQuery,
      0,
      'Xman Not Identified'
    )
  })
})
