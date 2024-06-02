<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "entrenos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $fecha = $data['fecha'];
    $estado = $data['entreno'];
    $razon = $data['razon'];

    $sql = "INSERT INTO eventos (fecha, entreno, razon) VALUES ('$fecha', '$entreno', '$razon') ON DUPLICATE KEY UPDATE estado='$estado', razon='$razon'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM eventos";
    $result = $conn->query($sql);

    $eventos = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $eventos[] = $row;
        }
    }

    echo json_encode($eventos);
}

$conn->close();
?>
