/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: false,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/next-ecommerce-4fad9.appspot.com/o/**",
      },
    ],
  },
};
//firebasestorage.googleapis.com/v0/b/next-ecommerce-4fad9.appspot.com/o/images%2FTTD.jpeg?alt=media&token=74ce97fc-f2e2-4d0c-9852-cb0a07f01aba
https: module.exports = nextConfig;
