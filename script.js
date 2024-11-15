
const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
const strategyArray = [
    {
        View: 'Bullish',
        Value: {
            '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call'],
            '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call'],
            '09-May-2024': ['Strategy Put', 'Strategy Call']
        }
    },
    {
        View: 'Bearish',
        Value: {
            '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Long Put'],
            '31-May-2024': ['Long Put', 'Long Put']
        }
    },
    {
        View: 'RangeBound',
        Value: {
            '24-Apr-2024': ['Short Straddle', 'Short Strangle'],
            '21-Jun-2024': ['Iron Condor', 'Iron Butterfly']
        }
    },
    {
        View: 'Volatile',
        Value: {
            '02-May-2024': ['Long Straddle', 'Long Strangle', 'Strategy1'],
            '09-May-2024': ['Long Straddle', 'Long Straddle']
        }
    }
];

let currentView = 'Bullish';

function setView(view) {
    currentView = view;
    document.querySelectorAll('.toggle button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(view).classList.add('active');
    renderStrategies();
}

function initializeDateDropdown() {
    const dateDropdown = document.getElementById('dateDropdown');
    dateArray.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dateDropdown.appendChild(option);
    });
}

function renderStrategies() {
    const selectedDate = document.getElementById('dateDropdown').value;
    const strategyData = strategyArray.find(item => item.View === currentView);
    const strategies = strategyData?.Value[selectedDate] || [];
    
    const strategyCards = document.getElementById('strategyCards');
    strategyCards.innerHTML = '';  // Clear existing content

    if (strategies.length === 0) {
        strategyCards.innerHTML = `<div class="empty-state">No strategies for ${selectedDate}</div>`;
    } else {
        const strategyCounts = strategies.reduce((acc, strategy) => {
            acc[strategy] = (acc[strategy] || 0) + 1;
            return acc;
        }, {});

        Object.keys(strategyCounts).forEach(strategyName => {
            const card = document.createElement('div');
            card.classList.add('card');
            const count = strategyCounts[strategyName];
            card.textContent = `${strategyName} (${count} ${count > 1 ? 'Strategies' : 'Strategy'})`;
            strategyCards.appendChild(card);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    initializeDateDropdown();
    renderStrategies();
});
