<?php
include '../includes/db.php'; // Database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['date'];
    $item_name = $_POST['item_name'];
    $category = $_POST['category'];
    $uom = $_POST['uom'];
    $quantity = $_POST['quantity'];
    $price = $_POST['price'];
    $total = $_POST['total'];
    $status = $_POST['status'];

    $sql = "INSERT INTO stock (date, item_name, category, uom, quantity, price, total, status)
            VALUES ('$date', '$item_name', '$category', '$uom', '$quantity', '$price', '$total', '$status')";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(["success" => true, "message" => "Stock added successfully!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . mysqli_error($conn)]);
    }
    mysqli_close($conn);
}
?>
