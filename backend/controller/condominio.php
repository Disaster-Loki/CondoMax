<?php
require_once './backend/config/conexao.php';
require_once './backend/model/condominio.php';

$condominio = new Condominio($conn);
header('Content-Type: application/json');
$endpoint = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if ($endpoint === '/CondoMax/condominio') {
            $r = $condominio->getCondominios();
            echo json_encode($r);
        } else if (preg_match('/^\/CondoMax\/condominio\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $condominio->getCondominioById($id);
            echo json_encode($r);
        }
        break;
    case 'POST':
        if ($endpoint === '/CondoMax/condominio') {
            $data = file_get_contents('php://input');
            $r = $condominio->addCondominio($data);
            echo json_encode($r);
        }
        break;
    case 'DELETE':
        if (preg_match('/^\/CondoMax\/condominio\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $condominio->deleteCondominio($id);
        }
        break;
    case 'PUT':
        if (preg_match('/^\/CondoMax\/condominio\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $data = json_decode(file_get_contents('php://input'), true);
            $r = $condominio->updateCondominio($id, $data);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Método não permitido']);
}
?>
