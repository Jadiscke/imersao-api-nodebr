const { obterPessoas } = require("./service");

Array.prototype.meuFilter = function (callback) {
  const lista = [];
  for (let index in this) {
    const item = this[index];
    const result = callback(item, index, this);
    if (!result) continue;
    lista.push(item);
  }
  return lista;
};

async function main() {
  try {
    const { results } = await obterPessoas("a");
    // const familiarLars = results.filter((item) => {
    //   const result = item.name.toLowerCase().indexOf("lars") !== -1;
    //   return result;
    // });
    const familiaLars = results.meuFilter((item, index, lista) => {
      console.log("index: ", index, "/", lista.length);
      return item.name.toLowerCase().indexOf("lars") !== -1;
    });
    const names = familiaLars.map((pessoa) => pessoa.name);
    console.log(names);
    /*
    por padrao precisa retornar um booleano
    para informar se deve manter ou remover da lista
    false > remove da lista
    true > mantem na lista
    */
  } catch (error) {
    console.error("Deu ruim", error);
  }
}

main();
