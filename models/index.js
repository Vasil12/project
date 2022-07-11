const dbConfig = require("../config/db");
const Sequelize = require("sequelize");

const {DB, USER, PASSWORD, HOST, pool} = dbConfig;
const sequelize = new Sequelize(DB, USER, PASSWORD, {
    HOST,
    dialect: "postgres",
    pool: {
      max: pool.max,
      min: pool.min,
      acquire: pool.acquire,
      idle: pool.idle 
    }
  }
 )

 const expanse = require("./expense.model")(sequelize, Sequelize);


module.exports = {expanse, sequelize, Sequelize};

 const auth = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
 }
 
 auth();
