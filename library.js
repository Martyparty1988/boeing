// library.js - Data a konfigurace
const BoeingLibrary = {
    cockpit: {
        pilotStation: {
            pfd: {
                title: 'Primary Flight Display (PFD)',
                elements: [
                    {
                        name: 'Rychloměr',
                        position: { x: 20, y: 50 },
                        description: 'Zobrazení IAS/TAS, rychlostní pásky a limitů'
                    },
                    {
                        name: 'Umělý horizont',
                        position: { x: 120, y: 50 },
                        description: 'Základní letový přístroj zobrazující polohu letounu'
                    },
                    {
                        name: 'Výškoměr',
                        position: { x: 220, y: 50 },
                        description: 'Indikace výšky, vertikální rychlosti'
                    }
                ]
            },
            nd: {
                title: 'Navigation Display (ND)',
                elements: [
                    {
                        name: 'Mapový režim',
                        position: { x: 50, y: 40 },
                        description: 'MAP, PLAN, VOR, APP módy zobrazení'
                    },
                    {
                        name: 'Počasí',
                        position: { x: 150, y: 40 },
                        description: 'Weather radar overlay'
                    }
                ]
            },
            mcp: {
                title: 'Mode Control Panel',
                elements: [
                    {
                        name: 'Autopilot',
                        position: { x: 30, y: 30 },
                        description: 'CMD A/B, CWS módy'
                    },
                    {
                        name: 'Autothrottle',
                        position: { x: 130, y: 30 },
                        description: 'A/T ARM, spínače'
                    }
                ]
            }
        },
        pedestal: {
            fmc: {
                title: 'FMC/CDU',
                elements: [
                    {
                        name: 'INIT/REF',
                        position: { x: 40, y: 40 },
                        description: 'Inicializace FMC, referenční data'
                    },
                    {
                        name: 'RTE',
                        position: { x: 140, y: 40 },
                        description: 'Zadávání letového plánu'
                    }
                ]
            },
            throttle: {
                title: 'Thrust Levers',
                elements: [
                    {
                        name: 'Thrust Levers',
                        position: { x: 50, y: 50 },
                        description: 'Ovládání tahu motorů'
                    },
                    {
                        name: 'Speed Brake',
                        position: { x: 150, y: 50 },
                        description: 'Ovládání spoilerů'
                    }
                ]
            }
        }
    },

    systems: {
        electrical: {
            title: 'Elektrický systém',
            components: [
                {
                    name: 'Generator 1',
                    status: 'normal',
                    description: 'Levý generátor motorů'
                },
                {
                    name: 'Generator 2',
                    status: 'normal',
                    description: 'Pravý generátor motorů'
                },
                {
                    name: 'APU Generator',
                    status: 'standby',
                    description: 'Záložní generátor APU'
                }
            ],
            diagram: 'electrical-diagram'
        },
        hydraulic: {
            title: 'Hydraulický systém',
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
            ],
            diagram: 'hydraulic-diagram'
        },
        fuel: {
            title: 'Palivový systém',
            components: [
                {
                    name: 'Left Tank',
                    status: 'normal',
                    capacity: 100,
                    current: 80
                },
                {
                    name: 'Center Tank',
                    status: 'normal',
                    capacity: 150,
                    current: 120
                },
                {
                    name: 'Right Tank',
                    status: 'normal',
                    capacity: 100,
                    current: 85
                }
            ],
            diagram: 'fuel-diagram'
        }
    },

    checklists: {
        normal: [
            {
                title: 'PREFLIGHT',
                items: [
                    {
                        text: 'Aircraft Documents',
                        details: 'CHECK VALID',
                        important: true
                    },
                    {
                        text: 'Flight Plan',
                        details: 'VERIFIED',
                        important: true
                    }
                ]
            },
            {
                title: 'BEFORE START',
                items: [
                    {
                        text: 'Circuit Breakers',
                        details: 'CHECKED',
                        important: true
                    },
                    {
                        text: 'Fuel Quantity',
                        details: 'CHECKED/___KG',
                        important: true
                    }
                ]
            }
        ],
        abnormal: [
            {
                title: 'Single Engine Operations',
                items: [
                    {
                        text: 'Affected Engine',
                        details: 'IDENTIFY',
                        important: true
                    },
                    {
                        text: 'Thrust Lever',
                        details: 'CLOSE',
                        important: true
                    }
                ]
            }
        ]
    },

    emergency: {
        engineFailure: {
            title: 'Engine Failure',
            memoryItems: [
                'Affected Engine - IDENTIFY',
                'Thrust Lever - CLOSE',
                'Engine Master - OFF'
            ],
            procedures: [
                {
                    title: 'Engine Failure During Takeoff',
                    steps: [
                        'Maintain directional control',
                        'If before V1 - ABORT',
                        'If after V1 - CONTINUE'
                    ]
                }
            ]
        },
        fire: {
            title: 'Fire',
            memoryItems: [
                'Fire Warning - VERIFY',
                'Engine Master - OFF',
                'Engine Fire Handle - PULL'
            ],
            procedures: [
                {
                    title: 'Engine Fire',
                    steps: [
                        'Fire Warning Bell - SILENCE',
                        'APU - START if required',
                        'Diversion - PLAN'
                    ]
                }
            ]
        },
        depressurization: {
            title: 'Rapid Depressurization',
            memoryItems: [
                'Oxygen Masks - ON',
                'Communication - ESTABLISH',
                'Descent - INITIATE'
            ],
            procedures: [
                {
                    title: 'Emergency Descent',
                    steps: [
                        'Level off - 10,000ft or MEA',
                        'Cabin status - CHECK',
                        'Landing - PLAN'
                    ]
                }
            ]
        }
    }
};

// Export knihovny pro použití v prohlížeči
if (typeof window !== 'undefined') {
    window.BoeingLibrary = BoeingLibrary;
}