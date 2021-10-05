const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "BoneAppleTea",
        mongodb_password: "AsjwgE5ZvVS277j6",
        mongodb_clustername: "cluster0",
        mongodb_database: "dummyzon",
      },
      reactStrictMode: true,
    };
  }
  return {
    env: {
      mongodb_username: "BoneAppleTea",
      mongodb_password: "AsjwgE5ZvVS277j6",
      mongodb_clustername: "cluster0",
      mongodb_database: "dummyzon-deploy",
    },
    reactStrictMode: true,
  };
};
