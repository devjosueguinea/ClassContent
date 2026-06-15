/**
 * Control interactivo de navegación por pestañas (Tabs)
 */
function activateTab(tabId) {
    // Remover clase 'active' de todos los botones y paneles
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

    // Activar botón y panel correspondiente
    const targetButton = document.getElementById(`btn-${tabId}`);
    const targetPanel = document.getElementById(`panel-${tabId}`);

    if (targetButton && targetPanel) {
        targetButton.classList.add('active');
        targetPanel.classList.add('active');
    }
}

/**
 * Respuestas correctas y retroalimentación didáctica
 */
const quizAnswers = {
    poo: {
        poo_1: { ans: "b", text: "¡Correcto! Una clase es la representación abstracta o molde estructural, no el objeto físico en sí." },
        poo_2: { ans: "c", text: "¡Correcto! El encapsulamiento oculta el estado interno del objeto y obliga a interactuar mediante métodos públicos seguros." },
        poo_3: { ans: "b", text: "¡Excelente! La palabra clave 'extends' establece una relación de herencia entre una subclase y su súperclase en Java." },
        poo_4: { ans: "d", text: "¡Correcto! El polimorfismo permite referenciar a un objeto hijo (Gato) mediante una variable padre (Animal)." },
        poo_5: { ans: "c", text: "¡Exacto! El constructor se autoinvoca únicamente en el momento en que la memoria reserva espacio con el operador 'new'." }
    }
};

/**
 * Calificación interactiva del Cuestionario
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
                    feedbackBox.innerHTML = `<strong>Incorrecto:</strong> Inténtalo de nuevo. La respuesta correcta era la opción ${questions[key].ans.toUpperCase()}.`;
                }
            } else {
                feedbackBox.className = "feedback-explanation warn-box";
                feedbackBox.innerHTML = "⚠️ No respondiste esta pregunta.";
            }
        }
    }

    // Mostrar panel de resultados finales
    const resultCard = document.getElementById(`result-${quizId}`);
    const scoreText = document.getElementById(`score-${quizId}`);
    const feedbackText = document.getElementById(`feedback-${quizId}`);

    if (resultCard && scoreText && feedbackText) {
        resultCard.style.display = "block";
        scoreText.innerText = `${score} / ${totalQuestions}`;

        if (score === totalQuestions) {
            feedbackText.innerHTML = "🎉 ¡Perfecto! Dominas de forma excelente los fundamentos de la Programación Orientada a Objetos.";
            feedbackText.style.color = "#2e7d32";
        } else if (score >= 3) {
            feedbackText.innerHTML = "👍 ¡Buen intento! Tienes bases claras, pero te recomendamos repasar los conceptos erróneos.";
            feedbackText.style.color = "#f57c00";
        } else {
            feedbackText.innerHTML = "📚 Te recomendamos releer las pestañas superiores y volver a intentar el cuestionario.";
            feedbackText.style.color = "#c62828";
        }
    }
}

/**
 * Reinicio completo del formulario
 */
function reiniciarQuiz(quizId) {
    const form = document.getElementById(`form-${quizId}`);
    if (form) form.reset();

    document.querySelectorAll('.feedback-explanation').forEach(box => {
        box.innerHTML = "";
        box.style.display = "none";
    });

    const resultCard = document.getElementById(`result-${quizId}`);
    if (resultCard) resultCard.style.display = "none";
}