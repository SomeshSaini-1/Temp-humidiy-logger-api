module.exports = {
  apps: [
    {
      name: "backend-api",
      script: "server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 4005,
      },
    },
  ],
};
