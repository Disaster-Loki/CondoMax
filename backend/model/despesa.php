<?php
class Despesa
{
    private $conexao;

    public function __construct($conn)
    {
        $this->conexao = $conn;
    }

    public function getDespesas()
    {
        $stmt = $this->conexao->query("SELECT * FROM despesa");
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function addDespesa($json)
    {
        $jsonData = json_decode($json, true);
        $descricao = $jsonData['descricao'];
        $valor = $jsonData['valor'];
        $data = $jsonData['data'];
        $id_condominio = $jsonData['id_condominio'];

        $query = "INSERT INTO despesa (descricao, valor, data, id_condominio) VALUES (?, ?, ?, ?)";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$descricao, $valor, $data, $id_condominio]);

        return ['status' => 'success'];
    }

    public function getDespesaById($id)
    {
        $query = "SELECT * FROM despesa WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        return $r;
    }

    public function deleteDespesa($id)
    {
        $query = "DELETE FROM despesa WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
    }

    public function updateDespesa($id, $data)
    {
        $query = "UPDATE despesa SET descricao = ?, valor = ?, data = ?, id_condominio = ? WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$data["descricao"], $data["valor"], $data["data"], $data["id_condominio"], $id]);

        return ['status' => 'success'];
    }
}
?>
