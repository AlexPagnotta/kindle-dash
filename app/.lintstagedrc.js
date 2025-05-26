module.exports = {
  // Run as function to fix tsc config path
  // https://github.com/okonet/lint-staged/issues/829#issuecomment-618649288
  "*.{json,md,css,scss}": () => ["npm run format"],
  "*.{js,jsx,ts,tsx}": (fileNames) => [
    `npm run lint.eslint.git -- ${fileNames.join(" ")} --fix`,
    `npm run format.git -- ${fileNames.join(" ")}`,
  ],
};
