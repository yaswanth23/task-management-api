const { UsersSchema, UserAuthDetailsSchema } = require("../models");

module.exports.findUser = async (whereObj, session) => {
  try {
    return await UsersSchema.findOne(whereObj).session(session);
  } catch (error) {
    throw error;
  }
};

module.exports.insertUser = async (insertObj, session) => {
  try {
    let data = await UsersSchema.create([insertObj], { session: session });
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports.insertUserAuthDetails = async (insertObj, session) => {
  try {
    let data = await UserAuthDetailsSchema.create([insertObj], {
      session: session,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
