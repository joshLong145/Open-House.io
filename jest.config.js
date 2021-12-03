const config = {
    verbose: false,
    preset: 'ts-jest',
    collectCoverageFrom: [
        "**/*.{ts,js,jsx}",
    ],
    globals: {
        'ts-jest': {
          babel: true,
          tsConfig: "test/tsconfig.json",
        }
      }
};

module.exports = config;