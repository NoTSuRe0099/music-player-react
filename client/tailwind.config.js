module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: "#181818",
                secondary: "#121212",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
