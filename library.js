// library.js
const BoeingLibrary = {
    procedures: [
        {
            title: 'Předletová příprava',
            steps: [
                {
                    text: 'Kontrola dokumentace letadla',
                    details: 'Zkontrolujte technický deník, MEL/CDL položky a platnost dokumentů',
                    important: true
                },
                {
                    text: 'Externí prohlídka (Walkaround)',
                    details: 'Proveďte vnější prohlídku letadla dle stanovených postupů',
                    important: true
                },
                {
                    text: 'Kontrola množství paliva',
                    details: 'Ověřte množství paliva a jeho distribuci v nádržích',
                    important: true
                }
            ]
        },
        {
            title: 'Spouštění motorů',
            steps: [
                {
                    text: 'Předstartovní checklist',
                    details: 'Projděte všechny položky předstartovního checklistu',
                    important: true
                },
                {
                    text: 'Engine Start Selector',
                    details: 'Nastavte do pozice GRD',
                    important: false
                },
                {
                    text: 'N2 rotace',
                    details: 'Sledujte nárůst N2 na 25%',
                    important: true
                }
            ]
        }
    ],

    emergency: {
        engine_fire: {
            title: 'Požár motoru',
            immediate_actions: [
                'Postižený motor - VYPNOUT',
                'Požární páka - VYTÁHNOUT A OTOČIT',
                'APU - SPUSTIT pokud je potřeba',
                'Přistát na nejbližším vhodném letišti'
            ],
            subsequent_actions: [
                'Provést Engine Fire checklist',
                'Připravit se na přistání s jedním motorem',
                'Deklarovat emergency'
            ]
        },
        hydraulic_loss: {
            title: 'Ztráta hydrauliky',
            immediate_actions: [
                'Identifikovat postižený systém',
                'Engine driven pump - VYPNOUT pokud je potřeba',
                'Alternate flaps - PŘIPRAVIT pokud je potřeba'
            ],
            subsequent_actions: [
                'Provést Hydraulic Loss checklist',
                'Připravit se na manuální vysunování podvozku',
                'Plánovat delší dojezd'
            ]
        }
    },

    cockpit: {
        overhead: {
            title: 'Overhead Panel',
            components: [
                { name: 'Electrical System', position: { x: 50, y: 50 } },
                { name: 'Hydraulic System', position: { x: 150, y: 50 } },
                { name: 'Fuel System', position: { x: 250, y: 50 } }
            ]
        },
        pedestal: {
            title: 'Pedestal',
            components: [
                { name: 'Thrust Levers', position: { x: 50, y: 150 } },
                { name: 'Speed Brake', position: { x: 150, y: 150 } },
                { name: 'Flap Lever', position: { x: 250, y: 150 } }
            ]
        }
    },

    performance: {
        calculateTakeoff: function(weight, temp, altimeter, runway) {
            // Zjednodušený výpočet výkonnostních parametrů
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
        }
    }
};

// Export knihovny pro použití v prohlížeči
if (typeof window !== 'undefined') {
    window.BoeingLibrary = BoeingLibrary;
}