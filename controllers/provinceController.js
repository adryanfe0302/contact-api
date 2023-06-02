const asyncHandler = require("express-async-handler")
const Province = require("../models/provinceModel")

const provinceList = asyncHandler(async (req, res) => {
    
    const province = await Province.find()

    res.status(200).json(province)
});


const provinceAdd = asyncHandler(async (req,res) => {
    const extraprovince = [{
        statusCode: '200',
        status: 'OK',
        provinceName: 'timortimor',
        provinceCode: 153
    },{
        statusCode: '200',
        status: 'OK',
        provinceName: 'timorbarat',
        provinceCode: 152
    }]

    const insertProvince = await Province.insertMany(extraprovince)

    res.status(201).json(insertProvince)
})


module.exports = {
    provinceList,
    provinceAdd
}