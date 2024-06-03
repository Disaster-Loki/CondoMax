<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Controle - Dashboard</title>
    <link rel="stylesheet" href="../css/style-admin.css">
     <!-- Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="sidebar">
        <h2>Admin</h2>
        <ul>
            <li class="selected"><a href="#">Dashboard</a></li>
            <li><a href="#">Condóminos</a></li>
            <li><a href="#">Funcionários</a></li>
            <li><a href="#">Empresas de Serviços</a></li>
            <li><a href="#">Balancetes</a></li>
            <li><a href="#">Relatórios</a></li>
            <li><a href="#">Orçamento</a></li>
        </ul>
    </div>

    <div class="content">
        <h2>Dashboard</h2>
        <hr style="height: 5px; background: black; margin: 5px 5px 20px 5px">
        <div class="statistics">
            <div class="card">
                <i class='bx bxs-user'></i>
                <div class="info">
                    <p class="number">50</p>
                    <p>Total de Funcionários</p>
                </div>
            </div>
            <div class="card">
                <i class='bx bxs-buildings'></i>
                <div class="info">
                    <p class="number">12</p>
                    <p>Empresas de Serviços</p>
                </div>
            </div>
            <div class="card">
                <i class='bx bxs-dollar-circle'></i>
                <div class="info">
                    <p class="number">$50000</p>
                    <p>Total do Orçamento</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
