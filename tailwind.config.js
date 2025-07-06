/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        popUp: {
          "0%": { opacity: 0, transform: "scale(0.8)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        popOut: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(0.8)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateX(-60%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },

        // ✅ Cubic Pop Effect (Bounce-like with custom easing)
        cubicPop: {
          "0%": {
            transform: "scale(0.5)",
            opacity: 0,
          },
          "60%": {
            transform: "scale(1.1)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(1)",
          },
        },

        cubicRotate: {
          "0%": {
            transform: "rotate(-180deg) scale(0.5)",
            opacity: 0,
          },
          "60%": {
            transform: "rotate(20deg) scale(1.1)",
            opacity: 1,
          },
          "100%": {
            transform: "rotate(0deg) scale(1)",
          },
        },
        cubicRotateX: {
          "0%": {
            transform: "rotateX(60deg) scale(0.9)",
            opacity: 0,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          },
          "60%": {
            transform: "rotateX(-10deg) scale(1.05)",
            opacity: 1,
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          },
          "100%": {
            transform: "rotateX(0deg) scale(1)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          },
        },
        cubicSlide: {
          "0%": {
            transform: "translateX(-100%) scale(0.9)",
            opacity: 0,
          },
          "60%": {
            transform: "translateX(10%) scale(1.02)",
            opacity: 1,
          },
          "100%": {
            transform: "translateX(0) scale(1)",
            opacity: 1,
          },
        },
        cubicSlideChange: {
          "0%": {
            transform: "translateX(0%) scale(1)",
            opacity: 1,
          },
          "40%": {
            transform: "translateX(-100%) scale(0.98)",
            opacity: 0.7,
          },
          "60%": {
            transform: "translateX(100%) scale(0.98)",
            opacity: 0.7,
          },
          "100%": {
            transform: "translateX(0%) scale(1)",
            opacity: 1,
          },
        },

        // ✅ Typing Effect
        typing: {
          "0%": { width: "0ch" },
          "100%": { width: "30ch" }, // You can change to fit your text
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "black" },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideIn: "slideIn 0.8s ease-out",
        popUp: "popUp 0.3s ease-out",
        popOut: "popOut 0.3s ease-in",
        cubicPop: "cubicPop 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        typing: "typing 3s steps(30) 1 normal both",
        blink: "blink 0.8s step-end infinite",
        cubicRotate: "cubicRotate 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        cubicRotateX: "cubicRotateX 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        cubicSlide:
          "cubicSlide 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards",
        cubicSlideChange:
          "cubicSlideChange 2s cubic-bezier(0.77, 0, 0.175, 1) infinite",
      },
    },
  },
  plugins: [],
};
