export class UserRepository {
    constructor(db) {
        this.db = db;
    }

    async findByEmail(email) {
        return await this.db.get('SELECT email FROM users WHERE email = ?', [email]);
    }

    async update(user) {
        await this.db.run(
            `UPDATE users 
             SET first_name = ?, last_name = ?, age = ?, dob = ?, updated_at = CURRENT_TIMESTAMP 
             WHERE email = ?`,
            [user.firstName, user.lastName, user.age, user.birthDate, user.email]
        );
    }

    async create(user) {
        await this.db.run(
            `INSERT INTO users (email, first_name, last_name, age, dob) 
             VALUES (?, ?, ?, ?, ?)`,
            [user.email, user.firstName, user.lastName, user.age, user.birthDate]
        );
    }
}