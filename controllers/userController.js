const {User, Thought} = require('../model');

module.exports = {
    getUsers(req,res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => { return res.status(500).json(err)});
    },

    getSingleUser(req,res) {
        User.findOne({_id: req.params.userId})
        .then((user) => 
            (user) ? (res.json(user)) : (res.status(404).json({message: 'No user with this ID, Please try again'}))
        )
        .catch((err) => { return res.status(500).json(err)});
    },

    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(`Successfully created ${req.body.username}`))
        .catch((err) => { return res.status(500).json(err)});
    },

    updateUser(req,res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {runValidators: true, new: true})
        .then((user) => 
            (user) ? (res.json(`Successfully updated ${req.body.username}`)) : (res.status(404).json({message: 'No user with this ID, Please try again'}))
        )
        .catch((err) => { return res.status(500).json(err)});
    },

    deleteUser(req,res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) => 
            (user) ? 
            (Thought.deleteMany({_id: {$in: user.thoughts}}).then (res.json({message: 'User and Thought is deleted'})))
             : (res.status(404).json({message: 'No user with this ID, Please try again'})))
        .catch((err) => { return res.status(500).json(err)});
    },

    addFriend(req,res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, {runValidators: true, new:true })
        .then((user) => 
            (user) ? (res.json(`Successfully added friend`)) : (res.status(404).json({message: 'No user with this ID, Please try again'})))
        .catch((err) => { return res.status(500).json(err)});
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true })
        .then((user) => 
            (user) ? (res.json(`Successfully deleted friend`)) : (res.status(404).json({message: 'No user with this ID, Please try again'})))
          .catch((err) => res.status(500).json(err));
    },
};