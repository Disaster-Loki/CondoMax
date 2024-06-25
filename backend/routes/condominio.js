const express = require('express');
const router = express.Router();
const Condominio = require('../model/condominio');

// Rota para obter todos os condomínios
router.get('/condominios', async (req, res) => {
    try {
        const condominios = await Condominio.getAll();
        res.json(condominios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter um condomínio por ID
router.get('/condominios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const condominio = await Condominio.getById(id);
        if (!condominio) {
            return res.status(404).json({ message: 'Condomínio não encontrado' });
        }
        res.json(condominio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
