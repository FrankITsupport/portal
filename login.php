<?php
session_start();
include('includes/db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    try {
        // Get the singleton connection instance
        $db = database::getInstance();
        $conn = $db->getConnection();
        
        // Case-insensitive username lookup
        $query = "SELECT * FROM users WHERE LOWER(username) = LOWER(:username)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // Store user data in session
            $_SESSION['username'] = htmlspecialchars($user['username']); // Sanitize output
            $_SESSION['role'] = $user['role']; 
            $_SESSION['department'] = $user['department'];

            // Redirect to dashboard
            header("Location: dashboard.php");
            exit();
        } else {
            $_SESSION['error_message'] = "Invalid username or password.";
            header("Location: login.php"); // Redirect back to login page with error
            exit();
        }
    } catch (PDOException $e) {
        $_SESSION['error_message'] = "Database Error: " . $e->getMessage();
        header("Location: login.php");
        exit();
    }
}
?>



<!-- HTML for the login form -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <div class="login-container">
        <form action="login.php" method="POST">
            <h2>Login</h2>
            <?php
            if (isset($error_message)) {
                echo "<p style='color:red;'>$error_message</p>";
            }
            ?>
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>
