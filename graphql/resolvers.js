const bcrybt = require('bcryptjs');
const User = require('../models/user');

module.exports = {
  createUser: async function ({ userInput }, req) {
    const { email, password, name } = userInput;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      const error = new Error('User Exists already');
      throw error;
    }

    const hashedPassword = await bcrybt.hash(password, 12);
    const user = new User({
      email: email,
      name: name,
      password: password,
    });

    const createdUser = await user.save();

    return {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
    };
  },
};
