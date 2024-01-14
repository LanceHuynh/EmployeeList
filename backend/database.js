const username = "landatabase"
const password = "Sao123456"
const cluster = "cluster0"

const encodedUsername = encodeURIComponent(username);
const encodedPassword = encodeURIComponent(password);
const encodedcluster = encodeURIComponent(cluster);

const uri = `mongodb+srv://${encodedUsername}:${encodedPassword}@${encodedcluster}.px4syja.mongodb.net/?retryWrites=true&w=majority`

module.exports = uri;