/** @type {import('tailwindcss').Config} */

const {colors} = require("./src/theme/colors");

module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    fontFamily: {
      interBold: ['Inter-Bold'],
      interBlack: ['Inter-Black'],
      interSemiBold: ['Inter-SemiBold'],
      interMedium: ['Inter-Medium'],
      interRegular: ['Inter-Regular'],
    },
    colors: colors,
    extend: {
      spacing: {
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        5: '5px',
        6: '6px',
        7: '7px',
        8: '8px',
        9: '9px',
        10: '10px',
        12: '12px',
        14: '14px',
        15: '15px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        25: '25px',
        26: '26px',
        27: '27px',
        28: '28px',
        30: '30px',
        32: '32px',
        35: '35px',
        36: '36px',
        40: '40px',
        45: '45px',
        48: '48px',
        50: '50px',
        70: '70px',
        75: '75px',
        80: '80px',
        100: '100px',
      },
      borderRadius: {
        4: '4px',
        5: '5px',
        8: '8px',
        10: '10px',
        12: '12px',
        15: '15px',
        30: '30px',
        40: '40px',
      },
      fontSize: {
        '1xs': '13px',
        '1sm': '15px',
      },
      lineHeight: {
        'extra-tight': '1.15',
      },
    },
  },
  plugins: [],
};
