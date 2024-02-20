const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // Check if token is present in the headers
        if (!req.headers['authorization']) {
            return res.status(401).send({
                success: false,
                message: 'No token provided'
            });
        }

        const token = req.headers['authorization'].split(" ")[1];

        // Verify the token
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid token'
                });
            } else {
                // Check if the decoded token is an admin
                if (decode && decode.email === adminEmail) {
                    // Admin authentication
                    req.adminId = decode.userId;
                    next();
                } else {
                    // Regular user authentication
                    req.userId = decode.userId;
                    next();
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            error,
            message: 'Auth Failed'
        });
    }
};
