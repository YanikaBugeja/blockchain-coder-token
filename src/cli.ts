import { exec } from "shelljs";
import readlineSync from "readline-sync";


const enum Commands {
  test = "Test The XMan Token Project",
  compile = "Compile The XMan Token Project",
}

const back = () => {
  if (readlineSync.keyInYN("Go back?")) {
      cli()
  } else {
      process.exit();
  }
}


const loadCli = () => {
  setTimeout(() => { back() }, 2000);
}


const cmdTest = async () => {
  console.log('Testing ...');

  exec('truffle test', { async: true });

  loadCli();
}


const cmdCompile = async () => {
  console.log('Compile ...');

  exec('truffle compile', { async: true });

  loadCli();
}

export const cli = async () => {
  console.log(`Blockchain Home Assignment - XMan Tokens`)

  var menu = require("readline-sync"),
    commands = [
      Commands.compile,
      Commands.test,
    ],
    index = menu.keyInSelect(commands, "Commands")

  switch (commands[index]) {
    case Commands.test:
      await cmdTest();
      break;

    case Commands.compile:
      await cmdCompile();
      break;

    default:
      cli()
      break;
  }
}
