// app.js

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
    Checklist,
    CockpitView,
    EmergencyProcedures,
    PerformanceCalculator
} from './components';
import BoeingLibrary from './boeing-library';

const App = () => {
    const [currentView, setCurrentView] = useState('checklist');
    const [isOffline, setIsOffline] = useState(false);
    const [performanceData, setPerformanceData] = useState(null);

    // Kontrola offline režimu
    useEffect(() => {
        const checkConnectivity = () => {
            setIsOffline(!navigator.onLine);
        };

        window.addEventListener('online', checkConnectivity);
        window.addEventListener('offline', checkConnectivity);
        checkConnectivity();

        return () => {
            window.removeEventListener('online', checkConnectivity);
            window.removeEventListener('offline', checkConnectivity);
        };
    }, []);

    // Zpracování výkonnostních dat
    const handlePerformanceCalculation = (inputs) => {
        const { isValid, errors } = BoeingLibrary.utils.validateInputs(inputs);
        
        if (isValid) {
            const results = BoeingLibrary.performance.calculateTakeoff(
                inputs.weight,
                inputs.temp,
                inputs.altimeter,
                inputs.runway,
                inputs.wind
            );
            setPerformanceData(results);
        } else {
            alert('Neplatné vstupní hodnoty: ' + Object.values(errors).join('\n'));
        }
    };

    // Navigační komponenta
    const Navigation = () => (
        <nav className="mb-4">
            <div className="flex space-x-4">
                <button
                    onClick={() => setCurrentView('checklist')}
                    className={`px-4 py-2 rounded ${
                        currentView === 'checklist' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    Checklisty
                </button>
                <button
                    onClick={() => setCurrentView('cockpit')}
                    className={`px-4 py-2 rounded ${
                        currentView === 'cockpit' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    Kokpit
                </button>
                <button
                    onClick={() => setCurrentView('emergency')}
                    className={`px-4 py-2 rounded ${
                        currentView === 'emergency' ? 'bg-red-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    Nouzové postupy
                </button>
                <button
                    onClick={() => setCurrentView('performance')}
                    className={`px-4 py-2 rounded ${
                        currentView === 'performance' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    Výkony
                </button>
            </div>
        </nav>
    );

    return (
        <div className="container mx-auto p-4">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">B737NG Guide</h1>
                {isOffline && (
                    <div className="bg-yellow-100 p-2 rounded">
                        Offline režim aktivní
                    </div>
                )}
            </header>

            <Navigation />

            <main>
                {currentView === 'checklist' && (
                    <Checklist procedures={BoeingLibrary.procedures} />
                )}
                {currentView === 'cockpit' && (
                    <CockpitView systems={BoeingLibrary.cockpit} />
                )}
                {currentView === 'emergency' && (
                    <EmergencyProcedures procedures={BoeingLibrary.emergency} />
                )}
                {currentView === 'performance' && (
                    <PerformanceCalculator
                        onCalculate={handlePerformanceCalculation}
                        results={performanceData}
                    />
                )}
            </main>
        </div>
    );
};

// Inicializace aplikace
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
