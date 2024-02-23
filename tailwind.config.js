module.exports = {
  theme: {
    extend: {
      animation: {
        shake: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            "margin-left": "0rem",
          },
          "20%, 80%": {
            "margin-left": "0.5rem",
          },
          "30%, 50%, 70%": {
            "margin-left": "-0.5rem",
          },
          "40%, 60%": {
            "margin-left": "0rem",
          },
        },
      },
    },
  },
};

0 % {};
25 % {};
75 % {};
100 % {};
