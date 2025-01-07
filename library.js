// library.js - Data a schémata
const BoeingLibrary = {
    cockpit: {
        pfd: {
            title: 'Primary Flight Display (PFD)',
            schema: `<svg viewBox="0 0 300 200">
                <rect x="0" y="0" width="300" height="200" fill="#1a1a1a"/>
                <circle cx="150" cy="100" r="80" fill="none" stroke="#33cc33" stroke-width="2"/>
                <!-- Zjednodušené PFD schéma -->
            </svg>`,
            elements: [
                {
                    name: 'Rychloměr',
                    position: { x: 50, y: 100 },
                    description: 'Zobrazení indikované rychlosti (IAS)',
                    details: 'Zobrazuje aktuální rychlost letadla vůči okolnímu vzduchu. Obsahuje také rychlostní pásky a limity.'
                },
                {
                    name: 'Umělý horizont',
                    position: { x: 150, y: 100 },
                    description: 'Základní letový přístroj',
                    details: 'Zobrazuje polohu letadla vzhledem k horizontu, náklon a pitch (stoupání/klesání).'
                },
                {
                    name: 'Výškoměr',
                    position: { x: 250, y: 100 },
                    description: 'Indikace výšky a vertikální rychlosti',
                    details: 'Ukazuje aktuální nadmořskou výšku a rychlost stoupání/klesání.'
                }
            ]
        },
        nd: {
            title: 'Navigation Display (ND)',
            schema: `<svg viewBox="0 0 300 200">
                <rect x="0" y="0" width="300" height="200" fill="#1a1a1a"/>
                <path d="M150,100 L150,20" stroke="#33cc33" stroke-width="2"/>
                <!-- Zjednodušené ND schéma -->
            </svg>`,
            elements: [
                {
                    name: 'Mapový režim',
                    position: { x: 80, y: 100 },
                    description: 'Přepínání módů zobrazení',
                    details: 'MAP, PLAN, VOR, APP a další módy pro různé fáze letu.'
                },
                {
                    name: 'Weather Radar',
                    position: { x: 220, y: 100 },
                    description: 'Zobrazení počasí',
                    details: 'Overlay meteorologického radaru pro detekci srážek a bouřek.'
                }
            ]
        }
    },
    
    systems: {
        electrical: {
            title: 'Elektrický systém',
            schema: `<svg viewBox="0 0 300 200">
                <!-- Schéma elektrického systému -->
            </svg>`,
            components: [
                {
                    name: 'Generator 1',
                    status: 'normal',
                    description: 'Hlavní generátor levého motoru'
                },
                {
                    name: 'Generator 2',
                    status: 'normal',
                    description: 'Hlavní generátor pravého motoru'
                }
            ]
        },
        hydraulic: {
            title: 'Hydraulický systém',
            schema: `<svg viewBox="0 0 300 200">
                <!-- Schéma hydraulického systému -->
            </svg>`,
            components: [
                {
                    name: 'System A',
                    status: 'normal',
                    description: 'Primární hydraulický okruh'
                },
                {
                    name: 'System B',
                    status: 'normal',
                    description: 'Sekundární hydraulický okruh'
                }
            ]
        }
    }
};

if (typeof window !== 'undefined') {
    window.BoeingLibrary = BoeingLibrary;
}