const Users = require('../models/users.model');

exports.getUserByID = async (req, res, next, id) => {
    try{
        const user = await Users.findOne({_id: id}).exec();
        req.profile = user;
        next();
    } catch (error) {
        console.error('User dosenot exist:', error);
    if (error instanceof MongooseError) {
        res.status(400).send({ message: 'Error while retrieving user ID.' });
    } else {
        res.status(500).send({ message: 'Internal Server Error' });
        }
    }
};


exports.updateUser = async (req, res) => {
try{
    const user = await Users.findByIdAndUpdate({_id: req.params.userID}, {$set: rq.body}).exec();
    res.status(201).send({userID:req.params.userID, message:'User has been updates successfully', user});
} catch (error) {
    console.error('Error while updating user:', error);
if (error instanceof MongooseError) {
    res.status(400).send({ message: 'Error while updating user.' });
} else {
    res.status(500).send({ message: 'Internal Server Error' });
    }
}
};


exports.deleteUser = async (req, res) => {
    try{
        const user = await Users.deleteOne({_id: req.params.userID}).exec();
        res.status(201).send({userID:req.params.userID, message:'User has been deleted successfully', user});
    } catch (error) {
        console.error('Error while deleting user:', error);
    if (error instanceof MongooseError) {
        res.status(400).send({ message: 'Error while deleting user.' });
    } else {
        res.status(500).send({ message: 'Internal Server Error' });
        }
    }
    };