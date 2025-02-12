

function openStockModal(isEdit = false, stockData = null) {
    let modal = document.getElementById("stockModal");
    modal.style.display = "flex"; // Keep centered display
    modal.style.animation = "fadeIn 0.3s ease-in-out"; // Add animation

    if (isEdit && stockData) {
        document.getElementById("modalTitle").innerText = "Edit Stock";
        document.getElementById("stock_id").value = stockData.id;
        document.getElementById("item_name").value = stockData.item_name;
        document.getElementById("quantity").value = stockData.quantity;
        document.getElementById("category").value = stockData.category;
    } else {
        document.getElementById("modalTitle").innerText = "Add Stock";
        document.getElementById("stockForm").reset();
        document.getElementById("stock_id").value = "";
    }
}

// Stock Modal closing function 
function closeStockModal() {
    let modal = document.getElementById("stockModal");
    if (modal) {
        modal.style.animation = "fadeOut 0.3s ease-in-out"; // Add fade-out animation
        setTimeout(() => {
            modal.style.display = "none"; // Hide modal after animation
        }, 300);
    }
}


function editStock(id, name, quantity, category) {
    openStockModal(true, { id, item_name: name, quantity, category });
}

function deleteStock(id) {
    if (confirm("Are you sure you want to delete this stock item?")) {
        fetch(`pages/delete_stock.php?id=${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                loadStockData();
            })
            .catch(error => console.error('Error deleting stock:', error));
    }
}

document.getElementById("stockForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let stock_id = document.getElementById("stock_id").value;
    let item_name = document.getElementById("item_name").value;
    let quantity = document.getElementById("quantity").value;
    let category = document.getElementById("category").value;

    let formData = new FormData();
    formData.append("stock_id", stock_id);
    formData.append("item_name", item_name);
    formData.append("quantity", quantity);
    formData.append("category", category);

    fetch('pages/save_stock.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        closeStockModal();
        loadStockData();
    })
    .catch(error => console.error('Error saving stock:', error));
});

// Ensure clicking outside **does NOT** close the modal
document.getElementById("stockModal").addEventListener("click", function(event) {
    let modalContent = document.querySelector(".modal-content");
    if (!modalContent.contains(event.target)) {
        event.stopPropagation(); // Prevent modal from closing
    }
});

// Ensure close button works
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".close").addEventListener("click", closeStockModal);
});
// Show/hide loading spinner
function showLoadingSpinner() {
    document.getElementById("loadingSpinner").style.display = "block";
}

function hideLoadingSpinner() {
    document.getElementById("loadingSpinner").style.display = "none";
}
function loadStockData() {
    fetch("pages/get_stock.php") // Fetch data from the backend
    .then(response => response.json())
    .then(data => {
        let tableBody = document.getElementById("stock_body");
        tableBody.innerHTML = ""; // Clear previous data

        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="9">No stock records found.</td></tr>`;
            return;
        }

        data.forEach((row, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${row.date}</td>
                <td>${row.item_name}</td>
                <td>${row.category}</td>
                <td>${row.uom}</td>
                <td>${row.quantity}</td>
                <td>${row.price}</td>
                <td>${row.total}</td>
                <td>${row.status}</td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error("Error loading stock data:", error);
        document.getElementById("stock_body").innerHTML = `<tr><td colspan="9">Error loading data.</td></tr>`;
    });
}

// Load stock data when the page loads
document.addEventListener("DOMContentLoaded", loadStockData);

// Show confirmation message
function showConfirmationMessage(message) {
    const confirmationDiv = document.createElement("div");
    confirmationDiv.className = "confirmation-message";
    confirmationDiv.innerText = message;
    document.body.appendChild(confirmationDiv);

    setTimeout(() => {
        confirmationDiv.remove(); // Remove message after 3 seconds
    }, 3000);
}
loadStockData();

function exportStock(type) {
    window.location.href = `pages/export_stock.php?type=${type}`;
}

document.getElementById("stockForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    let formData = new FormData(this);

    fetch("pages/insert_stock.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message); // Show success message
            document.getElementById("stockForm").reset(); // Reset form
            loadStockData(); // Reload the stock table
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => console.error("Error:", error));
});

// Dispatch Modal Handling

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


    // Open modal when 'Dispatch' button is clicked
    document.querySelector(".dispatch-btn").addEventListener("click", openModal);

    
    // Handle form submission
    dispatchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const item = document.getElementById("item").value;
        const project = document.getElementById("project").value;
        const destination = document.getElementById("destination").value;
        const quantity = document.getElementById("quantity").value;
        const date = document.getElementById("date").value;
        const receiver = document.getElementById("receiver").value;
        const dispatcher = document.getElementById("Dispatcher").value;

        if (!item || !project || !destination || !quantity || !date || !receiver || !dispatcher) {
            alert("Please fill in all fields.");
            return;
        }

        console.log("Stock Dispatched:", { item, project, destination, quantity, date, receiver, dispatcher });

        // Close modal after submission
        closeModal();

        // Reset form fields
        dispatchForm.reset();
    });
});
});



// store report
document.addEventListener("DOMContentLoaded", function() {
    new Chart(document.getElementById('stockChart').getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Laptops', 'Printers', 'Stationery'],
            datasets: [{
                data: [10, 5, 20],
                backgroundColor: ['#007bff', '#28a745', '#ffc107']
            }]
        }
    });

    new Chart(document.getElementById('allocationChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Project A', 'Project B', 'Project C'],
            datasets: [{
                label: 'Stock Allocated',
                data: [5, 8, 12],
                backgroundColor: ['#17a2b8', '#e83e8c', '#fd7e14']
            }]
        }
    });
});