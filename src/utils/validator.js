export const valid = {
  nickname: (nickname) => {
    return nickname.length >= 2 && nickname.length <= 10;
  },

  password: (password) => {
    return password.length >= 6 && password.length <= 20;
  },

  email: (email) => {
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return regex.test(email);
  },
};
