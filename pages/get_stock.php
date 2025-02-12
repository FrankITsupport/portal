<?php
include '../includes/db.php'; // Database connection

$sql = "SELECT * FROM stock ORDER BY id DESC"; // Fetch stock data
$result = mysqli_query($conn, $sql);

$stock_data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $stock_data[] = $row;
}

echo json_encode($stock_data); // Return as JSON
?>
