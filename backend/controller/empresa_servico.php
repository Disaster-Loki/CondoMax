<?php
require_once './backend/config/conexao.php';
require_once './backend/model/empresa_servico.php';

$empresaServico = new EmpresaServico($conn);
header('Content-Type: application/json');
$endpoint = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if ($endpoint === '/CondoMax/empresa_servico') {
            $r = $empresaServico->getEmpresasServico();
            echo json_encode($r);
        } else if (preg_match('/^\/CondoMax\/empresa_servico\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $empresaServico->getEmpresaServicoById($id);
            echo json_encode($r);
        }
        break;
    case 'POST':
        if ($endpoint === '/CondoMax/empresa_servico') {
            $data = file_get_contents('php://input');
            $r = $empresaServico->addEmpresaServico($data);
            echo json_encode($r);
        }
        break;
    case 'DELETE':
        if (preg_match('/^\/CondoMax/empresa_servico\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $r = $empresaServico->deleteEmpresaServico($id);
        }
        break;
    case 'PUT':
        if (preg_match('/^\/CondoMax/empresa_servico\/(\d+)$/', $endpoint, $matches)) {
            $id = $matches[1];
            $data = json_decode(file_get_contents('php://input'), true);
            $r = $empresaServico->updateEmpresaServico($id, $data);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['message' => 'Método não permitido']);
}
?>
