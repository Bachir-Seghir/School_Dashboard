/** @type {import('next').NextConfig} */
const nextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{ hostname: "images.pexels.com" },
			{ hostname: "res.cloudinary.com" },
		],
	},
};

module.exports = nextConfig;
