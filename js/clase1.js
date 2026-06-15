// Respuestas correctas del cuestionario de la Clase 1
const respuestasCorrectas = {
  q1: 'c', // Escalabilidad Horizontal (Scale-out)
  q2: 'b', // Bajo acoplamiento y alta cohesión
  q3: 'c', // Análisis y gestión de riesgos
  q4: 'b', // Cascada (Waterfall)
  q5: 'c'  // Tiempo que el sistema permanece funcional (los 9s)
};

// Explicación de cada pregunta
const explicaciones = {
  q1: {
    correct: '¡Excelente! Añadir servidores o nodos a un sistema distribuido representa la Escalabilidad Horizontal (Scale-out), la cual permite crecer de forma casi ilimitada sin las restricciones físicas de un único servidor.',
    incorrect: 'Incorrecto. Añadir servidores/nodos es Escalabilidad Horizontal (Scale-out). Añadir recursos (CPU/RAM) a un único servidor es Escalabilidad Vertical (Scale-up).'
  },
  q2: {
    correct: '¡Correcto! El santo grial de la arquitectura de software es buscar un bajo acoplamiento (independencia entre componentes para que los cambios no se propaguen destructivamente) junto con una alta cohesión (módulos especializados enfocados en una sola responsabilidad).',
    incorrect: 'Incorrecto. El diseño ideal requiere bajo acoplamiento (para facilitar el mantenimiento y reemplazo de piezas independientes) y alta cohesión (para evitar que una sola clase haga tareas que no le corresponden).'
  },
  q3: {
    correct: '¡Perfecto! El modelo en espiral fue diseñado por Barry Boehm con un enfoque central en la identificación, evaluación y mitigación constante de riesgos en cada ciclo iterativo de la espiral.',
    incorrect: 'Incorrecto. La característica fundamental que define la Espiral es el análisis y gestión de riesgos sistemático realizado en cada uno de sus ciclos.'
  },
  q4: {
    correct: '¡Muy bien! Cuando los requisitos son inmutables, están predefinidos y no cambiarán (por ejemplo, regulaciones estrictas), el modelo en Cascada (Waterfall) ofrece una estructura predictiva lineal y controlada ideal para mitigar desvíos del diseño inicial.',
    incorrect: 'Incorrecto. Para requisitos claros, estables e inmutables, el modelo tradicional en Cascada (Waterfall) es óptimo dado su enfoque secuencial y de control rígido de fases.'
  },
  q5: {
    correct: '¡Impecable! La disponibilidad mide la proporción de tiempo que un sistema permanece operativo sin interrupciones y se suele expresar a través de la métrica de los "nueves" (ej. un SLA de 99.9% frente a 99.999% de disponibilidad).',
    incorrect: 'Incorrecto. La disponibilidad se refiere al porcentaje de tiempo de actividad y accesibilidad del sistema (uptime), a menudo formalizado en acuerdos de nivel de servicio (SLAs).'
  }
};

function calificarCuestionario() {
  const form = document.getElementById('quizForm');
  let puntuacion = 0;
  const totalPreguntas = Object.keys(respuestasCorrectas).length;

  for (let i = 1; i <= totalPreguntas; i++) {
    const name = 'q' + i;
    const opciones = form.querySelectorAll(`input[name="${name}"]`);
    const seleccionada = form.querySelector(`input[name="${name}"]:checked`);
    const questionDiv = form.querySelector(`.quiz-question[data-question-id="${i}"]`);
    const feedbackDiv = questionDiv.querySelector('.feedback-explanation');

    // Deshabilitar opciones
    opciones.forEach(opt => {
      opt.closest('.quiz-option').classList.add('disabled');
    });

    if (seleccionada) {
      const respuestaUsuario = seleccionada.value;
      const esCorrecta = respuestaUsuario === respuestasCorrectas[name];

      if (esCorrecta) {
        puntuacion++;
        seleccionada.closest('.quiz-option').classList.add('correct-choice');
        feedbackDiv.textContent = explicaciones[name].correct;
        feedbackDiv.className = 'feedback-explanation correct';
      } else {
        seleccionada.closest('.quiz-option').classList.add('incorrect-choice');
        feedbackDiv.textContent = explicaciones[name].incorrect;
        feedbackDiv.className = 'feedback-explanation incorrect';

        opciones.forEach(opt => {
          if (opt.value === respuestasCorrectas[name]) {
            opt.closest('.quiz-option').classList.add('correct-choice');
          }
        });
      }
    } else {
      feedbackDiv.textContent = 'No respondiste a esta pregunta. ' + explicaciones[name].incorrect;
      feedbackDiv.className = 'feedback-explanation incorrect';
      opciones.forEach(opt => {
        if (opt.value === respuestasCorrectas[name]) {
          opt.closest('.quiz-option').classList.add('correct-choice');
        }
      });
    }
  }

  // Mostrar puntuación final
  const scoreVal = document.getElementById('scoreValue');
  const resultCard = document.getElementById('quizResult');
  const feedbackText = document.getElementById('resultFeedbackText');

  scoreVal.textContent = `${puntuacion} / ${totalPreguntas}`;
  resultCard.style.display = 'block';

  if (puntuacion === totalPreguntas) {
    feedbackText.textContent = '¡Felicidades! Dominas por completo los conceptos iniciales de Diseño de Sistemas y ciclos de vida SDLC.';
    feedbackText.style.color = '#15803d';
  } else if (puntuacion >= 3) {
    feedbackText.textContent = 'Buen intento. Has aprobado, pero te sugerimos revisar los detalles en los que fallaste.';
    feedbackText.style.color = '#b45309';
  } else {
    feedbackText.textContent = 'Te recomendamos volver a leer el material e intentar de nuevo.';
    feedbackText.style.color = '#b91c1c';
  }
}

function reiniciarCuestionario() {
  const form = document.getElementById('quizForm');
  form.reset();

  const opciones = form.querySelectorAll('.quiz-option');
  opciones.forEach(opt => {
    opt.className = 'quiz-option';
  });

  const feedbackDivs = form.querySelectorAll('.feedback-explanation');
  feedbackDivs.forEach(div => {
    div.textContent = '';
    div.className = 'feedback-explanation';
  });

  const resultCard = document.getElementById('quizResult');
  resultCard.style.display = 'none';
}
