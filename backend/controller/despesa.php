<?php
require_once './backend/config/conexao.php';
require_once './backend/model/despesa.php';

$despesa = new Despesa($conn);
header('Content-Type: application/json');
$endpoint = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if ($endpoint === '/CondoMax/despesa') {
            $r = $despesa->getDespesas();
            echo json_encode($r);
        } else if (preg_match('/^\/CondoMax\/despesa\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $despesa->getDespesaById($id);
            echo json_encode($r);
        }
        break;
    case 'POST':
        if ($endpoint === '/CondoMax/despesa') {
            $data = file_get_contents('php://input');
            $r = $despesa->addDespesa($data);
            echo json_encode($r);
        }
        break;
    case 'DELETE':
        if (preg_match('/^\/CondoMax/despesa\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $despesa->deleteDespesa($id);
        }
        break;
    case 'PUT':
        if (preg_match('/^\/CondoMax/despesa\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $data = json_decode(file_get_contents('php://input'), true);
            $r = $despesa->updateDespesa($id, $data);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Método não permitido']);
}

?>
