<?php
class Funcionario
{
    private $conexao;

    public function __construct($conn)
    {
        $this->conexao = $conn;
    }

    public function getFuncionario()
    {
        $stmt = $this->conexao->query("SELECT * FROM funcionario");
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function addFunc($json)
    {
        $jsonData = json_decode($json, true);
        $nome = $jsonData['nome'];
        $email = $jsonData['email'];
        $senha = $jsonData['senha'];
        $cargo = $jsonData['cargo'];
        $salario = $jsonData['salario'];
        $telefone = $jsonData['telefone'];
        $morada = $jsonData['morada'];

        $query = "INSERT INTO funcionario (nome, email, senha, cargo, salario, telefone, morada) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$nome, $email, $senha, $cargo, $salario, $telefone, $morada]);

        return ['message' => 'Funcionário inserido com sucesso'];
    }

    public function getFuncById($id)
    {
        $query = "SELECT * FROM funcionario WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
        $r = $stmt->fetch(PDO::FETCH_ASSOC);
        return $r;
    }

    public function deleteFunc($id)
    {
        $query = "DELETE FROM funcionario WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$id]);
    }

    public function updateFunc($id, $user)
    {
        $query = "UPDATE funcionario SET nome = ?, email = ?, senha = ?, cargo = ?, salario = ?, telefone = ?, morada = ? WHERE id = ?";
        $stmt = $this->conexao->prepare($query);
        $stmt->execute([$user["nome"], $user["email"],
                        $user["senha"], $user["cargo"],
                        $user["salario"], $user["telefone"],
                        $user["morada"], $id]);

        return ['message' => 'Funcionário atualizado com sucesso'];
    }
}
?>
