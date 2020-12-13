const service = require("./service");
Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = [];
  for (let indice = 0; indice < this.length - 1; indice++) {
    const resultado = callback(this[indice], indice);
    novoArrayMapeado.push(resultado);
  }

  return novoArrayMapeado;
};
async function main() {
  try {
    const results = await service.obterPessoas(`a`);
    // console.time("foreach");
    // results.results.forEach((item) => {
    //   names.push(item.name);
    // });
    // console.timeEnd("foreach");
    // console.time("map");
    // const names = results.results.map((pessoa) => pessoa.name);
    // console.timeEnd("map");
    // console.log(names);
    const names = results.results.meuMap(function (pessoa, indice) {
      return { index: indice, name: pessoa.name };
    });
    console.log(names);
  } catch (error) {
    console.error(`DEU RUIM`, error);
  }
}

main();
