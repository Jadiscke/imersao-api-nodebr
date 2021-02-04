const ICrud = require("./interfaces/interfaceCrud");
const Sequelize = require("sequelize");

class Postgres extends ICrud {
  #driver = null;
  #herois = null;
  constructor() {
    super();
  }
  async connect() {
    this.#driver = new Sequelize("heroes", "jadiscke", "password", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorsAliases: false,
    });

    await this.defineModel();
  }
  async defineModel() {
    this.#herois = this.#driver.define(
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
  async create(item) {
    const { dataValues } = await this.#herois.create(item);
    return dataValues;
  }

  async read(item) {
    return this.#herois.findAll({ where: item, raw: true });
  }
}

module.exports = Postgres;
