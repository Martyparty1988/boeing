// components/index.js

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ArrowRight } from 'lucide-react';

// Checklist komponenta
export const Checklist = ({ procedures }) => (
    <div className="space-y-4">
        {Object.entries(procedures).map(([key, procedure]) => (
            <Card key={key}>
                <CardHeader>
                    <CardTitle>{procedure.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {procedure.steps.map((step, index) => (
                        <div key={index} className="mb-2 p-4 border rounded hover:bg-gray-50">
                            <div className="flex items-center">
                                {step.important && (
                                    <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                                )}
                                <div>
                                    <div className="font-medium">{step.text}</div>
                                    <div className="text-sm text-gray-600">{step.details}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        ))}
    </div>
);

// Kokpit komponenta
export const CockpitView = ({ systems }) => (
    <div className="space-y-6">
        {Object.entries(systems).map(([key, system]) => (
            <Card key={key}>
                <CardHeader>
                    <CardTitle>{system.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative h-96 bg-gray-100 rounded">
                        {system.components.map((component, index) => (
                            <div
                                key={index}
                                className="absolute"
                                style={{
                                    left: `${component.position.x}px`,
                                    top: `${component.position.y}px`
                                }}
                            >
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                <span className="text-sm absolute mt-1">{component.name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
);

// Nouzové postupy komponenta
export const EmergencyProcedures = ({ procedures }) => (
    <div className="space-y-6">
        {Object.entries(procedures).map(([key, procedure]) => (
            <Card key={key} className="border-red-200">
                <CardHeader className="bg-red-50">
                    <CardTitle className="text-red-600 flex items-center">
                        <AlertTriangle className="w-6 h-6 mr-2" />
                        {procedure.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-red-500 mb-2">Okamžité činnosti:</h4>
                            <ul className="space-y-2">
                                {procedure.immediate_actions.map((action, index) => (
                                    <li key={index} className="flex items-center">
                                        <ArrowRight className="w-4 h-4 mr-2 text-red-500" />
                                        {action}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-orange-500 mb-2">Následné činnosti:</h4>
                            <ul className="space-y-2">
                                {procedure.subsequent_actions.map((action, index) => (
                                    <li key={index} className="flex items-center">
                                        <ArrowRight className="w-4 h-4 mr-2 text-orange-500" />
                                        {action}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
);

// Výkonnostní kalkulátor komponenta
export const PerformanceCalculator = ({ onCalculate, results }) => {
    const [inputs, setInputs] = React.useState({
        weight: '',
        temp: '',
        altimeter: '',
        runway: '',
        wind: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCalculate(inputs);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Výkonnostní kalkulátor</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Váha (kg)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={inputs.weight}
                                onChange={(e) => setInputs({
                                    ...inputs,
                                    weight: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Teplota (°C)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={inputs.temp}
                                onChange={(e) => setInputs({
                                    ...inputs,
                                    temp: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                QNH (hPa)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={inputs.altimeter}
                                onChange={(e) => setInputs({
                                    ...inputs,
                                    altimeter: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Runway
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={inputs.runway}
                                onChange={(e) => setInputs({
                                    ...inputs,
                                    runway: e.target.value
                                })}
                                required
                            />
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Vypočítat
                    </button>
                </form>

                {results && (
                    <div className="mt-6 p-4 bg-gray-50 rounded">
                        <h3 className="font-bold mb-2">Výsledky:</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-gray-600">V1:</div>
                                <div className="font-medium">{results.v1} kt</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">VR:</div>
                                <div className="font-medium">{results.vr} kt</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">V2:</div>
                                <div className="font-medium">{results.v2} kt</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">TODR:</div>
                                <div className="font-medium">{results.todr} m</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Flaps:</div>
                                <div className="font-medium">{results.flaps}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Thrust:</div>
                                <div className="font-medium">{results.thrust}</div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default {
    Checklist,
    CockpitView,
    EmergencyProcedures,
    PerformanceCalculator
};
