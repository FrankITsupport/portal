<?php
session_start();

// Redirect to login if user is not logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Get role and department from session
$department = $_SESSION['department'] ?? 'General';
$role = $_SESSION['role'] ?? 'User';

// Define default landing pages for roles
$roleDefaultPages = [
    'admin' => 'admin_dash.php',
    'procurement' => 'procurement_dash.php',
    'store' => 'stock_dashboard.php' // Store department default
];

// Set the default page based on the role
$defaultPage = $roleDefaultPages[$role] ?? 'stock_dashboard.php';

// Check if a specific page is requested, otherwise load default
$page = $_GET['page'] ?? $defaultPage;
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/dashboard.css">
  <link rel="stylesheet" href="assets/css/stores.css">
  <link rel="stylesheet" href="assets/css/report.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>

<div class="dashboard">
  <!-- Sidebar -->
  <?php include('components/sidebar.php'); ?>

  <!-- Main Content -->
  <div class="content">
    <?php include('components/header.php'); ?>

    <div class="dashboard-main">
      <?php
      $moduleFile = 'modules/' . strtolower($department) . '_module.php';

      // Ensure the requested page exists before loading it
      if (file_exists("pages/$page")) {
          include "pages/$page";
      } elseif (file_exists($moduleFile)) {
          include($moduleFile);
      } else {
          echo '<p style="color: red;">⚠ These features are not available at the moment. Please contact the I.T. Department for further information.</p>';
      }
      ?>
    </div>
  </div>
</div>
<script>
  
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("dispatchModal");
    const closeBtn = document.querySelector(".close");
    const dispatchBtn = document.getElementById("dispatchBtn");
    const dispatchForm = document.getElementById("dispatchForm");

    // Function to open modal
    function openModal() {
        modal.style.display = "flex";
    }

    // Dispatch modal closing function
function closeDispatchModal() {
    let modal = document.getElementById("dispatchModal");
    if (modal) {
        modal.style.animation = "fadeOut 0.3s ease-in-out"; // Add fade-out animation
        setTimeout(() => {
            modal.style.display = "none"; // Hide modal after animation
        }, 300);
    }
}

if (closeBtn) {
    closeBtn.addEventListener("click", closeDispatchModal);
}
// Close modal when clicking outside the modal content
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeDispatchModal();
    }

  });
});
</script>
<script src="assets/js/script.js"></script>
<script src="assets/js/store.js"></script>
</body>
</html>
