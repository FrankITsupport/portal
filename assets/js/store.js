// Open Modals
function openStockModal(isEdit = false, stockData = null) {
    let modal = document.getElementById("stockModal");
    if (!modal) return;
    modal.style.display = "flex";
    modal.style.animation = "fadeIn 0.3s ease-in-out";

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

function openInventoryModal() {
    let modal = document.getElementById("inventoryModal");
    if (!modal) return;
    modal.style.display = "flex";
    modal.style.animation = "fadeIn 0.3s ease-in-out";
}

function openDispatchModal() {
    let modal = document.getElementById("dispatchModal");
    if (!modal) return;
    modal.style.display = "flex";
    modal.style.animation = "fadeIn 0.3s ease-in-out";
}

// Close Modals
function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
        modal.style.animation = "fadeOut 0.3s ease-in-out";
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
}

// Close modals when clicking outside modal content
document.addEventListener("click", function (event) {
    document.querySelectorAll(".modal").forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Ensure Close Buttons Work for Specific Modals
document.addEventListener("DOMContentLoaded", function () {
    // Stock Modal Close Button
    document.querySelector(".close")?.addEventListener("click", function () {
        closeModal("stockModal");
    });

    // Inventory Modal Close Button
    document.querySelector(".close")?.addEventListener("click", function () {
        closeModal("inventoryModal");
    });

    // Dispatch Modal Close Button
    document.querySelector(".close")?.addEventListener("click", function () {
        closeModal("dispatchModal");
    });

    // Assign event listeners to modal trigger buttons
    document.querySelector(".add-inventory-btn")?.addEventListener("click", openInventoryModal);
    document.querySelector(".dispatch-btn")?.addEventListener("click", openDispatchModal);
});

// Prevent closing when clicking inside modal content
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", function (event) {
        if (!event.target.closest(".modal-content")) {
            closeModal(this.id);
        }
    });
});
