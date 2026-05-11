/** @type {import('tailwindcss').Config} */
import nativewindPreset from "nativewind/preset";

export default {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [nativewindPreset],
  theme: {
    extend: {
      fontFamily: {
        barlowThin: ["Barlow_100Thin"],
        barlowLight: ["Barlow_300Light"],
        barlowRegular: ["Barlow_400Regular"],
        barlowMedium: ["Barlow_500Medium"],
        barlowSemiBold: ["Barlow_600SemiBold"],
        barlowBold: ["Barlow_700Bold"],
        barlowExtraBold: ["Barlow_800ExtraBold"],
        barlowBlack: ["Barlow_900Black"],
      },
    },
  },
  plugins: [],
};
