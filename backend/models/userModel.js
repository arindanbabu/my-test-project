const db = require('../common/connection');

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    },
    create: async (username, email, password) => {
        return await db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, password]
        );
    }
};

module.exports = User;