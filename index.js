
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
asciiToHex = Web3.utils.asciiToHex;
contractInstance = new web3.eth.Contract(ABI_DEFINITION, CONTRACT_ADDRESS);

candidates = {"Irineu": "candidate-1",
              "JC": "candidate-2",
              "Blastoise": "candidate-3",
              "GaloCego":"candidate-4",
              "Jailson":"candidate-5",
              "Ednaldo":"candidate-6",
              "OtacoFedido23":"candidate-7",
              "Oscar":"candidate-8",
              "Alho":"candidate-9",
              "PaulaVrado":"candidate-10"}

              function voteForCandidate() {
                
                candidateName = $("#candidate").val();
                web3.eth.getAccounts()
                .then((accounts) => {
                  return contractInstance.methods.voteForCandidate(asciiToHex(candidateName)).send({from: accounts[0]})
                })
                .then(() => {
                  return contractInstance.methods.totalVotesFor(asciiToHex(candidateName)).call();
                })
                .then((voteCount) => {
                  const div_id = candidates[candidateName];
                  $("#" + div_id).html(voteCount);
                  $("#" + candidates[candidateName]+"x").html("R$"+(voteCount *3.80));
                });
              }

$(document).ready(function() {
  Object.keys(candidates).forEach((name) => {
    contractInstance.methods.totalVotesFor(asciiToHex(name)).call()
    .then((val) => {
      $("#" + candidates[name]+"x").html("R$"+(val *3.80));
    });
  });
});


$(document).ready(function() {
  Object.keys(candidates).forEach((name) => {
    contractInstance.methods.totalVotesFor(asciiToHex(name)).call()
    .then((val) => {
      $("#" + candidates[name]).html(val);
    });
  });
});