<?php
require_once './backend/config/conexao.php';
require_once './backend/model/pagamento.php';

$pagamento = new Pagamento($conn);
header('Content-Type: application/json');
$endpoint = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if ($endpoint === '/CondoMax/pagamento') {
            $r = $pagamento->getPagamentos();
            echo json_encode($r);
        } else if (preg_match('/^\/CondoMax\/pagamento\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $pagamento->getPagamentoById($id);
            echo json_encode($r);
        }
        break;
    case 'POST':
        if ($endpoint === '/CondoMax/pagamento') {
            $data = file_get_contents('php://input');
            $r = $pagamento->addPagamento($data);
            echo json_encode($r);
        }
        break;
    case 'DELETE':
        if (preg_match('/^\/CondoMax/pagamento\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $pagamento->deletePagamento($id);
        }
        break;
    case 'PUT':
        if (preg_match('/^\/CondoMax/pagamento\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $data = json_decode(file_get_contents('php://input'), true);
            $r = $pagamento->updatePagamento($id, $data);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Método não permitido']);
}
?>
