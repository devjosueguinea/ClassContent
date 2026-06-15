// Respuestas correctas del cuestionario de la Clase 8
const respuestasCorrectas = {
  q1: 'b', // Catálogo de metadatos sobre la estructura
  q2: 'c', // Evitar ambigüedades y asegurar consistencia
  q3: 'd', // Si el campo admite valores vacíos o no
  q4: 'a', // Debe ser único y no nulo
  q5: 'c'  // Establecer valor por defecto automático en inserciones
};

// Explicación de cada pregunta
const explicaciones = {
  q1: {
    correct: '¡Excelente! Un diccionario de datos es un conjunto de metadatos estructurados que define el significado, formato y restricciones de los datos del sistema.',
    incorrect: 'Incorrecto. Un diccionario de datos es un repositorio central de metadatos que documenta la estructura física y lógica de la base de datos.'
  },
  q2: {
    correct: '¡Correcto! Uno de los mayores beneficios es que proporciona un punto único de verdad que previene interpretaciones erróneas y asegura la consistencia semántica del software.',
    incorrect: 'Incorrecto. Su objetivo clave es unificar la terminología del negocio y técnica para evitar malentendidos conceptuales y fallos en la persistencia.'
  },
  q3: {
    correct: '¡Perfecto! La nulabilidad especifica si el motor de base de datos aceptará registros que carezcan de información en dicho atributo (NULL) o si es obligatorio suministrarla (NOT NULL).',
    incorrect: 'Incorrecto. La nulabilidad indica de forma exclusiva si el campo es obligatorio (NOT NULL) u opcional (NULL) para el registro.'
  },
  q4: {
    correct: '¡Excelente! Por estándar e integridad referencial, cualquier campo marcado como Llave Primaria (PK) tiene prohibido almacenar duplicados o contener valores nulos (NOT NULL).',
    incorrect: 'Incorrecto. Una Primary Key (PK) impone de forma estricta que los registros sean únicos y que el campo no admita nulos.'
  },
  q5: {
    correct: '¡Impecable! La propiedad "Default Value" o valor por defecto asegura que si el sistema omitió insertar un dato para ese campo, la base de datos le asigne un valor predeterminado seguro.',
    incorrect: 'Incorrecto. Esta restricción predefine un valor automático para el registro si este no se envía de manera explícita en la consulta SQL.'
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
    feedbackText.textContent = '¡Excelente trabajo! Has comprendido la importancia y estructura del Diccionario de Datos.';
    feedbackText.style.color = '#15803d';
  } else if (puntuacion >= 3) {
    feedbackText.textContent = 'Buen intento. Has aprobado el cuestionario, pero te sugerimos revisar las respuestas incorrectas.';
    feedbackText.style.color = '#b45309';
  } else {
    feedbackText.textContent = 'Te sugerimos repasar la conceptualización y plantilla del Diccionario de Datos y volver a intentarlo.';
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
