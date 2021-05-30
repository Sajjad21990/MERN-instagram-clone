const valid = ({
  fullName,
  userName,
  email,
  password,
  confirmPassword,
  gender,
  mobile,
}) => {
  const err = {};

  if (!fullName) {
    err.fullName = "Please enter your full name";
  } else if (fullName.length > 25) {
    err.fullName = "Name should be upto 25 characters long.";
  }

  if (!userName) {
    err.userName = "Please enter your username";
  } else if (userName.toLowerCase().replace(/ /g, "").length > 25) {
    err.userName = "username should be upto 25 characters long.";
  }

  if (!email) {
    err.email = "Please enter your email";
  } else if (!validateEmail(email)) {
    err.email = "Email formated badly";
  }

  if (!password) {
    err.password = "Please enter your password";
  } else if (password.length < 6) {
    err.password = "password should be at least 6 character";
  }

  if (password !== confirmPassword) {
    err.confirmPassword = "Passwords do not match";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

const validateEmail = (email) => {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default valid;
