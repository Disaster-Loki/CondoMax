<?php
class Condominio
{
    private $conexao;

    public function __construct($conn)
    {
        $this->conexao = $conn;
    }

    public function getCondominios()
    {
        $stmt = $this->conexao->query("SELECT * FROM condominio");
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function addCondominio($json)
    {
        $jsonData = json_decode($json, true);
        $nome = $jsonData['nome'];
        $endereco = $jsonData['endereco'];

        $query = "INSERT INTO condominio (nome, endereco) VALUES (?, ?)";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$nome, $endereco]);

        return ['status' => 'success'];
    }

    public function getCondominioById($id)
    {
        $query = "SELECT * FROM condominio WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        return $r;
    }

    public function deleteCondominio($id)
    {
        $query = "DELETE FROM condominio WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
    }

    public function updateCondominio($id, $data)
    {
        $query = "UPDATE condominio SET nome = ?, endereco = ? WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$data["nome"], $data["endereco"], $id]);

        return ['status' => 'success'];
    }
}
?>
