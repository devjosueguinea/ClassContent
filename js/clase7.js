// Respuestas correctas del cuestionario de la Clase 7
const respuestasCorrectas = {
  q1: 'b', // Relación débil, las partes pueden existir independientemente
  q2: 'c', // Línea sólida con rombo relleno
  q3: 'd', // Composición (ciclo de vida dependiente)
  q4: 'a', // Inyección del objeto hijo (constructor/setter)
  q5: 'b'  // Mayor acoplamiento y ciclo de vida coincidente
};

// Explicación de cada pregunta
const explicaciones = {
  q1: {
    correct: '¡Excelente! La Agregación es una relación de tipo "todo-parte" débil. Los objetos parte pueden seguir existiendo de forma autónoma aunque se elimine la clase contenedora (el "todo").',
    incorrect: 'Incorrecto. La Agregación representa una relación débil (de tipo "tiene un"), donde las partes tienen vida independiente del todo (ej. un Cliente y sus Direcciones).'
  },
  q2: {
    correct: '¡Correcto! En UML, la Composición se representa con una línea sólida terminada en un rombo relleno (sólido) en el lado de la clase contenedora (padre). El rombo vacío se reserva para la Agregación.',
    incorrect: 'Incorrecto. La Composición utiliza una línea sólida que finaliza con un rombo relleno o sólido que apunta a la clase contenedora.'
  },
  q3: {
    correct: '¡Perfecto! Al estar el ciclo de vida de la parte ligado directamente al del contenedor (si muere la Universidad, mueren sus Facultades), estamos ante una relación de Composición.',
    incorrect: 'Incorrecto. Si la destrucción del objeto contenedor destruye obligatoriamente a los componentes contenidos, la relación es de Composición (fuerte).'
  },
  q4: {
    correct: '¡Excelente! En la Agregación, el objeto hijo es creado externamente y se le inyecta al contenedor a través de su constructor o métodos setters, asegurando que su ciclo de vida no esté controlado por el contenedor.',
    incorrect: 'Incorrecto. Para implementar Agregación, el objeto dependiente se crea fuera de la clase y se inyecta (por ejemplo, en el constructor), evitando instanciarlo con "new" de forma directa en el constructor de la clase contenedora.'
  },
  q5: {
    correct: '¡Impecable! La composición representa un acoplamiento estructural mucho más fuerte que la agregación, obligando a que el ciclo de vida de los componentes coincida con el del contenedor.',
    incorrect: 'Incorrecto. La Composición se distingue por imponer un acoplamiento más fuerte y una coinicidencia obligatoria en el ciclo de vida de los objetos relacionados.'
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
    feedbackText.textContent = '¡Felicidades! Dominas perfectamente las relaciones de Agregación y Composición en modelado orientado a objetos.';
    feedbackText.style.color = '#15803d';
  } else if (puntuacion >= 3) {
    feedbackText.textContent = 'Buen intento. Has aprobado, pero te sugerimos repasar la diferencia de ciclos de vida.';
    feedbackText.style.color = '#b45309';
  } else {
    feedbackText.textContent = 'Te recomendamos volver a leer los apartados de Agregación y Composición e intentar de nuevo.';
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
