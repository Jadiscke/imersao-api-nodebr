const { get } = require("axios");

const URL = `https://swapi.dev/api/people`;

async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&format=json`;
  const result = await get(url);
  // console.log("result.data: ", JSON.stringify(result.data));
  return result.data.results.map(mapearPessoas);
}

function mapearPessoas(item) {
  // console.log(item.mass);
  return {
    nome: item.name,
    peso: item.mass,
  };
}

module.exports = {
  obterPessoas,
};
