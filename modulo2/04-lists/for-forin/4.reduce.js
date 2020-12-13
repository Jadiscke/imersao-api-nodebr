const { obterPessoas } = require("./service");

Array.prototype.meuReduce = function (callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];
  for (let index = 0; index < this.length; index++) {
    valorFinal = callback(valorFinal, this[index], this);
  }
  return valorFinal;
};

async function main() {
  try {
    const { results } = await obterPessoas("a");
    const pesos = results.map((item) => parseInt(item.mass));
    // const total = pesos.reduce((anterior, proximo) => {
    //   console.log("anterior: ", anterior, "proximo: ", proximo);
    //   if (isNaN(proximo)) return anterior;
    //   return anterior + proximo;
    // }, 0);

    const minhaLista = [
      ["Erick", "Wendel"],
      ["NodeBR", "Nerdzao"],
    ];

    const total = minhaLista
      .meuReduce((anterior, proximo) => {
        return anterior.concat(proximo);
      }, [])
      .join(", ");
    // console.log("Pesos: ", pesos);
    console.log("total: ", total);
  } catch (error) {
    console.error("Deu ruim", error);
  }
}

main();
