// assets/js/scripts.js
document.querySelectorAll('.dashboard-item').forEach(item => {
  item.addEventListener('click', () => {
    const department = item.getAttribute('data-department');
    const username = prompt(`Enter your username for the ${department} department:`);
    const password = prompt(`Enter your password for the ${department} department:`);

    if (username && password) {
      alert(`Logged in as ${username} for ${department}`);
      // Proceed with login logic here
    } else {
      alert('Login cancelled.');
    }
  })
});
// sidebar collapse toggle
document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.querySelector('.burger-menu');
  const sidebar = document.getElementById('sidebar');
  const content = document.querySelector('.content');

  burgerMenu.addEventListener('click', function () {
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('expanded');
  });
});
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', function(event) {
      event.preventDefault();
      const page = this.getAttribute('data-page');

      fetch(page)
          .then(response => response.text())
          .then(html => {
              document.querySelector('.dashboard-main').innerHTML = html;
          })
          .catch(error => console.error('Error loading page:', error));
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const contentArea = document.querySelector(".dashboard-main"); // Ensure this selector matches your content div

  links.forEach(link => {
      link.addEventListener("click", function (e) {
          e.preventDefault(); // Prevent default link behavior

          const page = this.getAttribute("data-page");

          // Fetch the page content dynamically
          fetch(page)
              .then(response => response.text())
              .then(data => {
                  contentArea.innerHTML = data;

                  // Remove 'active' class from all links and highlight the current one
                  links.forEach(link => link.classList.remove("active"));
                  this.classList.add("active");
              })
              .catch(error => console.error("Error loading page:", error));
      });
  });

  // Load default dashboard content when the page first loads
  const defaultPage = links[0]?.getAttribute("data-page"); // First link's page
  if (defaultPage) {
      fetch(defaultPage)
          .then(response => response.text())
          .then(data => (contentArea.innerHTML = data))
          .catch(error => console.error("Error loading default page:", error));
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const sidebarMenu = document.getElementById("sidebar-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Function to set active menu item
  function setActiveMenu(page) {
      navLinks.forEach(link => {
          if (link.getAttribute("data-page") === page) {
              link.parentElement.classList.add("active");
          } else {
              link.parentElement.classList.remove("active");
          }
      });
  }

  // Check for stored active menu
  const storedPage = localStorage.getItem("activePage");
  if (storedPage) {
      setActiveMenu(storedPage);
  }

  // Add click event to each nav link
  navLinks.forEach(link => {
      link.addEventListener("click", function () {
          const page = this.getAttribute("data-page");
          setActiveMenu(page);
          localStorage.setItem("activePage", page); // Save active page
      });
  });
});

// Profile modal
document.addEventListener("DOMContentLoaded", function () {
  const profileModal = document.getElementById("profileModal");
  const openProfileModal = document.getElementById("openProfileModal");
  const closeProfileModal = document.querySelector(".close-profile");

  // Toggle Profile Modal Dropdown
  openProfileModal.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent closing when clicking the button
      profileModal.style.display = (profileModal.style.display === "block") ? "none" : "block";
  });

  // Close Modal when clicking outside
  document.addEventListener("click", function (event) {
      if (!profileModal.contains(event.target) && event.target !== openProfileModal) {
          profileModal.style.display = "none";
      }
  });

  // Close Profile Modal with Close Button
  closeProfileModal.addEventListener("click", function () {
      profileModal.style.display = "none";
  });
});

// ==================== inventory==================
document.addEventListener("DOMContentLoaded", function () {
  let modal = document.getElementById("inventoryModal");
  let openModalBtn = document.querySelector(".add-inventory-btn");
  let closeModalBtn = document.querySelector(".close");

  // Function to open modal
  function openInventoryModal() {
      if (modal) {
          modal.style.display = "flex";
      } else {
          console.error("Inventory modal not found!");
      }
  }

  // Function to close modal
  function closeInventoryModal() {
      if (modal) {
          modal.style.display = "none";
      }
  }

  // Open modal when button is clicked
  if (openModalBtn) {
      openModalBtn.addEventListener("click", openInventoryModal);
  } else {
      console.error("Add Inventory button not found!");
  }

  // Close modal when (×) is clicked
  if (closeModalBtn) {
      closeModalBtn.addEventListener("click", closeInventoryModal);
  } else {
      console.error("Close button not found!");
  }

  // Close modal when clicking outside of it
  window.addEventListener("click", function (event) {
      if (event.target === modal) {
          closeInventoryModal();
      }
  });
});
