/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                navy: {
                    900: '#0a0e1a',
                    800: '#0f1525',
                    700: '#141c30',
                    600: '#1a2540',
                },
                teal: {
                    400: '#00e5ff',
                    500: '#00bcd4',
                },
                gold: {
                    400: '#ffc107',
                },
            },
        },
    },
    plugins: [],
}
