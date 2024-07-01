<?php
class EmpresaServico
{
    private $conexao;

    public function __construct($conn)
    {
        $this->conexao = $conn;
    }

    public function getEmpresasServico()
    {
        $stmt = $this->conexao->query("SELECT * FROM empresa_servico");
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function addEmpresaServico($json)
    {
        $jsonData = json_decode($json, true);
        $nome = $jsonData['nome'];
        $tipo = $jsonData['tipo'];
        $contato = $jsonData['contato'];
        $id_condominio = $jsonData['id_condominio'];

        $query = "INSERT INTO empresa_servico (nome, tipo, contato, id_condominio) VALUES (?, ?, ?, ?)";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$nome, $tipo, $contato, $id_condominio]);

        return ['status' => 'success'];
    }

    public function getEmpresaServicoById($id)
    {
        $query = "SELECT * FROM empresa_servico WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        return $r;
    }

    public function deleteEmpresaServico($id)
    {
        $query = "DELETE FROM empresa_servico WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
    }

    public function updateEmpresaServico($id, $data)
    {
        $query = "UPDATE empresa_servico SET nome = ?, tipo = ?, contato = ?, id_condominio = ? WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$data["nome"], $data["tipo"], $data["contato"], $data["id_condominio"], $id]);

        return ['status' => 'success'];
    }
}
?>
