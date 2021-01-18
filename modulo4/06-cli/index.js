const { program } = require("commander");
const Database = require("./database");
const Heroi = require("./heroi");
async function main() {
  program
    .version("v1")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-i, --id [value]", "Id do Heroi")

    .option("-c, --cadastrar", "Cadastrar um heroi")
    .option("-l, --listar", "Listar um heroi")
    .option("-r, --remover", "Remove um heroi pelo id")
    .option("-a, --atualizar [value]", "Remove um heroi pelo id");

  program.parse(process.argv);

  const options = program.opts();
  const heroi = new Heroi(options);
  if (!heroi.id) {
    delete heroi.id;
  }
  try {
    if (options.cadastrar) {
      const resultado = await Database.cadastrar(heroi);
      if (!resultado) return console.error("Heroi nao foi cadastrado");
      console.log("Heroi cadastrado com sucesso");
    }

    if (options.listar) {
      const resultado = await Database.listar();
      return console.log(resultado);
    }

    if (options.remover) {
      const resultado = await Database.remover(heroi.id);
      if (!resultado) {
        console.error("Não foi possível remover o heroi");
        return;
      }
      console.log("Heroi deletado com sucesso");
    }

    if (options.atualizar) {
        const idParaAtualizar = parseInt(options.atualizar);
        const dado = JSON.stringify(heroi);
        const heroiAtualizar = JSON.parse(dado);
        const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar);

        if (!resultado){
            console.error('Nao foi possivel atualizar o heroi');
            return
        }
        console.log('Heroi Atualizado com sucesso')
    }
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

main();
