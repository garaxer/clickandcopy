// export default {
const config = {
	env: process.env.NODE_ENV || 'development',
	server: {
		port: process.env.PORT || 8080,
	},
	google: {
		projectId: 'plancapture',
		bucket: 'plancapture.appspot.com',
	},
};

module.exports = config