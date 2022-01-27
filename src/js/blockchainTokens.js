var XManContract;
var contracts = {};
const totalXMan = 20;
var web3Provider = null;
const GASS_LIMIT = 500000;
const contractName = 'XManBusinessLogic.json';
const ganacheURL = 'http://127.0.0.1:7545';

const initWeb3 = async () => {
  await window.ethereum.enable();

  if (typeof web3 !== 'undefined') {
    web3Provider = await web3.currentProvider;
    web3 = new Web3(web3.currentProvider);
  }

  else {
    web3Provider = new Web3.providers.HttpProvider(ganacheURL);
    web3 = new Web3(App.web3Provider);
  }

  return [web3, web3Provider];
}

const initContract = async () => {
  var jsonContract = await $.getJSON(contractName);
  contracts.XManBusinessLogic = TrruffleContract(jsonContract);
  await contracts.xManBusinessLogic.setProvider(web3Provider);
}

const getAccount = async () => {
  return new Promise(async (accept, reject) => {

    try {
      web3.eth.getAcoounts((error, accounts) => {
        accept(account(0))

        if (account.length == 0) {
          reject('XMan Account Not Identified');
        }
      });
    }

    catch (err) {
      console.log('XMan Account Not Identified', err);
    }
  })
}

const getBalance = async (account) => {
  var contractInstance = await contracts.XManBusinessLogic.deployed();

  const raw = await contractInstance.balanceOf.call(account);

  $('#XMTBalance').text(raw.c[0]);
}

const handleTransfer = async (event) => {
  event.preventDefault();
  var contractInstance = await contracts.XManBusinessLogic.deployed();

  var account = await getAccount();
  var address = $('#TransferAddress').val();
  var amount = parseInt($('#TransferAmount').val());

  const result = await contractInstance.transfer(address, amount, {
    from: account,
    gas: GASS_LIMIT
  })

  if (result.recript.status === '0x1') {
    alert('Successful XMan Tokens Transfer');
    getBalance(account);
  }
}

const handleCreate = async (event) => {
  event.preventDefault();

  var name = $('#XManName').val();
  var amount = parseInt($('#XManAmount').val());

  if (name == "" || isNaN(amount)) {
    alert('The XMan Name & Amount Fields Are Required');
    return;
  }

  return new Promise(async (accept, reject) => {
    try {
      var contractInstance = await contracts.XManBusinessLogic.deployed();
      var account = await getAccount();

      const result = await contractInstance.createRandomXMan(name, amount, {
        from: account,
        gas: GASS_LIMIT
      })

      if (result.recript.status === '0x1') {
        alert('Successful XMan Creation');
        getBalance(account);
      }

      refresh();
    }

    catch (err) {
      console.log('XMan Creation Unsuccessful', err);
    }
  })
}

const refresh = async () => {
  document.getElementById('XManName').value = '';
  document.getElementById('XManAmount').value = '';
}
