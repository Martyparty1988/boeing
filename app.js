// app.js
document.addEventListener('DOMContentLoaded', function() {
    // Přepínání hlavních sekcí
    window.showSection = function(sectionId) {
        // Deaktivace všech sekcí a tlačítek
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.nav-button').forEach(button => {
            button.classList.remove('active');
        });

        // Aktivace vybrané sekce a tlačítka
        document.getElementById(sectionId).classList.add('active');
        document.querySelector(`button[onclick*="${sectionId}"]`).classList.add('active');

        // Aktivace první podsekce
        const firstSubButton = document.querySelector(`#${sectionId} .sub-button`);
        if (firstSubButton) {
            firstSubButton.click();
        }
    };

    // Přepínání podsekcí
    window.showSubSection = function(subsectionId) {
        // Najít aktivní sekci
        const activeSection = document.querySelector('.section.active');
        if (!activeSection) return;

        // Deaktivace všech podsekcí a tlačítek v aktivní sekci
        activeSection.querySelectorAll('.subsection').forEach(subsection => {
            subsection.classList.remove('active');
        });
        activeSection.querySelectorAll('.sub-button').forEach(button => {
            button.classList.remove('active');
        });

        // Aktivace vybraného tlačítka
        const button = activeSection.querySelector(`button[onclick*="${subsectionId}"]`);
        if (button) {
            button.classList.add('active');
        }

        // Aktivace vybrané podsekce a načtení obsahu
        const subsection = document.getElementById(subsectionId);
        if (subsection) {
            subsection.classList.add('active');
            loadContent(subsectionId);
        }
    };

    // Načítání obsahu
    function loadContent(subsectionId) {
        const subsection = document.getElementById(subsectionId);
        if (!subsection) return;

        switch(subsectionId) {
            case 'pilotni':
                loadPFDContent(subsection);
                loadNDContent(subsection);
                break;
            case 'elektricky':
                loadSystemContent(subsection, BoeingLibrary.systems.electrical);
                break;
            case 'engine-failure':
                loadEmergencyContent(subsection, BoeingLibrary.emergency.engineFailure);
                break;
            case 'normal':
                loadChecklistContent(subsection, BoeingLibrary.checklists.normal);
                break;
        }
    }

    // Načtení PFD obsahu
    function loadPFDContent(container) {
        const pfdArea = container.querySelector('.interactive-area');
        if (!pfdArea) return;

        // Vyčištění existujících bodů
        pfdArea.innerHTML = '';

        // Přidání interaktivních bodů
        BoeingLibrary.cockpit.pfd.elements.forEach(element => {
            const point = createInteractivePoint(element);
            pfdArea.appendChild(point);
        });
    }

    // Vytvoření interaktivního bodu
    function createInteractivePoint(element) {
        const point = document.createElement('div');
        point.className = 'interactive-point';
        point.style.left = `${element.position.x}px`;
        point.style.top = `${element.position.y}px`;

        const dot = document.createElement('div');
        dot.className = 'point-dot';
        point.appendChild(dot);

        point.addEventListener('click', () => {
            showInfo(element.name, element.description);
        });

        return point;
    }

    // Zobrazení informačního okna
    function showInfo(title, description) {
        const info = document.createElement('div');
        info.className = 'card';
        info.style.position = 'fixed';
        info.style.top = '50%';
        info.style.left = '50%';
        info.style.transform = 'translate(-50%, -50%)';
        info.style.zIndex = '1000';
        info.style.maxWidth = '90%';
        info.style.width = '300px';

        info.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <button onclick="this.parentElement.remove()" style="margin-top: 10px">Zavřít</button>
        `;

        document.body.appendChild(info);
    }

    // Načtení Emergency obsahu
    function loadEmergencyContent(container, data) {
        container.innerHTML = `
            <div class="card">
                <h2>${data.title}</h2>
                <div style="color: red; margin-top: 10px">
                    <h3>Memory Items:</h3>
                    ${data.memoryItems.map(item => `<div style="margin: 5px 0">${item}</div>`).join('')}
                </div>
            </div>
        `;
    }

    // Načtení Checklist obsahu
    function loadChecklistContent(container, checklists) {
        container.innerHTML = checklists.map(checklist => `
            <div class="card">
                <h2>${checklist.title}</h2>
                ${checklist.items.map(item => `
                    <div style="display: flex; align-items: center; margin: 10px 0">
                        <input type="checkbox" style="margin-right: 10px">
                        <div>
                            <div style="font-weight: bold">${item.text}</div>
                            <div style="color: gray">${item.details}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    // Inicializace první sekce
    showSection('kokpit');
});