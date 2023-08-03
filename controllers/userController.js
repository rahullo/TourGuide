const Users = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')


exports.createUsers = async(req, res) => {

    try {
        const newUser = await Users.create(req.body)
        res.status(200).json({
            status: 'Success',
            data: {
                newUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'Failed'
        })
    }

}


exports.getUser = async(req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        res.status(200).json({
            status: 'Success',
            user
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'This route is not yet defined 😂😂😂'
        })
    }
}


exports.getAllUsers = catchAsync(async(req, res, next) => {
    try {
        const users = await Users.find()
        res.status(200).json({
            status: 'Success',
            data: {
                users
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "Failed",

        })
    }
})



exports.updateUser = async(req, res) => {

    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            status: 'Success',
            user
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}


exports.deleteUser = async(req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: 'Success',
            message: 'Deleted Succesfully'
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}