const db = require('../config/database');

const Condominio = {};

Condominio.create = async (nome, endereco) => {
    try {
        const [result] = await db.execute('INSERT INTO condominio (nome, endereco) VALUES (?, ?)', [nome, endereco]);
        return result.insertId;
    } catch (error) {
        throw new Error(error);
    }
};

Condominio.findById = async (id) => {
    try {
        const [rows] = await db.execute('SELECT * FROM condominio WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = Condominio;
