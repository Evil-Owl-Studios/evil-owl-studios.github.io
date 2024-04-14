/** @type {import('next').NextConfig} */

const toolsDirectory = '/tools';
const publicDirectory = '../../public';

const isProd = (process.env.BUILDING === "true");

const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    basePath: (isProd) ? `${toolsDirectory}/convo-editor` : undefined,
    typescript:{
        ignoreBuildErrors: true
    },
    distDir: (isProd) ? `${publicDirectory}${toolsDirectory}/convo-editor` : undefined
};

export default nextConfig;
