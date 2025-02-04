const {User} = require('../models/user.model');

const jwt = require('jsonwebtoken');

/**
 * Check permission to access API base on groups/roles
 * @returns
 */
exports.checkAccess = () =>
  async (req, res, next) => {

    try {
      // if (!req.headers['authorization']) {
        // return res.status(401).send();
      // }

      const user = jwt.decode(req.headers['authorization']);
      // console.log('iammia', user);
      if (!user) {
        // return res.status(401).send({ message: 'Not found' });
      }
      const authHeader = req.headers['authorization'];
      // res.locals.user = authHeader;
      // console.log('checkAccess', res.locals.user);

      res.locals.user = await User.findByPk(user ? user.id : authHeader);
      next();
    } catch (error) {
      console.log(error)
      return res.status(500).send();
    }
  };
