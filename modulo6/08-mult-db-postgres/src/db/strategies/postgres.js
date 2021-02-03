const ICrud = require("./interfaces/interfaceCrud");
const Sequelize = require("sequelize");

class Postgres extends ICrud {
  #driver = null;
  #herois = null;
  constructor() {
    super();
    this.#connect();
  }
  #connect() {
    this.#driver = new Sequelize("heroes", "jadiscke", "password", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorsAliases: false,
    });
  }
  async defineModel() {
    this.#herois = driver.define(
      "herois",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        tableName: "TB_HEROIS",
        freezeTableName: false,
        timestamps: false,
      }
    );

    await this.#herois.sync();
  }
  async isConnected() {
    try {
      await this.#driver.authenticate();
      return true;
    } catch (error) {
      console.log("fail", error);
      return false;
    }
  }
  create(item) {
    console.log("O item foi salvo no Postgres");
  }
}

module.exports = Postgres;
