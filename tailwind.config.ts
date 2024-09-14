import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "camsii-black": "#111111",
                "camsii-gray": "#888888",
                "camsii-offwhite": "#EEEEEE",
                "camsii-blue": "#005BE2",
                "camsii-pink": "#AD5F77"
      }
        },
    },
    plugins: [],
};
export default config;
