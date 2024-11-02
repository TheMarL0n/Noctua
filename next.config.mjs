/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/desktop',
            permanent: true,
          },
        ]
      },
      images: { unoptimized: true },
      //output: 'export',
      // distDir: 'dist',*/
      
      typescript: {
        ignoreBuildErrors: true,
      },
};

export default nextConfig;