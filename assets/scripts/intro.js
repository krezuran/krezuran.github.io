document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.createElement("div");
  overlay.id = "intro-overlay";
  
  overlay.innerHTML = `
    <div class="intro-text" id="typewriter-text">
      <span id="main-text">click me</span>
    </div>
    <div class="sub-text">press to enter</div>
  `;
  
  document.body.appendChild(overlay);

  const audio = document.createElement("audio");
  audio.id = "backgroundAudio";
  audio.autoplay = false; 
  audio.muted = true;
  audio.loop = true;
  audio.preload = "auto";
  audio.style.display = "none";
  audio.innerHTML = `<source src="assets/audio/bgMusic.mp3" type="audio/mpeg">`;
  document.body.appendChild(audio);

  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789你好世界こんにちは안녕하세요مرحباЗдравствуйтеΓεια中文日本語한국어العربيةРусскийΕλληνικά';
  
  const mainTextElement = document.getElementById('main-text');
  const originalText = 'click me';
  let isGlitching = false;

  function startGlitch() {
    if (isGlitching) return;
    isGlitching = true;
    
    let iterations = 0;
    const maxIterations = 8;
    
    const glitchInterval = setInterval(() => {
      let glitchedText = '';
      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === ' ') {
          glitchedText += ' ';
        } else {
          glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
      }
      mainTextElement.textContent = glitchedText;
      
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(glitchInterval);
        mainTextElement.textContent = originalText;
        isGlitching = false;
      }
    }, 50);
  }

  const glitchTimer = setInterval(startGlitch, 2000);

  function typeWriter() {
    const texts = ['click me', 'press here', 'touch me', 'enter now'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
      if (isGlitching) {
        setTimeout(type, 100);
        return;
      }
      
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        mainTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        mainTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }
      
      const textWidth = mainTextElement.offsetWidth;
      const cursor = document.querySelector('.intro-text::after');
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }
      
      setTimeout(type, typeSpeed);
    }
    
    type();
  }

  setTimeout(typeWriter, 1000);

  overlay.addEventListener("click", () => {
    
    clearInterval(glitchTimer);
    
    overlay.classList.add("fade-out");

    setTimeout(() => {
      overlay.remove();
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }, 1000);

    audio.currentTime = 0; 
    audio.muted = false;
    audio.play().catch(e => console.error("Ses oynatılamadı:", e));
    
    const volumeSlider = document.getElementById('sound-slider');
    const volumeIcon = document.querySelector('.iconVolume');
    const volumeText = document.getElementById('volume');
    
    if (volumeSlider) {
      volumeSlider.value = 50; 
      audio.volume = 0.5;
      
      if (volumeText) {
        volumeText.textContent = '50';
      }
      
      if (volumeIcon) {
        volumeIcon.className = 'iconVolume text-white hovered bx bxs-volume-full bx-tada bx-flip-vertical';
      }
    }

    setTimeout(() => {
      const slider = document.getElementById('sound-slider');
      const icon = document.querySelector('.iconVolume');
      const text = document.getElementById('volume');
      
      if (slider && !slider.hasEventListener) {
        slider.hasEventListener = true;
        
        slider.addEventListener('input', function() {
          const volume = this.value / 100;
          audio.volume = volume;
          
          if (text) {
            text.textContent = this.value;
          }
          
          if (icon) {
            if (volume === 0) {
              icon.className = 'iconVolume text-white hovered bx bxs-volume-mute bx-tada bx-flip-vertical';
            } else if (volume < 0.5) {
              icon.className = 'iconVolume text-white hovered bx bxs-volume-low bx-tada bx-flip-vertical';
            } else {
              icon.className = 'iconVolume text-white hovered bx bxs-volume-full bx-tada bx-flip-vertical';
            }
          }
        });
        
        if (icon) {
          icon.addEventListener('click', function() {
            if (audio.muted || audio.volume === 0) {
              audio.muted = false;
              audio.volume = 0.5;
              slider.value = 50;
              text.textContent = '50';
              icon.className = 'iconVolume text-white hovered bx bxs-volume-full bx-tada bx-flip-vertical';
            } else {
              audio.muted = true;
              slider.value = 0;
              text.textContent = '0';
              icon.className = 'iconVolume text-white hovered bx bxs-volume-mute bx-tada bx-flip-vertical';
            }
          });
        }
      }
    }, 100);
  });
});