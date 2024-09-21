import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './app/**/*.{js,ts,jsx,tsx}', // Update this to match your project structure

  ],

  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'primary-darker-blue': '#0071c5', // Add the primary-darker-blue color
        'primary-blue': '#007bff', // Add the primary-blue color
        'primary-green': '#28a745', // Add the primary-green color
        'primary-red': '#dc3545', // Add the primary-red color
        'primary-yellow': '#ffc107', // Add the primary-yellow color
        'primary-gray': '#6c757d', // Add the primary-gray color
        "custom-darker-blue": "#0071c5",
        "custom-blue": "#007bff",
        "custom-green": "#28a745",
        "custom-red": "#dc3545",
        "custom-yellow": "#ffc107",
        "custom-gray": "#6c757d",
      },
      // Add any custom styles here
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
  ],
};
export default config;
