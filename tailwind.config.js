/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            boxShadow: {
                'custom-2px': '2px 2px 2px 2px rgba(2, 2, 2, 0.2)',
                'custom-4px': '4px 4px 4px 4px rgba(2, 2, 2, 0.2)',
                'soft-light': '0 0 12px rgba(0, 0, 0, 0.1)',
            },
            screens: {
                'custom-768': { min: '768px', max: '1000px' },
                'custom-1000': { min: '1000px', max: '1440px' },
                'custom-1280': { min: '1280px', max: '1440px' },
                'custom-1440': '1440px',
            },
            spacing: {
                'custom-screen-m': '1260px',
            }
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ["light", "dark"],
    },
};

export default config;
