<?php
class Balancete
{
    private $conexao;

    public function __construct($conn)
    {
        $this->conexao = $conn;
    }

    public function getBalancetes()
    {
        $stmt = $this->conexao->query("SELECT * FROM balancete");
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function addBalancete($json)
    {
        $jsonData = json_decode($json, true);
        $id_condominio = $jsonData['id_condominio'];
        $mes = $jsonData['mes'];
        $ano = $jsonData['ano'];
        $total_despesas = $jsonData['total_despesas'];
        $total_pagamentos = $jsonData['total_pagamentos'];

        $query = "INSERT INTO balancete (id_condominio, mes, ano, total_despesas, total_pagamentos) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id_condominio, $mes, $ano, $total_despesas, $total_pagamentos]);

        return ['status' => 'success'];
    }

    public function getBalanceteById($id)
    {
        $query = "SELECT * FROM balancete WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        return $r;
    }

    public function deleteBalancete($id)
    {
        $query = "DELETE FROM balancete WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
    }

    public function updateBalancete($id, $data)
    {
        $query = "UPDATE balancete SET id_condominio = ?, mes = ?, ano = ?, total_despesas = ?, total_pagamentos = ? WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$data["id_condominio"], $data["mes"], $data["ano"], $data["total_despesas"], $data["total_pagamentos"], $id]);

        return ['status' => 'success'];
    }
}
?>
