// Variable global para o tamanho da fonte
let currentFontSize = 16;

// Função para aumentar e diminuir a fonte
function changeFontSize(delta) {
  currentFontSize += delta * 2;
  
  // Limites de acessibilidade: mínimo 12px e máximo 28px
  if (currentFontSize < 12) currentFontSize = 12;
  if (currentFontSize > 28) currentFontSize = 28;

  document.documentElement.style.setProperty('--font-size-base', `${currentFontSize}px`);
}

// Leitura em voz alta via Web Speech API
let isReading = false;

function toggleSpeech() {
  const btn = document.getElementById('btn-speech');

  if ('speechSynthesis' in window) {
    if (isReading) {
      window.speechSynthesis.cancel();
      isReading = false;
      btn.innerText = '🔊 Ouvir Texto';
    } else {
      // Captura o texto contido na tag <main>
      const mainContent = document.getElementById('conteudo-principal').innerText;
      const utterance = new SpeechSynthesisUtterance(mainContent);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;

      utterance.onend = () => {
        isReading = false;
        btn.innerText = '🔊 Ouvir Texto';
      };

      utterance.onerror = () => {
        isReading = false;
        btn.innerText = '🔊 Ouvir Texto';
      };

      window.speechSynthesis.speak(utterance);
      isReading = true;
      btn.innerText = '⏹️ Parar Leitura';
    }
  } else {
    alert('Seu navegador não possui suporte para leitura de voz.');
  }
}