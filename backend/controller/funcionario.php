<?php
require_once './backend/config/conexao.php';
require_once './backend/model/funcionario.php';

$funcionario = new Funcionario($conn);
header('Content-Type: application/json');
$endpoint = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if ($endpoint === '/funcionario') {
            $r = $funcionario->getFuncionario();
            echo json_encode($r);
        } else if (preg_match('/^\/funcionario\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $funcionario->getFuncById($id);
            echo json_encode($r);
        }
        break;
    case 'POST':
        if ($endpoint === '/CondoMax/funcionario') {
            $data = json_decode(file_get_contents('php://input'), true);
            $r = $funcionario->addFunc($data);
            echo json_encode($r);
        }
        break;
    case 'DELETE':
        if (preg_match('/^\/CondoMax\/funcionario\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $funcionario->deleteFunc($id);
            echo json_encode(['message' => 'Funcionário removido']);
        }
        break;
    case 'PUT':
        if (preg_match('/^\/CondoMax\/funcionario\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $data = json_decode(file_get_contents('php://input'), true);
            $r = $funcionario->updateFunc($id, $data);
            echo json_encode(['message' => 'Funcionário atualizado com sucesso']);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Método não permitido']);
}
?>
