// app.js - Hlavní aplikační logika
document.addEventListener('DOMContentLoaded', function() {
    // Navigace mezi hlavními sekcemi
    function showSection(sectionId) {
        // Skrytí všech sekcí
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Zobrazení vybrané sekce
        document.getElementById(sectionId).classList.add('active');
        
        // Aktualizace aktivního tlačítka
        document.querySelectorAll('.nav-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`button[onclick*="'${sectionId}'"]`).classList.add('active');

        // Reset submenu na první položku
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            const firstSubmenuBtn = activeSection.querySelector('.submenu-btn');
            if (firstSubmenuBtn) {
                firstSubmenuBtn.click();
            }
        }
    }
    window.showSection = showSection;

    // Navigace mezi podsekcemi
    function showSubSection(subsectionId) {
        // Najít aktivní sekci
        const activeSection = document.querySelector('.section.active');
        if (!activeSection) return;

        // Aktualizovat submenu tlačítka
        activeSection.querySelectorAll('.submenu-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeSection.querySelector(`button[onclick*="'${subsectionId}'"]`).classList.add('active');

        // Skrýt všechny podsekce v aktivní sekci
        activeSection.querySelectorAll('.subsection').forEach(subsection => {
            subsection.classList.remove('active');
        });

        // Zobrazit vybranou podsekci
        const selectedSubsection = document.getElementById(subsectionId);
        if (selectedSubsection) {
            selectedSubsection.classList.add('active');
            loadSubSectionContent(subsectionId);
        }
    }
    window.showSubSection = showSubSection;

    // Načítání obsahu podsekcí
    function loadSubSectionContent(subsectionId) {
        const contentDiv = document.querySelector(`#${subsectionId}`);
        if (!contentDiv) return;

        switch(subsectionId) {
            case 'pilot-station':
                contentDiv.innerHTML = createPilotStationContent();
                initializeInteractivePoints();
                break;
                
            case 'pedestal':
                contentDiv.innerHTML = createPedestalContent();
                initializeInteractivePoints();
                break;
                
            case 'engine-failure':
                contentDiv.innerHTML = createEmergencyContent(BoeingLibrary.emergency.engineFailure);
                break;
                
            case 'normal':
                contentDiv.innerHTML = createNormalChecklistContent();
                initializeChecklists();
                break;
        }
    }

    // Vytvoření obsahu pro pilotní pracoviště
    function createPilotStationContent() {
        const pfd = BoeingLibrary.cockpit.pilotStation.pfd;
        const nd = BoeingLibrary.cockpit.pilotStation.nd;
        
        return `
            <div class="mobile-card">
                <h3>${pfd.title}</h3>
                <div class="interactive-area pfd-area">
                    ${pfd.elements.map(element => `
                        <div class="interactive-point" 
                             data-name="${element.name}"
                             data-description="${element.description}"
                             style="left: ${element.position.x}px; top: ${element.position.y}px;">
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="mobile-card">
                <h3>${nd.title}</h3>
                <div class="interactive-area nd-area">
                    ${nd.elements.map(element => `
                        <div class="interactive-point" 
                             data-name="${element.name}"
                             data-description="${element.description}"
                             style="left: ${element.position.x}px; top: ${element.position.y}px;">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Vytvoření obsahu pro emergency procedury
    function createEmergencyContent(emergency) {
        return `
            <div class="mobile-card">
                <h3>MEMORY ITEMS</h3>
                <div class="emergency-items">
                    ${emergency.memoryItems.map(item => `
                        <div class="memory-item">${item}</div>
                    `).join('')}
                </div>
            </div>
            ${emergency.procedures.map(procedure => `
                <div class="mobile-card">
                    <h3>${procedure.title}</h3>
                    <div class="procedure-steps">
                        ${procedure.steps.map(step => `
                            <div class="action-item">${step}</div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        `;
    }

    // Inicializace interaktivních bodů
    function initializeInteractivePoints() {
        document.querySelectorAll('.interactive-point').forEach(point => {
            point.addEventListener('click', function() {
                const name = this.dataset.name;
                const description = this.dataset.description;
                showModal(name, description);
            });
        });
    }

    // Zobrazení modálního okna
    function showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${content}</p>
                </div>
            </div>
        `;

        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    }

    // Vytvoření obsahu pro checklisty
    function createNormalChecklistContent() {
        return BoeingLibrary.checklists.normal.map(checklist => `
            <div class="mobile-card">
                <h3>${checklist.title}</h3>
                <div class="checklist-items">
                    ${checklist.items.map(item => `
                        <div class="checklist-item ${item.important ? 'important' : ''}">
                            <div class="checklist-checkbox"></div>
                            <div class="checklist-text">
                                <div class="checklist-title">${item.text}</div>
                                <div class="checklist-description">${item.details}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // Inicializace checklistů
    function initializeChecklists() {
        document.querySelectorAll('.checklist-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', function() {
                this.classList.toggle('checked');
                // Přehrát zvuk checklistu
                playChecklistSound();
            });
        });
    }

    // Přehrání zvuku checklistu
    function playChecklistSound() {
        const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwPz8/Pz8/TU1NTU1NW1tbW1tbaGhoaGhoaHd3d3d3d4aGhoaGhpSUlJSUlKampqampqazs7Ozs7PAwMDAwMDN09PT09PY5ubm5ubm8fHx8fHx/f39/f39//8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAAAAAAAP/zhxBqvVqFuBX3zeHZUIGE0V5LiX1wTDkcyForxaAEgjnVMRzNazg9xcvlmX1jJy8DJpIeCpyBCXD5+cRce0dCbFhyXNlRvV0B6KFSuQHAOFMb0DOWIki0+JXgVW53jW5BVojwdiSY8FgC9CvDdWf/1oIv/qH+s5bLFFQpP/rJ8KgAgFVqFuJQIFsd+4L/xIYSJjpahbgkDpzBLDsR0B7+DEBwrw30k3ZR/T/+YP6zmmemm0j//1TIACqwAAAABQPVQ0CQRw8e07i8BHjxwTe0K99QryH/+HkM5qULwD/6DHC9SqmA42lff+Y4U8jLkOl8H/+sZ7HZVmSwP/5P8SEjIEGFkP/5f4DmlyXAlUE0h/+T4JvIuxXr/1nqFuNJHi/+u9AaUqpgM5hBJ/+wtMZKilyYEay/+t+TTkVKVkl//k/yf5P/5P/jf6gAgFj5VAAYfOboziuSRyukFJXdmWIz0v75g3B/lVBpZnrKg/mqkf/qH+/+o8zy9MVnkZ6pIwAARgGXlW4KCQDQEheqY5WpcsBKBV1KU6CXHh/1H/S5Cf/ghOGztX/0n4ARmFVK0GOGr4ZBSS4OOrLF0YltHg4RzVRQAACAwLXIcTyJLy0MIsR4OVsUNzQCQM2kP33tXwqoAgAqIuf/iQ08AQABzIBB0QcYc8X+SmYICAenxRG0ucNQMPy/hVaBgWsgFtAAAIAMgPSJl5rfErcy/dScKvQ4k1d5rKqyg/+gxJ47B+zv/mGM1kAnAFUALzOal8skEAmE0TXR5/4Y6BwZQT/qGYTz//PAYxpMB0B6aAFsAVwAVYcrQkACXcAxHPBAhsdUeGOi5Qn3OCxnL20B//IYPPyH/8nwQuD4Y67k/9ZzhVAGWAuAKNAbaRc/9VJFTf/zwQMGGFsAacArQB0AAAAAACAAASMShZQ3BAp0ElB/TQPZIAYB/iD0EE4TRL9w8jCBEQ7Pv/1wmQaohOGon//U4AWYAD1c4AKwGJM/+r8mE2m5sRRGvTmf/+YM6vGMRidy/ZDeTnTpE68zR+f/1OAAKwAVwm//foIAsAFwJB1C3JOlf+tKZ7LAr/6RVry4tf/9b/rKZW1gGcANIWYP4WwW6l/6w4Dv/zqcYZRgAAIwGILSmOm5UIBwP2U8Wn/0jNF7IlL/0J/9YzAqAOggAQAMAAAAAAAAAACYZE6qNJ0zN/8YlOqDvz//XqQzhMqf+sTj/1dyQpqx7Hz/+sLsDqBFLf/XyfCDJK7CZf/WEy5e2n/+sMX95S/+j6gxSohjKf/6ia8WwNxP/LENY25n//UShv/qcM37/+SSN/7I1UPwNh//1PYGyXhSktf/ENAXCyZ3+Y/6nkAUAGsFX/9YDnLA1f+qAcXf/0EFsQAgAqAMAAAAAAAAAACmAD9LKzZv+4PBe9JP3/+sA9TgT/4olL/1mOFYAbAFcAekv/9cHQVID/qOgxTv//qPEZ9f+expwCAA2AAAAAAAAAAAAAAA==');
        audio.play();
    }

    // Inicializace aplikace
    showSection('cockpit');
});