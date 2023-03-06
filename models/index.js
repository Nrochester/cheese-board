const {User} = require('./User')
const {Cheese} = require('./Cheese')
const {Board} = require('./Board')


Board.belongsTo(User)
User.hasMany(Board)


Board.belongsToMany(Cheese, {through: "cheese_boards"})
Cheese.belongsToMany(Board, {through: "cheese_boards"})

module.exports = {
    User,
    Cheese,
    Board
}