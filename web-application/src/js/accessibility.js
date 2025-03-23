document.addEventListener('DOMContentLoaded', () => {
  // Cargar configuraciones guardadas al iniciar la página
  loadAccessibilitySettings();
  
  // Referencias a los elementos de control
  const textSizeSlider = document.getElementById('textSizeSlider');
  const lineSpacingSlider = document.getElementById('lineSpacingSlider');
  const resetTextBtn = document.getElementById('resetTextBtn');
  const highContrastBtn = document.getElementById('highContrastBtn');
  const hideMultimediaBtn = document.getElementById('hideMultimediaBtn');
  const savePreferencesBtn = document.getElementById('savePreferencesBtn');
  
  // Manejar cambio de tamaño de texto
  if (textSizeSlider) {
    textSizeSlider.addEventListener('input', (e) => {
      const size = e.target.value;
      document.documentElement.style.setProperty('--text-scale', size);
    });
  }
  
  // Manejar cambio de espaciado de línea
  if (lineSpacingSlider) {
    lineSpacingSlider.addEventListener('input', (e) => {
      const spacing = e.target.value;
      document.documentElement.style.setProperty('--line-height-scale', spacing);
    });
  }
  
  // Restablecer configuración de texto
  if (resetTextBtn) {
    resetTextBtn.addEventListener('click', () => {
      document.documentElement.style.removeProperty('--text-scale');
      document.documentElement.style.removeProperty('--line-height-scale');
      
      // Restablecer sliders
      if (textSizeSlider) textSizeSlider.value = 1;
      if (lineSpacingSlider) lineSpacingSlider.value = 1;
    });
  }
  
  // Alternar modo de alto contraste
  if (highContrastBtn) {
    highContrastBtn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast-mode');
      
      // Actualizar estado del botón
      if (document.body.classList.contains('high-contrast-mode')) {
        highContrastBtn.classList.add('active');
        highContrastBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Alto contraste activado';
      } else {
        highContrastBtn.classList.remove('active');
        highContrastBtn.innerHTML = 'Alto contraste';
      }
    });
  }
  
  // Ocultar contenido multimedia
  if (hideMultimediaBtn) {
    hideMultimediaBtn.addEventListener('click', () => {
      document.body.classList.toggle('hide-multimedia');
      
      // Actualizar estado del botón
      if (document.body.classList.contains('hide-multimedia')) {
        hideMultimediaBtn.classList.add('active');
        hideMultimediaBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Multimedia oculto';
      } else {
        hideMultimediaBtn.classList.remove('active');
        hideMultimediaBtn.innerHTML = 'Ocultar multimedia';
      }
    });
  }
  
  // Guardar preferencias
  if (savePreferencesBtn) {
    savePreferencesBtn.addEventListener('click', () => {
      const settings = {
        textSize: textSizeSlider ? textSizeSlider.value : 1,
        lineSpacing: lineSpacingSlider ? lineSpacingSlider.value : 1,
        highContrast: document.body.classList.contains('high-contrast-mode'),
        hideMultimedia: document.body.classList.contains('hide-multimedia'),
      };
      
      // Guardar en localStorage
      localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
      
      // Mostrar confirmación
      const saveConfirmation = document.createElement('div');
      saveConfirmation.className = 'save-confirmation';
      saveConfirmation.textContent = 'Preferencias guardadas';
      document.body.appendChild(saveConfirmation);
      
      // Eliminar confirmación después de 3 segundos
      setTimeout(() => {
        saveConfirmation.remove();
      }, 3000);
    });
  }
});

// Función para cargar configuraciones guardadas
function loadAccessibilitySettings() {
  const savedSettings = localStorage.getItem('accessibilitySettings');
  
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    
    // Aplicar tamaño de texto
    if (settings.textSize) {
      document.documentElement.style.setProperty('--text-scale', settings.textSize);
      const slider = document.getElementById('textSizeSlider');
      if (slider) slider.value = settings.textSize;
    }
    
    // Aplicar espaciado de línea
    if (settings.lineSpacing) {
      document.documentElement.style.setProperty('--line-height-scale', settings.lineSpacing);
      const slider = document.getElementById('lineSpacingSlider');
      if (slider) slider.value = settings.lineSpacing;
    }
    
    // Aplicar alto contraste
    if (settings.highContrast) {
      document.body.classList.add('high-contrast-mode');
      const btn = document.getElementById('highContrastBtn');
      if (btn) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Alto contraste activado';
      }
    }
    
    // Aplicar ocultamiento de multimedia
    if (settings.hideMultimedia) {
      document.body.classList.add('hide-multimedia');
      const btn = document.getElementById('hideMultimediaBtn');
      if (btn) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Multimedia oculto';
      }
    }
  }
}