<?php
require_once './backend/config/conexao.php';
require_once './backend/model/balancete.php';

$balancete = new Balancete($conn);
header('Content-Type: application/json');
$endpoint = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if ($endpoint === '/CondoMax/balancete') {
            $r = $balancete->getBalancetes();
            echo json_encode($r);
        } else if (preg_match('/^\/CondoMax\/balancete\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $balancete->getBalanceteById($id);
            echo json_encode($r);
        }
        break;
    case 'POST':
        if ($endpoint === '/CondoMax/balancete') {
            $data = file_get_contents('php://input');
            $r = $balancete->addBalancete($data);
            echo json_encode($r);
        }
        break;
    case 'DELETE':
        if (preg_match('/^\/CondoMax\/balancete\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $balancete->deleteBalancete($id);
        }
        break;
    case 'PUT':
        if (preg_match('/^\/CondoMax\/balancete\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $data = json_decode(file_get_contents('php://input'), true);
            $r = $balancete->updateBalancete($id, $data);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Método não permitido']);
}
?>
