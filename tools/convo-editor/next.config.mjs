/** @type {import('next').NextConfig} */

const toolsDirectory = '/tools';
const publicDirectory = '../../public';

const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    basePath: `${toolsDirectory}/convo-editor`,
    typescript:{
        ignoreBuildErrors: true
    },
    distDir: `${publicDirectory}${toolsDirectory}/convo-editor`
};

export default nextConfig;
