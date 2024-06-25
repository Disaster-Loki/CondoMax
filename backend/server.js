const express = require('express');
const dotenv = require('dotenv');
const condominioRoutes = require('./routes/condominio');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing do corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', condominioRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor backend iniciado na porta ${PORT}`);
});
