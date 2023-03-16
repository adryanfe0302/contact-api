const asyncHandler = require("express-async-handler")
const Stack = require("../models/stackModel")

const stackLists = asyncHandler(async (req, res) => {
    const stacks = await Stack.find()
    console.log('stacks', stacks);
    res.status(200).json(stacks)
});

module.exports = {
    stackLists
}