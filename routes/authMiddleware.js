const jwt_decode = require('jwt-decode');

const getToken = (req) => {
    try {
        const authorization = req.headers["authorization"];
        const items = authorization.split(/[ ]+/);

        if (items.length > 1 && items[0].trim() == "Bearer") {
            return items[1];
        }
    } catch (err) {
        // no token
    }
    return '';
};

const requireAuth = (req, res, next) => {
    const token = getToken(req);

    if (!token) {
        res.status(401).send({ message: 'User not authenticated' });
    }

    const payload = jwt_decode(token);

    next();
}

module.exports = {
    requireAuth,
};