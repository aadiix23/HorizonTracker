/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'aleo-bold': ['Aleo-Bold'],
        'aleo-regular': ['Aleo-Regular'],
        'aleo-medium': ['Aleo-Medium'],
        'aleo-light': ['Aleo-Light'],
        'aleo-semibold': ['Aleo-SemiBold'],
      },
    },
  },
  plugins: [],
}
