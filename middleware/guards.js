const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");


function ensureUserLoggedIn(req, res, next) {
    let token = _getToken(req);

    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}


function ensureSameUser(req, res, next) {
    let token = _getToken(req);

    try {
        let payload = jwt.verify(token, SECRET_KEY);
        if (payload.ownerId === Number(req.params.ownerId)) {
            next();
        } else {
            res.status(403).send({ error: 'Forbidden.' });
        }
    } catch (err) {
        res.status(401).send({ error: 'Unauthorized.' });
    }
}

function _getToken(req) {
    if ( !('authorization' in req.headers) ) {
        return '';
    }

    let authHeader = req.headers['authorization'];
    let [str, token] = authHeader.split(' ');

    return (str === 'Bearer') ? token : '';
}


module.exports = {
    ensureUserLoggedIn,
    ensureSameUser
};