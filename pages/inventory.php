<div class="tabs-container">
    <div class="tabs">
        <button class="tab-link active" data-tab="overview">Overview</button>
        <button class="tab-link" data-tab="machines">Machines</button>
        <button class="tab-link" data-tab="equipment">Equipment</button>
        <button class="tab-link" data-tab="assets">Assets</button>
    </div>
    <div class="tab-content" id="overview">
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
                            <th>Available</th>
                            <th>In Use</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Machines</td>
                            <td>50</td>
                            <td>30</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>Equipment</td>
                            <td>80</td>
                            <td>60</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>Assets</td>
                            <td>100</td>
                            <td>90</td>
                            <td>10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="tab-content" id="machines" style="display:none;">
        <p>Machines Inventory Details...</p>
    </div>
    <div class="tab-content" id="equipment" style="display:none;">
        <p>Equipment Inventory Details...</p>
    </div>
    <div class="tab-content" id="assets" style="display:none;">
        <p>Assets Inventory Details...</p>
    </div>
</div>
