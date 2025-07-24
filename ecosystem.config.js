// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "temp-humidity-api",
      script: "server.js", // change if your entry is index.js
      env: {
        NODE_ENV: "production",
        PORT: 4005
      }
    }
  ]
};
