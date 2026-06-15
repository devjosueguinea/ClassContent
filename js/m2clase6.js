/**
 * Control Dinámico de Pestañas (Tabs)
 */
function activateTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

    const targetButton = document.getElementById(`btn-${tabId}`);
    const targetPanel = document.getElementById(`panel-${tabId}`);

    if (targetButton && targetPanel) {
        targetButton.classList.add('active');
        targetPanel.classList.add('active');
    }
}

/**
 * Simulador de la Analogía del Restaurante
 */
function triggerAnalogy(role) {
    const screen = document.getElementById('analogy-screen');
    if (!screen) return;

    // Cambiar estilos de selección visual
    document.querySelectorAll('.analogy-card').forEach(card => card.classList.remove('selected'));
    const clickedCard = event.currentTarget;
    if (clickedCard) clickedCard.classList.add('selected');

    // Cambiar los textos reactivos dinámicamente
    switch (role) {
        case 'cliente':
            screen.innerHTML = "🎯 <strong>Flujo Cliente:</strong> Envías un <code>POST /api/ordenes</code> pasando un JSON con tu platillo favorito. Estás a la espera de una respuesta.";
            break;
        case 'mesero':
            screen.innerHTML = "⚡ <strong>Flujo API (Mesero):</strong> Toma tu petición HTTP, comprueba los Headers, valida la ruta de destino y la transfiere con seguridad a la capa interna.";
            break;
        case 'cocina':
            screen.innerHTML = "🍳 <strong>Flujo Servidor (Cocina):</strong> La capa de lógica procesa los datos, consulta la base de datos a través de JPA, genera el recurso y lo devuelve en formato JSON con un código <code>201 Created</code>.";
            break;
        default:
            screen.innerText = "Selecciona un elemento para iniciar la simulación del flujo...";
    }
}

/**
 * Controladores del Selector de Cuestionarios (Quiz Explorer)
 */
function selectQuiz(quizId) {
    document.querySelectorAll('.quiz-card-select').forEach(card => card.classList.remove('active'));
    document.querySelectorAll('.quiz-panel').forEach(panel => panel.classList.remove('active'));

    const targetCard = document.getElementById(`qcard-${quizId}`);
    const targetPanel = document.getElementById(`qpanel-${quizId}`);

    if (targetCard && targetPanel) {
        targetCard.classList.add('active');
        targetPanel.classList.add('active');
    }
}

/**
 * Base de Datos de Respuestas y Evaluaciones Didácticas
 */
const quizAnswers = {
    api: {
        api_1: { ans: "c", text: "¡Correcto! La API actúa como el mesero (el puente intermediario) que traslada peticiones y respuestas sin exponer la lógica interna de la cocina." },
        api_2: { ans: "b", text: "¡Exacto! Las cabeceras (Headers) contienen metadatos esenciales como formatos de compresión, autorización y tipos de contenido." }
    },
    arch: {
        arch_1: { ans: "b", text: "¡Excelente! Los componentes anotados con @Service contienen las reglas operativas de la empresa y flujos CRUD del negocio." }
    },
    annot: {
        annot_1: { ans: "b", text: "¡Perfecto! @RequestBody mapea el contenido del cuerpo del mensaje HTTP entrante mapeándolo en un objeto estructurado en Java." }
    }
};

/**
 * Procesador de Calificación Automatizado
 */
function calificarQuiz(quizId) {
    const questions = quizAnswers[quizId];
    if (!questions) return;

    let score = 0;
    const totalQuestions = Object.keys(questions).length;

    for (let key in questions) {
        const questionElement = document.querySelector(`[data-q="${key}"]`);
        const selectedOption = document.querySelector(`input[name="${key}"]:checked`);
        const feedbackBox = questionElement ? questionElement.querySelector('.feedback-explanation') : null;

        if (feedbackBox) {
            feedbackBox.style.display = "block";
            if (selectedOption) {
                if (selectedOption.value === questions[key].ans) {
                    score++;
                    feedbackBox.className = "feedback-explanation correct-box";
                    feedbackBox.innerHTML = `<strong>Correcto:</strong> ${questions[key].text}`;
                } else {
                    feedbackBox.className = "feedback-explanation incorrect-box";
                    feedbackBox.innerHTML = `<strong>Incorrecto:</strong> La opción correcta es la ${questions[key].ans.toUpperCase()}. Revisa el material didáctico.`;
                }
            } else {
                feedbackBox.className = "feedback-explanation warn-box";
                feedbackBox.innerHTML = "⚠️ Por favor, selecciona una opción antes de calificar.";
            }
        }
    }

    // Mostrar panel de resultados globales de la tarjeta
    const resultCard = document.getElementById(`result-${quizId}`);
    const scoreText = document.getElementById(`score-${quizId}`);
    const feedbackText = document.getElementById(`feedback-${quizId}`);

    if (resultCard && scoreText && feedbackText) {
        resultCard.style.display = "block";
        scoreText.innerText = `${score} / ${totalQuestions}`;

        if (score === totalQuestions) {
            feedbackText.innerHTML = "🎉 ¡Perfecto! Dominas por completo este bloque temático.";
            feedbackText.style.color = "#2e7d32";
        } else {
            feedbackText.innerHTML = "📚 Intenta revisar nuevamente las pestañas superiores para consolidar el aprendizaje.";
            feedbackText.style.color = "#c62828";
        }
    }
}

/**
 * Reseteo del Formulario
 */
function reiniciarQuiz(quizId) {
    const form = document.getElementById(`form-${quizId}`);
    if (form) form.reset();

    const parent = document.getElementById(`qpanel-${quizId}`);
    if (parent) {
        parent.querySelectorAll('.feedback-explanation').forEach(box => {
            box.innerHTML = "";
            box.style.display = "none";
        });
    }

    const resultCard = document.getElementById(`result-${quizId}`);
    if (resultCard) resultCard.style.display = "none";
}