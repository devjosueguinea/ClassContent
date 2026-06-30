// CONTROLADOR DE PESTAÑAS (TABS)
function activateTab(tabId) {
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    const targetPanel = document.getElementById('panel-' + tabId);
    const targetBtn = document.getElementById('btn-' + tabId);

    if (targetPanel && targetBtn) {
        targetPanel.classList.add('active');
        targetBtn.classList.add('active');
    }
}

// CONTROLADOR DE ACORDEÓN
function toggleAccordion(button) {
    const item = button.parentElement;
    const isOpen = item.classList.contains('open');

    // Cerrar los demás acordeones para mantener el diseño ordenado
    document.querySelectorAll('.accordion-item-v4').forEach(el => {
        el.classList.remove('open');
        const icon = el.querySelector('.icon-state');
        if (icon) icon.textContent = '➕';
    });

    // Si no estaba abierto, abrirlo
    if (!isOpen) {
        item.classList.add('open');
        const icon = button.querySelector('.icon-state');
        if (icon) icon.textContent = '➖';
    }
}

// SIMULADOR INTERACTIVO DE CLASE Y OBJETO
function updateCarSimulator() {
    const brand = document.getElementById('sim-brand').value || 'Toyota';
    const model = document.getElementById('sim-model').value || 'Corolla';
    const year = parseInt(document.getElementById('sim-year').value) || 2023;
    const price = parseFloat(document.getElementById('sim-price').value) || 25000.0;

    // Código de Instanciación en main
    const instCode = `Coche miCoche = new Coche("${brand}", "${model}", ${year}, ${price});\nSystem.out.println(miCoche.toString());`;
    document.getElementById('sim-inst-code').textContent = instCode;

    // Salida del toString() evaluada
    const toStringOutput = `Coche{marca='${brand}', modelo='${model}', anio=${year}, precio=${price.toFixed(2)}}`;
    document.getElementById('sim-tostring-output').textContent = toStringOutput;
}

// LOGICA INTERACTIVA DEL QUIZ DE RELACIÓN
let activeConceptElement = null;
let completedMatchesCount = 0;

function initMatchQuiz() {
    const conceptNodes = document.querySelectorAll('#col-concepts .match-item-v4');
    const analogyNodes = document.querySelectorAll('#col-analogies .match-item-v4');

    conceptNodes.forEach(node => {
        node.addEventListener('click', () => {
            if (node.classList.contains('matched')) return;
            conceptNodes.forEach(n => n.classList.remove('selected'));
            activeConceptElement = node;
            node.classList.add('selected');
        });
    });

    analogyNodes.forEach(node => {
        node.addEventListener('click', () => {
            if (node.classList.contains('matched') || !activeConceptElement) return;

            const conceptId = activeConceptElement.getAttribute('data-id');
            const analogyMatchId = node.getAttribute('data-match');

            if (conceptId === analogyMatchId) {
                activeConceptElement.classList.remove('selected');
                activeConceptElement.classList.add('matched');
                node.classList.add('matched');
                activeConceptElement = null;
                completedMatchesCount++;

                if (completedMatchesCount === 5) {
                    const resultCard = document.getElementById('quiz-result-v4');
                    if (resultCard) resultCard.style.display = 'block';
                }
            } else {
                node.style.borderColor = '#ef4444';
                activeConceptElement.style.borderColor = '#ef4444';
                setTimeout(() => {
                    if (!node.classList.contains('matched')) node.style.borderColor = '';
                    if (!activeConceptElement.classList.contains('matched')) activeConceptElement.style.borderColor = '';
                }, 400);
            }
        });
    });
}

function resetMatchGame() {
    completedMatchesCount = 0;
    activeConceptElement = null;
    const resultCard = document.getElementById('quiz-result-v4');
    if (resultCard) resultCard.style.display = 'none';

    document.querySelectorAll('.match-item-v4').forEach(node => {
        node.classList.remove('selected', 'matched');
        node.style.borderColor = '';
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initMatchQuiz();
    updateCarSimulator();
    
    // Escuchar cambios en los inputs del simulador
    const inputs = ['sim-brand', 'sim-model', 'sim-year', 'sim-price'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', updateCarSimulator);
        }
    });
});
