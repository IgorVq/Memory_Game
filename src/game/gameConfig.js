const DIFFICULTY_CONFIG = {
    easy: { rows: 4, cols: 4 },
    medium: { rows: 4, cols: 5 },
    hard: { rows: 4, cols: 6 },
};

const EMOJIS = ["👍", "🌈", "❤️", "⚠️", "🚚", "🏞️", "🥑", "🍎", "🎯", "👀", "☀️", "🧠"];

function getDifficultyConfig(key) {
    const config = DIFFICULTY_CONFIG[key];
    if (!config) {
        return DIFFICULTY_CONFIG.easy;
    }
    return config;
}

export { DIFFICULTY_CONFIG, EMOJIS, getDifficultyConfig };
