module.exports = {
    experimental: {
        darkModeVariant: true,
    },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: {
        mode: "layers",
        layers: ["base", "components", "utilities"],
        content: ["./src/App.js", "./src/components/*.js", "./src/pages/*.js"],
    },
    theme: {
        extend: {
            colors: {
                primary: "#607d8b",
                secondary: "#263238",
            },
            fontSize: {
                "1.5xl": "1.375rem",
                "5.5xl": "3.5rem",
            },
            scale: {
                15: ".15",
                25: ".25",
            },
            spacing: {
                1.5: "6px",
                14: "3.5rem",
                72: "18rem",
                80: "20rem",
                88: "22rem",
                96: "24rem",
                "-14": "-3.5rem",
                "-72": "-18rem",
                "-80": "-20rem",
                "-88": "-22rem",
                "-96": "-24rem",
            },
        },
    },
    variants: { borderStyle: ["responsive", "hover", "focus"] },
    plugins: [],
};
