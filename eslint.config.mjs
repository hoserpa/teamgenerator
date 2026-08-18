import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      "react/prop-types": "off",
    },
  },
];

export default eslintConfig;
