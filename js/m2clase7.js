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

// INSPECCIÓN INTERACTIVA DE LA TORRE DE CAPAS
function showLayerDetails(title, description) {
    const displayBox = document.getElementById('stack-display-v7');
    if (displayBox) {
        displayBox.innerHTML = `<strong>🔍 Auditoría: ${title}</strong><p style="margin: 6px 0 0 0;">${description}</p>`;
    }
}

// LOGICA INTERACTIVA DEL QUIZ DE RELACIÓN
let activeConceptElement = null;
let completedMatchesCount = 0;

function initMatchQuiz() {
    const conceptNodes = document.querySelectorAll('#col-concepts .match-item-v7');
    const analogyNodes = document.querySelectorAll('#col-analogies .match-item-v7');

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
                    const resultCard = document.getElementById('quiz-result-v7');
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
    const resultCard = document.getElementById('quiz-result-v7');
    if (resultCard) resultCard.style.display = 'none';

    document.querySelectorAll('.match-item-v7').forEach(node => {
        node.classList.remove('selected', 'matched');
        node.style.borderColor = '';
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initMatchQuiz();
});