const { Sequelize } = require('sequelize')

module.exports.conect = new Sequelize('test-db', 'user', 'pass', {
    host: './DB/DBContacts.sqlite',
    dialect: 'sqlite',
    //  logging: false
});

