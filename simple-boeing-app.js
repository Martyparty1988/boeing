// app.js
document.addEventListener('DOMContentLoaded', function() {
    // Navigace mezi sekcemi
    function showSection(sectionId) {
        // Skrytí všech sekcí
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Zobrazení vybrané sekce
        document.getElementById(sectionId).classList.add('active');
        
        // Aktualizace aktivního tlačítka
        document.querySelectorAll('nav button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`button[onclick="showSection('${sectionId}')"]`).classList.add('active');
    }
    window.showSection = showSection;

    // Načtení checklistů
    function loadChecklists() {
        const checklistContainer = document.querySelector('.checklist-items');
        BoeingLibrary.procedures.forEach(procedure => {
            const procedureElement = document.createElement('div');
            procedureElement.className = 'card';
            procedureElement.innerHTML = `
                <h3>${procedure.title}</h3>
                <div class="checklist-items">
                    ${procedure.steps.map(step => `
                        <div class="checklist-item ${step.important ? 'important' : ''}">
                            <h4>${step.text}</h4>
                            <p>${step.details}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            checklistContainer.appendChild(procedureElement);
        });
    }

    // Načtení kokpitu
    function loadCockpit() {
        const cockpitContainer = document.querySelector('.cockpit-view');
        Object.entries(BoeingLibrary.cockpit).forEach(([key, system]) => {
            system.components.forEach(component => {
                const componentElement = document.createElement('div');
                componentElement.className = 'cockpit-component';
                componentElement.style.left = `${component.position.x}px`;
                componentElement.style.top = `${component.position.y}px`;
                componentElement.innerHTML = `
                    <div class="component-dot"></div>
                    <span>${component.name}</span>
                `;
                componentElement.addEventListener('click', () => {
                    alert(`${system.title}: ${component.name}`);
                });
                cockpitContainer.appendChild(componentElement);
            });
        });
    }

    // Načtení nouzových procedur
    function loadEmergencyProcedures() {
        const emergencyContainer = document.querySelector('.emergency-procedures');
        Object.entries(BoeingLibrary.emergency).forEach(([key, procedure]) => {
            const procedureElement = document.createElement('div');
            procedureElement.className = 'emergency-procedure';
            procedureElement.innerHTML = `
                <h3>${procedure.title}</h3>
                <div class="immediate-actions">
                    <h4>Okamžité činnosti:</h4>
                    <ul>
                        ${procedure.immediate_actions.map(action => `
                            <li>${action}</li>
                        `).join('')}
                    </ul>
                </div>
                <div class="subsequent-actions">
                    <h4>Následné činnosti:</h4>
                    <ul>
                        ${procedure.subsequent_actions.map(action => `
                            <li>${action}</li>
                        `).join('')}
                    </ul>
                </div>
            `;
            emergencyContainer.appendChild(procedureElement);
        });
    }

    // Výkonnostní kalkulátor
    const performanceForm = document.getElementById('performance-form');
    const resultsDiv = document.getElementById('performance-results');

    performanceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = {
            weight: Number(document.getElementById('weight').value),
            temp: Number(document.getElementById('temp').value),
            altimeter: Number(document.getElementById('qnh').value),
            runway: document.getElementById('runway').value,
        };

        const results = BoeingLibrary.performance.calculateTakeoff(
            inputs.weight,
            inputs.temp,
            inputs.altimeter,
            inputs.runway
        );

        resultsDiv.innerHTML = `
            <h3>Výsledky:</h3>
            <div class="results-grid">
                <div class="result-item">
                    <label>V1:</label>
                    <span>${results.v1} kt</span>
                </div>
                <div class="result-item">
                    <label>VR:</label>
                    <span>${results.vr} kt</span>
                </div>
                <div class="result-item">
                    <label>V2:</label>
                    <span>${results.v2} kt</span>
                </div>
                <div class="result-item">
                    <label>TODR:</label>
                    <span>${results.todr} m</span>
                </div>
                <div class="result-item">
                    <label>Flaps:</label>
                    <span>${results.flaps}</span>
                </div>
                <div class="result-item">
                    <label>Thrust:</label>
                    <span>${results.thrust}</span>
                </div>
            </div>
        `;
        resultsDiv.classList.remove('hidden');
    });

    // Inicializace aplikace
    loadChecklists();
    loadCockpit();
    loadEmergencyProcedures();
});