/* =========================================
   Módulo 2, Clase 1 – JavaScript Controller
   ========================================= */

// ─── TAB SYSTEM ────────────────────────────────────────────
function activateTab(tabId) {
  // Desactivar todos los botones y paneles
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

  // Activar el seleccionado
  document.getElementById('btn-' + tabId).classList.add('active');
  document.getElementById('panel-' + tabId).classList.add('active');
}

// ─── QUIZ SELECTOR ─────────────────────────────────────────
function selectQuiz(quizId) {
  // Resaltar tarjeta seleccionada
  document.querySelectorAll('.quiz-card-select').forEach(c => c.classList.remove('selected'));
  document.getElementById('qcard-' + quizId).classList.add('selected');

  // Mostrar únicamente el panel del quiz elegido
  document.querySelectorAll('.quiz-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('qpanel-' + quizId).classList.add('active');

  // Scroll suave al quiz
  document.getElementById('qpanel-' + quizId).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── QUIZ ENGINE ───────────────────────────────────────────
const quizData = {
  q1: { // Fundamentos
    correctas: { q1_1: 'b', q1_2: 'c', q1_3: 'a', q1_4: 'd', q1_5: 'b' },
    explicaciones: {
      q1_1: {
        correct: '¡Correcto! Un algoritmo es una secuencia finita y ordenada de pasos que resuelve un problema específico.',
        incorrect: 'Incorrecto. Un algoritmo es una secuencia finita de pasos lógicos y ordenados para resolver un problema.'
      },
      q1_2: {
        correct: '¡Perfecto! La compilación traduce el código fuente completo a bytecode antes de ejecutarse.',
        incorrect: 'Incorrecto. Java primero compila a bytecode (.class) y luego la JVM lo interpreta en tiempo de ejecución.'
      },
      q1_3: {
        correct: '¡Excelente! El método main() es el punto de entrada obligatorio de cualquier programa Java.',
        incorrect: 'Incorrecto. Todo programa Java inicia su ejecución desde el método public static void main(String[] args).'
      },
      q1_4: {
        correct: '¡Muy bien! Una variable es un espacio reservado en memoria con un nombre y un tipo de dato definido.',
        incorrect: 'Incorrecto. Una variable es un espacio en memoria identificado por un nombre que almacena un valor de un tipo específico.'
      },
      q1_5: {
        correct: '¡Excelente! System.out.println() imprime texto en la consola con salto de línea al final.',
        incorrect: 'Incorrecto. System.out.println() es el método estándar de Java para imprimir datos en la consola.'
      }
    }
  },
  q2: { // Tipos de datos
    correctas: { q2_1: 'c', q2_2: 'a', q2_3: 'd', q2_4: 'b', q2_5: 'c' },
    explicaciones: {
      q2_1: {
        correct: '¡Correcto! int almacena enteros de 32 bits, con rango aproximado de ±2.1 mil millones.',
        incorrect: 'Incorrecto. El tipo int en Java ocupa 32 bits (4 bytes) y almacena valores enteros.'
      },
      q2_2: {
        correct: '¡Perfecto! String no es un tipo primitivo; es una clase de la librería estándar de Java.',
        incorrect: 'Incorrecto. String es una clase (tipo de referencia), no un tipo de dato primitivo en Java.'
      },
      q2_3: {
        correct: '¡Muy bien! char almacena un único carácter Unicode y se declara entre comillas simples (\'a\').',
        incorrect: 'Incorrecto. El tipo char almacena un único carácter y se representa con comillas simples, por ejemplo \'A\'.'
      },
      q2_4: {
        correct: '¡Excelente! boolean solo puede valer true o false, y es el tipo usado en condiciones lógicas.',
        incorrect: 'Incorrecto. El tipo boolean únicamente permite los valores true o false.'
      },
      q2_5: {
        correct: '¡Correcto! double ocupa 64 bits y permite almacenar valores decimales con mayor precisión que float.',
        incorrect: 'Incorrecto. double es el tipo de 64 bits para decimales. float ocupa solo 32 bits.'
      }
    }
  },
  q3: { // Operadores
    correctas: { q3_1: 'b', q3_2: 'd', q3_3: 'a', q3_4: 'c', q3_5: 'b' },
    explicaciones: {
      q3_1: {
        correct: '¡Correcto! El operador % (módulo) devuelve el residuo de una división entera.',
        incorrect: 'Incorrecto. El operador % es el módulo y retorna el residuo de la división.'
      },
      q3_2: {
        correct: '¡Perfecto! && es el AND lógico: ambas condiciones deben ser verdaderas para que el resultado sea true.',
        incorrect: 'Incorrecto. El operador && (AND) requiere que ambas expresiones sean true para retornar true.'
      },
      q3_3: {
        correct: '¡Excelente! != verifica que dos valores sean distintos, retornando true si son diferentes.',
        incorrect: 'Incorrecto. != es el operador relacional "diferente de".'
      },
      q3_4: {
        correct: '¡Muy bien! || es el OR lógico: basta con que una condición sea verdadera para obtener true.',
        incorrect: 'Incorrecto. || es el OR lógico. El resultado es true si al menos una de las condiciones es verdadera.'
      },
      q3_5: {
        correct: '¡Correcto! El resultado de 17 % 5 es 2, ya que 17 = 5×3 + 2.',
        incorrect: 'Incorrecto. 17 % 5 = 2, porque 5 cabe 3 veces en 17 (15) y sobra 2.'
      }
    }
  },
  q4: { // Estructuras
    correctas: { q4_1: 'c', q4_2: 'a', q4_3: 'b', q4_4: 'd', q4_5: 'c' },
    explicaciones: {
      q4_1: {
        correct: '¡Correcto! switch-case evalúa el valor de una variable contra múltiples casos constantes.',
        incorrect: 'Incorrecto. switch-case compara una variable con valores constantes definidos en cada case.'
      },
      q4_2: {
        correct: '¡Perfecto! Un bucle do-while ejecuta el cuerpo al menos una vez antes de verificar la condición.',
        incorrect: 'Incorrecto. do-while garantiza que el cuerpo se ejecute al menos una vez, ya que la condición se evalúa al final.'
      },
      q4_3: {
        correct: '¡Excelente! break termina de forma inmediata la iteración actual del bucle o bloque switch.',
        incorrect: 'Incorrecto. break finaliza el ciclo o bloque switch inmediatamente.'
      },
      q4_4: {
        correct: '¡Muy bien! El bucle for es ideal cuando el número de iteraciones es conocido de antemano.',
        incorrect: 'Incorrecto. El for se usa preferentemente cuando el número de iteraciones es conocido con anterioridad.'
      },
      q4_5: {
        correct: '¡Correcto! continue salta el resto del bloque de la iteración actual y avanza a la siguiente.',
        incorrect: 'Incorrecto. continue omite el código restante de la iteración actual y salta a la siguiente vuelta del bucle.'
      }
    }
  }
};

function calificarQuiz(prefix) {
  const data = quizData[prefix];
  const form = document.getElementById('form-' + prefix);
  let puntuacion = 0;
  const total = Object.keys(data.correctas).length;

  Object.entries(data.correctas).forEach(([name, correctVal]) => {
    const opciones = form.querySelectorAll(`input[name="${name}"]`);
    const seleccionada = form.querySelector(`input[name="${name}"]:checked`);
    const questionDiv = form.querySelector(`.quiz-question[data-q="${name}"]`);
    const feedbackDiv = questionDiv.querySelector('.feedback-explanation');

    opciones.forEach(o => o.closest('.quiz-option').classList.add('disabled'));

    const explicacion = data.explicaciones[name];

    if (seleccionada) {
      const esCorrecta = seleccionada.value === correctVal;
      if (esCorrecta) {
        puntuacion++;
        seleccionada.closest('.quiz-option').classList.add('correct-choice');
        feedbackDiv.textContent = explicacion.correct;
        feedbackDiv.className = 'feedback-explanation correct';
      } else {
        seleccionada.closest('.quiz-option').classList.add('incorrect-choice');
        feedbackDiv.textContent = explicacion.incorrect;
        feedbackDiv.className = 'feedback-explanation incorrect';
        opciones.forEach(o => {
          if (o.value === correctVal) o.closest('.quiz-option').classList.add('correct-choice');
        });
      }
    } else {
      feedbackDiv.textContent = 'No respondiste. ' + explicacion.incorrect;
      feedbackDiv.className = 'feedback-explanation incorrect';
      opciones.forEach(o => {
        if (o.value === correctVal) o.closest('.quiz-option').classList.add('correct-choice');
      });
    }
  });

  const scoreEl = document.getElementById('score-' + prefix);
  const resultCard = document.getElementById('result-' + prefix);
  const feedbackTxt = document.getElementById('feedback-' + prefix);

  scoreEl.textContent = `${puntuacion} / ${total}`;
  resultCard.style.display = 'block';

  if (puntuacion === total) {
    feedbackTxt.textContent = '¡Perfecto! Dominas completamente este tema.';
    feedbackTxt.style.color = '#15803d';
  } else if (puntuacion >= 3) {
    feedbackTxt.textContent = 'Buen resultado. Revisa las respuestas incorrectas para reforzar.';
    feedbackTxt.style.color = '#b45309';
  } else {
    feedbackTxt.textContent = 'Te recomendamos repasar el material de este tema e intentarlo de nuevo.';
    feedbackTxt.style.color = '#b91c1c';
  }
}

function reiniciarQuiz(prefix) {
  const form = document.getElementById('form-' + prefix);
  form.reset();
  form.querySelectorAll('.quiz-option').forEach(o => o.className = 'quiz-option');
  form.querySelectorAll('.feedback-explanation').forEach(d => {
    d.textContent = '';
    d.className = 'feedback-explanation';
  });
  document.getElementById('result-' + prefix).style.display = 'none';
}

// Activar primer tab al cargar
document.addEventListener('DOMContentLoaded', () => {
  activateTab('tab1');
});
