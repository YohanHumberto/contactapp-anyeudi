const Sequelize = require("sequelize");
const { connect } = require("../routes/routes");

const { conect } = require("../DB/conection");

const Contat = conect.define("Contat", {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    FirstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    LastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Mobile: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});



module.exports = Contat;



