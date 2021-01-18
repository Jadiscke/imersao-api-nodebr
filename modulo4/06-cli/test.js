const { deepStrictEqual, ok } = require("assert");
const { DEFAULT_MAX_VERSION } = require("tls");
const database = require("./database");

const DEFAULT_ITEM_CADASTRAR = {
  nome: "Flash",
  poder: "Speed",
  id: 1,
};

const DEFAULT_ITEM_ATUALIZAR = {
  nome: "Laterna Verde",
  poder: "Energia do Anel",
  id: 2
}
describe("Suite de manipulacao de Herois", () => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  });

  after(async () => {
    await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    await database.remover(DEFAULT_ITEM_ATUALIZAR.id);
  })

  it("deve pesquisar um heroi, usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await database.listar(expected.id);
    deepStrictEqual(resultado, expected);
  });

  it("deve cadastrar um heroi, usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);
    deepStrictEqual(actual, expected);
  });

  it('deve remover um heroi por id', async ()=> {
    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
    deepStrictEqual(resultado, expected);
  })

  it('deve atualizar um heroi pelo id', async()=>{
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Dinheiro'
    }

    const novoDado = {
      nome: 'Batman',
      poder: 'Dinheiro'
    }

    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
    deepStrictEqual(resultado,expected);
  })
});