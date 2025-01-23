// next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.antoinepiney.fr",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  webpack: (config) => {
    // Existant
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/files",
          outputPath: "static/files",
        },
      },
    });

    // Ajout PostCSS
    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 1,
          },
        },
        "postcss-loader",
      ],
    });

    return config;
  },
};

export default nextConfig;
