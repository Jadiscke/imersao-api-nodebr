/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu Id
2 Obter o endereco do usuario pelo Id
*/
// importamos um modulo interno do node.js

const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);
function obterUsuario() {
  // Quando der um problema o *reject* eh chamado
  // Quando for sucesso a gente chama o *resolve*
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "11009902",
        ddd: 11,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0,
    });
  }, 2000);
}

const usarioPromise = obterUsuario();
//para manipular o sucesso usamo .then()
// para manipular usamos o .catch()
usarioPromise
  .then((usuario) => {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id,
        },
        telefone: result,
      };
    });
  })
  .then((resultado) => {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result,
      };
    });
  })
  .then((resultado) => {
    console.log(`
    Nome: ${resultado.usuario.nome},
    Endereco: Rua ${resultado.endereco.rua}, ${resultado.endereco.numero},
    Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `);
  })
  .catch((error) => {
    console.log("DEU RUIM", error);
  });
// obterUsuario(function resolverUsuario(error, usuario) {
//   // null || "" || 0 === false
//   if (error) {
//     console.error('DEU ruim em usuario');
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.error('DEU ruim em telefone');
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
//       if (erro2) {
//         console.error('Deu ruim em endereco');
//         return;
//       }

//       console.log(`
//         Nome: ${usuario.nome},
//         Endereco: Rua ${endereco.rua}, ${endereco.numero},
//         Telefone: (${telefone.ddd})${telefone.telefone}
//       `);
//     })
//   });
// });

// const telefone = obterTelefone(usuario.id);

// console.log('usuario', usuario);
// console.log('telefone', telefone);
