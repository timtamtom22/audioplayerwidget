export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0d0d0d",
        foreground: "#ffffff",
        muted: "#888888",
        "muted-foreground": "#cccccc",
        border: "#222222",
        secondary: "#1a1a1a",
        primary: "#3b82f6"
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      }
    }
  },
  plugins: []
};
