// next.config.js
module.exports = {
    experimental: {
        serverActions: false, // Desactiva acciones del servidor
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Link',
                        value: '</_next/static/css/app/layout.css>; rel=preload; as=style',
                    },
                ],
            },
        ];
    },
};
