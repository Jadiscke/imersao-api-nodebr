/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir de seu Id
2 Obter o endereco do usuario pelo Id
*/

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date()
    })
  }, 1000)
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '11009902',
      ddd: 11
    })
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    })
  }, 2000);
}

obterUsuario(function resolverUsuario(error, usuario) {
  // null || "" || 0 === false
  if (error) {
    console.error('DEU ruim em usuario');
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error('DEU ruim em telefone');
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
      if (erro2) {
        console.error('Deu ruim em endereco');
        return;
      }

      console.log(`
        Nome: ${usuario.nome},
        Endereco: Rua ${endereco.rua}, ${endereco.numero},
        Telefone: (${telefone.ddd})${telefone.telefone}
      `);
    })
  });
});

// const telefone = obterTelefone(usuario.id);

// console.log('usuario', usuario);
// console.log('telefone', telefone);