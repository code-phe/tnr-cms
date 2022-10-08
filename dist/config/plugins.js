const a = require('strapi-provider-upload-minio-ce-2');
module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: "strapi-provider-upload-minio-ce-2",
            providerOptions: {
                accessKey: env('MINIO_ACCESS_KEY'),
                secretKey: env('MINIO_SECRET_KEY'),
                bucket: env('MINIO_BUCKET'),
                endpointSSL: env('MINIO_USE_SSL'),
                endPoint: env('MINIO_ENDPOINT'),
                port: env('MINIO_PORT'),
                host: env('MINIO_HOST'),
                hostSSL: env('MINIO_USE_SSL'),
                folder: env('MINIO_FOLDER'),
            },
        },
    },
    navigation: { enabled: true },
    graphql: { enabled: true },
});
