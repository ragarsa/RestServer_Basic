const Role = require("../models/role");
const User = require("../models/user");

const validRole = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`The role ${role} is not in database`);
  }
};

//Verify email
const existEmail = async (email="") => {
  const validateUnique = await User.findOne({ email });
  if (validateUnique) {
    throw new Error(`The email ${email} is already in use`);
  }
};

const existID = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`The ${id} doesnt exist`);
  }
}

module.exports = {
  validRole,
  existEmail,
  existID
};
