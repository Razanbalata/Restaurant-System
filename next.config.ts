/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // إضافة Unsplash هنا
        port: '',
        pathname: '/**',
      },
      // إذا كنت ترفع الصور الحقيقية على Supabase، يفضل إضافة نطاقها أيضاً هنا
    ],
  },
};

export default nextConfig;