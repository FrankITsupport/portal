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
