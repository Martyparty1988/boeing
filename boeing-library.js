// boeing-library.js

const BoeingLibrary = {
    // Procedury a checklisty
    procedures: {
        preflight: {
            title: 'Předletová příprava',
            steps: [
                {
                    text: 'Kontrola dokumentace letadla',
                    details: 'Zkontrolujte technický deník, MEL/CDL položky a platnost dokumentů',
                    important: true,
                    cockpitArea: 'documents'
                },
                {
                    text: 'Externí prohlídka (Walkaround)',
                    details: 'Proveďte vnější prohlídku letadla dle stanovených postupů',
                    important: true,
                    cockpitArea: 'external'
                }
            ]
        },
        engine_start: {
            title: 'Spouštění motorů',
            steps: [
                {
                    text: 'Předstartovní checklist',
                    details: 'Projděte všechny položky předstartovního checklistu',
                    important: true,
                    cockpitArea: 'overhead'
                }
            ]
        }
    },

    // Nouzové postupy
    emergency: {
        engine_fire: {
            title: 'Požár motoru',
            immediate_actions: [
                'Postižený motor - VYPNOUT',
                'Požární páka - VYTÁHNOUT A OTOČIT',
                'APU - SPUSTIT pokud je potřeba'
            ],
            subsequent_actions: [
                'Provést Engine Fire checklist',
                'Připravit se na přistání s jedním motorem'
            ]
        },
        hydraulic_loss: {
            title: 'Ztráta hydrauliky',
            immediate_actions: [
                'Identifikovat postižený systém',
                'Engine driven pump - VYPNOUT pokud je potřeba'
            ]
        }
    },

    // Systémy kokpitu
    cockpit: {
        overhead: {
            title: 'Overhead Panel',
            components: [
                { name: 'Electrical System', position: { x: 20, y: 30 } },
                { name: 'Hydraulic System', position: { x: 120, y: 30 } }
            ]
        },
        pedestal: {
            title: 'Pedestal',
            components: [
                { name: 'Thrust Levers', position: { x: 50, y: 50 } },
                { name: 'Speed Brake', position: { x: 150, y: 50 } }
            ]
        }
    },

    // Výkonnostní výpočty
    performance: {
        calculateTakeoff: function(weight, temp, altimeter, runway, wind) {
            const v1 = Math.round(120 + (weight / 1000) * 0.2 + (temp / 10));
            const vr = Math.round(v1 + 5);
            const v2 = Math.round(vr + 15);
            
            return {
                v1,
                vr,
                v2,
                todr: Math.round((weight / 1000) * 20 + (temp * 15)),
                flaps: weight > 65000 ? '5' : '1',
                thrust: temp > 30 ? 'FLEX/MCT' : 'TOGA'
            };
        },
        
        calculateLanding: function(weight, temp, wind, runway) {
            return {
                vref: Math.round(130 + (weight / 1000) * 0.3),
                lda: Math.round((weight / 1000) * 15 + (temp * 10)),
                autobrake: weight > 60000 ? '3' : '2'
            };
        }
    },

    // Utility funkce
    utils: {
        validateInputs: function(inputs) {
            const { weight, temp, altimeter } = inputs;
            const errors = {};
            
            if (weight < 40000 || weight > 85000) {
                errors.weight = 'Váha musí být mezi 40,000 a 85,000 kg';
            }
            if (temp < -40 || temp > 50) {
                errors.temp = 'Teplota musí být mezi -40°C a 50°C';
            }
            if (altimeter < 900 || altimeter > 1100) {
                errors.altimeter = 'QNH musí být mezi 900 a 1100 hPa';
            }
            
            return {
                isValid: Object.keys(errors).length === 0,
                errors
            };
        },
        
        formatWindComponent: function(windDirection, windSpeed, runwayHeading) {
            const angle = Math.abs(windDirection - runwayHeading);
            const headwind = Math.round(Math.cos(angle * Math.PI / 180) * windSpeed);
            const crosswind = Math.round(Math.sin(angle * Math.PI / 180) * windSpeed);
            
            return {
                headwind,
                crosswind
            };
        }
    }
};

// Export pro použití v modulu
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BoeingLibrary;
}
