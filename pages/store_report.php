<div class="tabs-container">
    <div class="tabs">
        <button class="tab-button active" data-tab="overview">Overview</button>
        <button class="tab-button" data-tab="stock-in">Stock In</button>
        <button class="tab-button" data-tab="stock-out">Stock Out</button>
        <button class="tab-button" data-tab="allocations">Allocations</button>
    </div>

    <div class="tab-content active" id="overview">
        <div class="reports-container">
            <div class="charts-column">
                <canvas id="overviewChart"></canvas>
            </div>
            <div class="data-column">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Total Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Laptops</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>Printers</td>
                            <td>20</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="tab-content" id="stock-in">
        <div class="reports-container">
            <div class="charts-column">
                <canvas id="stockInChart"></canvas>
            </div>
            <div class="data-column">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Item</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2025-02-10</td>
                            <td>Monitors</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>2025-02-11</td>
                            <td>Keyboards</td>
                            <td>50</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="tab-content" id="stock-out">
        <div class="reports-container">
            <div class="charts-column">
                <canvas id="stockOutChart"></canvas>
            </div>
            <div class="data-column">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Item</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2025-02-08</td>
                            <td>Laptops</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>2025-02-09</td>
                            <td>Mouse</td>
                            <td>25</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="tab-content" id="allocations">
        <div class="reports-container">
            <div class="charts-column">
                <canvas id="allocationsChart"></canvas>
            </div>
            <div class="data-column">
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Item</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>IT</td>
                            <td>Desktops</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td>HR</td>
                            <td>Chairs</td>
                            <td>10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script>// =================Tabs================== 
document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener("click", function () {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove("active"));
                tabContents.forEach(content => content.classList.remove("active"));

                // Add active class to clicked button and corresponding content
                this.classList.add("active");
                const tabId = this.getAttribute("data-tab");
                document.getElementById(tabId)?.classList.add("active");
            });
        });

        // Activate the first tab by default
        tabButtons[0].click();
    }
});
</script>