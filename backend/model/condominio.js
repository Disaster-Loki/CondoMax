const pool = require('../config/database');

const Condominio = {
    getAll: async () => {
        try {
            const [rows, fields] = await pool.query('SELECT * FROM condominio');
            return rows;
        } catch (error) {
            throw error;
        }
    },
    getById: async (id) => {
        try {
            const [rows, fields] = await pool.query('SELECT * FROM condominio WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },
    // Adicione métodos para inserir, atualizar e excluir conforme necessário
};

module.exports = Condominio;
