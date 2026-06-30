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
    document.querySelectorAll('.accordion-item-v3').forEach(el => {
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

// SELECTOR INTERACTIVO DE RENDIMIENTO (ARRAYLIST vs LINKEDLIST)
function selectPerformanceCase(caseId, button) {
    // Quitar active de botones
    document.querySelectorAll('.perf-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const display = document.getElementById('perf-display-content');
    if (!display) return;

    let contentHTML = '';
    if (caseId === 'search') {
        contentHTML = `<strong>🔍 Búsqueda de Elemento por Índice (ej. <code>lista.get(450)</code>):</strong>
        <p style="margin: 8px 0 0 0;">
            <strong>ArrayList (Ganador ⚡ - O(1)):</strong> Al ser un array contiguo en memoria, calcula la dirección exacta instantáneamente.
            <br><em>LinkedList (Lento - O(n)):</em> Debe recorrer los nodos uno a uno desde el inicio (o el final) hasta llegar al índice 450.
        </p>`;
    } else if (caseId === 'insert-start') {
        contentHTML = `<strong>➕ Inserción o Eliminación al Inicio / Medio (ej. <code>lista.add(0, elemento)</code>):</strong>
        <p style="margin: 8px 0 0 0;">
            <strong>LinkedList (Ganador ⚡ - O(1)):</strong> Solo necesita reajustar los enlaces del nuevo nodo con el antiguo primer nodo.
            <br><em>ArrayList (Lento - O(n)):</em> Debe desplazar físicamente todos los elementos existentes una posición a la derecha para hacer espacio.
        </p>`;
    } else if (caseId === 'insert-end') {
        contentHTML = `<strong>📥 Inserción al Final (ej. <code>lista.add(elemento)</code>):</strong>
        <p style="margin: 8px 0 0 0;">
            <strong>Ambas son rápidas (O(1) amortizado):</strong> 
            <br>ArrayList añade al final directamente (si no requiere redimensionar).
            <br>LinkedList mantiene una referencia directa al último nodo (tail) para enlazarlo de inmediato.
        </p>`;
    }

    display.innerHTML = contentHTML;
}

// LOGICA INTERACTIVA DEL QUIZ DE RELACIÓN
let activeConceptElement = null;
let completedMatchesCount = 0;

function initMatchQuiz() {
    const conceptNodes = document.querySelectorAll('#col-concepts .match-item-v3');
    const analogyNodes = document.querySelectorAll('#col-analogies .match-item-v3');

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
                    const resultCard = document.getElementById('quiz-result-v3');
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
    const resultCard = document.getElementById('quiz-result-v3');
    if (resultCard) resultCard.style.display = 'none';

    document.querySelectorAll('.match-item-v3').forEach(node => {
        node.classList.remove('selected', 'matched');
        node.style.borderColor = '';
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initMatchQuiz();
});
