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

// SIMULADOR INTERACTIVO DE ESTRUCTURAS DE DATOS
let simulatorData = [];

function changeSimulatorStructure() {
    const struct = document.getElementById('sim-struct-type').value;
    const keyFieldGroup = document.getElementById('sim-key-group');
    
    // Si es un Mapa (HashMap o TreeMap), mostramos el campo clave
    if (struct === 'hashmap' || struct === 'treemap') {
        keyFieldGroup.style.display = 'flex';
    } else {
        keyFieldGroup.style.display = 'none';
    }
    
    // Limpiamos los datos al cambiar de estructura para evitar inconsistencias
    clearSimulator();
}

function clearSimulator() {
    simulatorData = [];
    renderSimulator();
}

function addToSimulator() {
    const struct = document.getElementById('sim-struct-type').value;
    const keyInput = document.getElementById('sim-key').value.trim();
    const valInput = document.getElementById('sim-value').value.trim();

    if (!valInput) {
        showModal('⚠️ <strong>Atención:</strong> Por favor, ingresa un valor.');
        return;
    }

    if ((struct === 'hashmap' || struct === 'treemap') && !keyInput) {
        showModal('⚠️ <strong>Atención:</strong> Por favor, ingresa una clave para el mapa.');
        return;
    }

    if (struct === 'hashmap' || struct === 'treemap') {
        // En los Mapas, la clave es única. Si existe, reemplazamos el valor
        const existingIndex = simulatorData.findIndex(item => item.key === keyInput);
        if (existingIndex > -1) {
            simulatorData[existingIndex].value = valInput;
        } else {
            simulatorData.push({ key: keyInput, value: valInput });
        }

        // TreeMap se ordena automáticamente por clave
        if (struct === 'treemap') {
            simulatorData.sort((a, b) => a.key.localeCompare(b.key));
        }
    } else if (struct === 'hashset') {
        // En HashSet, el valor es único y no hay claves
        if (!simulatorData.some(item => item.value === valInput)) {
            simulatorData.push({ value: valInput });
        } else {
            showModal(`❌ <strong>Duplicado rechazado:</strong> El HashSet rechazó el valor duplicado <code>"${valInput}"</code> ya que todos sus elementos deben ser únicos.`);
        }
    } else {
        // ArrayList o LinkedList
        simulatorData.push({ value: valInput });
    }

    // Limpiar campos de texto
    document.getElementById('sim-key').value = '';
    document.getElementById('sim-value').value = '';

    renderSimulator();
}

function renderSimulator() {
    const struct = document.getElementById('sim-struct-type').value;
    const container = document.getElementById('viz-elements-display');
    if (!container) return;

    container.innerHTML = '';

    if (simulatorData.length === 0) {
        container.innerHTML = '<span style="color: #64748b; font-style: italic;">La estructura está vacía. Añade elementos arriba.</span>';
        return;
    }

    simulatorData.forEach((item, index) => {
        // Si es LinkedList y no es el primer elemento, añadimos una flecha bidireccional
        if (struct === 'linkedlist' && index > 0) {
            const arrow = document.createElement('div');
            arrow.className = 'viz-arrow';
            arrow.textContent = '⇄';
            container.appendChild(arrow);
        } else if (struct === 'arraylist' && index > 0) {
            // Flecha simple para denotar secuencia indexada
            const arrow = document.createElement('div');
            arrow.className = 'viz-arrow';
            arrow.textContent = '→';
            container.appendChild(arrow);
        }

        const node = document.createElement('div');
        node.className = 'viz-node';

        if (struct === 'hashmap' || struct === 'treemap') {
            node.innerHTML = `
                <div class="node-key">Clave: ${item.key}</div>
                <div>${item.value}</div>
            `;
        } else if (struct === 'arraylist') {
            node.innerHTML = `
                <div class="node-key">Índice: ${index}</div>
                <div>${item.value}</div>
            `;
        } else if (struct === 'linkedlist') {
            node.innerHTML = `
                <div class="node-key">Nodo ${index}</div>
                <div>${item.value}</div>
            `;
        } else {
            // HashSet
            node.innerHTML = `<div>${item.value}</div>`;
        }

        container.appendChild(node);
    });
}

// LOGICA INTERACTIVA DEL QUIZ DE RELACIÓN
let activeConceptElement = null;
let completedMatchesCount = 0;

function initMatchQuiz() {
    const conceptNodes = document.querySelectorAll('#col-concepts .match-item-v5');
    const analogyNodes = document.querySelectorAll('#col-analogies .match-item-v5');

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
                    const resultCard = document.getElementById('quiz-result-v5');
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
    const resultCard = document.getElementById('quiz-result-v5');
    if (resultCard) resultCard.style.display = 'none';

    document.querySelectorAll('.match-item-v5').forEach(node => {
        node.classList.remove('selected', 'matched');
        node.style.borderColor = '';
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initMatchQuiz();
    changeSimulatorStructure();
});

// FUNCIONES DEL MODAL
function showModal(message) {
    const modal = document.getElementById('custom-modal');
    const msgContainer = document.getElementById('modal-message');
    if (modal && msgContainer) {
        msgContainer.innerHTML = message;
        modal.style.display = 'block';
    }
}

// CERRAR MODAL
function closeModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// CERRAR HACIENDO CLIC AFUERA
window.addEventListener('click', (event) => {
    const modal = document.getElementById('custom-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
