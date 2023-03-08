/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/api/:slug*",
        destination: "https://api.wh.geniussports.com/v1/:slug*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
