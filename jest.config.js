module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ['./mocks.ts'],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
