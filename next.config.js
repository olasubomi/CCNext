/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['meal-chunk-images-and-videos.s3.us-west-1.amazonaws.com','meal-chunk-images-and-videos.s3.amazonaws.com', 'lh3.googleusercontent.com'],
  }
}


module.exports = nextConfig
