const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try {
        if(req.headers.authorization && req.headers.authorization != "") {
            let token = req.headers.authorization.split(' ')[1];
            let decoded = await jwt.verify(token, process.env.SECRET);
            if (decoded) {
                console.log(decoded);
                req.body['token'] = token;
                req.body['logged_in_user'] = decoded.user;
                next();
            }
        } else {
            res.json({ message: "Unauthorized request!" });
        }
    } catch (error) {
        if(error.name == 'TokenExpiredError') {
            try {
                let refresh_token = req.cookies.refresh_token;
                if(refresh_token) {
                    let decoded = await jwt.verify(refresh_token, process.env.REFRESH_SECRET);
                    let token = await jwt.sign({user: decoded.user, timestamp: Date.now() }, process.env.SECRET, {
                        expiresIn: '20s'
                    });
                    req.body['token'] = token;
                    req.body['logged_in_user'] = decoded.user;
                    next();
                } else {
                    res.json({ message: "Unauthorized request!" });
                }
            } catch (error) {
                res.json({ message: "Unauthorized request! "+ error.message });    
            }
        } else {
            res.json({ message: "Unauthorized request! " + error. message });
        }
    }
}

module.exports = { authenticate }