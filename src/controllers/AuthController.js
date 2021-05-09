const moongose = require('mongoose');
const User = moongose.model('Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController{
    async index(req,res){
        return res.status(200).json({status: "filé"})
    }
    async register(req,res){
        const { email, username, password } = req.body;
        let findOne = await User.findOne({ email: email, username: username });
        if(findOne){
            return res.status(401).json({
                "status": "erro",
                "message": "Usuario ou email já cadastrados"
            });
        }
        const user = await User.create(new User({
            email: email,
            username: username,
            password: bcrypt.hashSync(password, 10)
        }))
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET, {
            expiresIn: "7 days"
        }, { algorithm: 'RS256' });
        return res.status(200).json({
            status: "success",
            user: user,
            jwt: token
        });
    }
    async login(req,res){
        const { identifier, password } = req.body;
        let findOne = await User.findOne({ $or: [{email: identifier},{username: identifier}]})
        if(!findOne){
            return res.status(401).json({
                status: "error",
                message: "Nome de usuario ou email invalidos"
            });
        }
        var hash = await bcrypt.compareSync(password,findOne.password);
        if(!hash){
            return res.status(401).json({
                status: "error",
                message: "Senha invalida"
            })
        }
        await User.updateOne({_id: findOne._id},{$set: {lastLogin: new Date()}},{new: true,upsert: true});
        const token = jwt.sign({ id: findOne._id, username: findOne.username }, process.env.SECRET, {
            expiresIn: "7 days"
        }, { algorithm: 'RS256' });
        return res.status(200).json({
            status: "success",
            user: findOne,
            jwt: token
        })
    }
}

module.exports = new AuthController();