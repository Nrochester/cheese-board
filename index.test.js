const {sequelize, Sequelize } = require('./db')
const {User, Board, Cheese} = require('./models/index')

const {
    seedBoard,
    seedCheese,
    seedUser
} = require('./seedData.js')

describe("Models test", () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test("test user and board is one-to-many", async () => {
        await User.bulkCreate(seedUser)
        await Board.bulkCreate(seedBoard)

        const someUser = await User.findByPk(1)
        console.log("USER: ", someUser)

        await someUser.addBoard(1)
        await someUser.addBoard(2)
        await someUser.addBoard(3)

        const userBoards = await someUser.getBoards()

        console.log("User boards: ", userBoards)
        
        expect(userBoards.length).toBe(3)
    })

    test("test board and cheese many-to-many", async () => {

        await Board.bulkCreate(seedBoard)
        await Cheese.bulkCreate(seedCheese)

        const someBoard = await Board.findByPk(1)
        const someCheese = await Cheese.findByPk(1)

        await someBoard.addCheese(1)
        await someBoard.addCheese(2)
        await someBoard.addCheese(3)

        await someCheese.addBoard(1)
        await someCheese.addBoard(2)
        await someCheese.addBoard(3)

        const boardOfCheeses = await someBoard.getCheeses()

        const cheeseOfBoards = await someCheese.getBoards()

        console.log("Board of cheeses: ", boardOfCheeses)
        console.log("Cheese on boards: ", cheeseOfBoards)

        expect(boardOfCheeses.length).toBe(cheeseOfBoards.length)
    })

    test("board can be loaded with cheeses", async () => {
        const userBoards = await User.findAll({
            include: [
                {model: Board}
            ]
        })

        console.log(JSON.stringify(userBoards, null, 2))
        console.log("TEST: ",JSON.stringify(userBoards[0].Boards, null, 2))
        console.log("TEST 2: ",userBoards[0])

        expect(userBoards[0].Boards.length).toBe(3)
    })
})