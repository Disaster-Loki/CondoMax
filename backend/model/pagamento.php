<?php
class Pagamento
{
    private $conexao;

    public function __construct($conn)
    {
        $this->conexao = $conn;
    }

    public function getPagamentos()
    {
        $stmt = $this->conexao->query("SELECT * FROM pagamento");
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function addPagamento($json)
    {
        $jsonData = json_decode($json, true);
        $valor = $jsonData['valor'];
        $data_pagamento = $jsonData['data_pagamento'];
        $id_condominio = $jsonData['id_condominio'];

        $query = "INSERT INTO pagamento (valor, data_pagamento, id_condominio) VALUES (?, ?, ?)";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$valor, $data_pagamento, $id_condominio]);

        return ['status' => 'success'];
    }

    public function getPagamentoById($id)
    {
        $query = "SELECT * FROM pagamento WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        return $r;
    }

    public function deletePagamento($id)
    {
        $query = "DELETE FROM pagamento WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
    }

    public function updatePagamento($id, $data)
    {
        $query = "UPDATE pagamento SET valor = ?, data_pagamento = ?, id_condominio = ? WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$data["valor"], $data["data_pagamento"], $data["id_condominio"], $id]);

        return ['status' => 'success'];
    }
}
?>
