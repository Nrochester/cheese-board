const {Sequelize, sequelize} = require('../db')

let Board = sequelize.define("Board", {
    type: Sequelize.STRING,
    description: Sequelize.STRING,
    rating: Sequelize.NUMBER
})

module.exports = {
    Board
}