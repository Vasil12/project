module.exports = (sequelize, Sequelize) => {
    const expanse = sequelize.define("vaso",
      { 
        shop: {
          type: Sequelize.STRING
        },
        cost: {
          type: Sequelize.NUMERIC
        },
      },
    )
    return expanse;
  };