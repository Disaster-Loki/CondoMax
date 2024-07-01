<?php
require_once './backend/model/funcionario.php';
require_once './backend/controller/funcionario.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$func = new Funcionario($conn);

?>
