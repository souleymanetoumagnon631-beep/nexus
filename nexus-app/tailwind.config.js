/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                obsidian: "#0D0D12",
                champagne: "#C9A84C",
                ivory: "#FAF8F5",
                slate: "#2A2A35",
                "slate-light": "#3A3A48",
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                playfair: ["Playfair Display", "serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
        },
    },
    plugins: [],
};