const jwt = require('jsonwebtoken');

class Auth{
    verify(req,res,next){
        if (!req.headers.authorization) return res.status(401).send({ auth: false, message: 'Token não fornecido.' });
        var token = req.headers.authorization.replace(/^Bearer\s+/, "");
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
          if (err) return res.status(403).send({ auth: false, message: 'Token expirado ou invalido.' });
          
          // se tudo estiver ok, salva no request para uso posterior
          req.user = decoded
          next();
        });
    }
}

exports.default = new Auth().verify;