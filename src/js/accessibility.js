// Script de accesibilidad global
(function (doc) {
    // Almacenar estilos originales
    const estilosOriginales = [];
  
    // Función para almacenar los estilos originales de los elementos de texto
    function almacenarEstilosOriginales() {
      const elementosTexto = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
      elementosTexto.forEach(elemento => {
        if (!elemento.closest('#menu-accesibilidad')) {
          estilosOriginales.push({
            elemento: elemento,
            fontSize: window.getComputedStyle(elemento).fontSize,
            lineHeight: window.getComputedStyle(elemento).lineHeight
          });
        }
      });
    }
  
    // Crear elementos de la herramienta de accesibilidad
    function crearElementosAccesibilidad() {
      // Crear el botón de accesibilidad
      const btnAccesibilidad = doc.createElement('button');
      btnAccesibilidad.id = 'miBotonAccesibilidad';
      btnAccesibilidad.className = 'btn-accesibilidad';
      btnAccesibilidad.setAttribute('aria-label', 'Botón para abrir la herramienta de accesibilidad');
      btnAccesibilidad.setAttribute('aria-haspopup', 'true');
      btnAccesibilidad.setAttribute('aria-controls', 'menu-accesibilidad');
  
      // Añadir el SVG al botón
      const iconoAccesibilidad = doc.createElement('img');
      iconoAccesibilidad.src = '/tool/icon-accessibility.svg';
      iconoAccesibilidad.alt = 'Icono de accesibilidad';
      btnAccesibilidad.appendChild(iconoAccesibilidad);
  
      // Crear el menú de accesibilidad
      const menuAccesibilidad = doc.createElement('div');
      menuAccesibilidad.id = 'menu-accesibilidad';
      menuAccesibilidad.className = 'menu-accesibilidad';
  
      // Contenido del menú
      menuAccesibilidad.innerHTML = `
        <button class="close-button" aria-label="Cerrar menú de accesibilidad">X</button>
        <h2 class="titulo-menu">MENÚ DE ACCESIBILIDAD</h2>
        
        <!-- Ajustes de texto -->
        <details open>
          <summary>
            <h3>Ajustar Texto</h3>
          </summary>
          <div>
            <label class="menu-label" for="tamanoFuenteSlider">Tamaño de letra:</label>
            <input type="range" id="tamanoFuenteSlider" class="txt-slider" min="12" max="30" value="16">
          </div>
          <div>
            <label class="menu-label" for="espaciadoLineasSlider">Espaciado entre líneas:</label>
            <input type="range" id="espaciadoLineasSlider" class="txt-slider" min="1" max="3" value="1.6" step="0.1">
          </div>
          <div>
            <a id="restablecerTexto" class="restablecer-cambios-link" href="#">Restablecer texto</a>
          </div>
        </details>
        
        <!-- Alto contraste -->
        <details>
          <summary>
            <h3>Modo de Alto Contraste</h3>
          </summary>
          <button id="toggleAltoContraste" class="btn-modificar" data-alto-contraste="false">Alto Contraste</button>
        </details>
        
        <!-- Ocultar multimedia -->
        <details>
          <summary>
            <h3>Ocultar Contenido Multimedia</h3>
          </summary>
          <button id="ocultarImg" class="btn-img" data-visible="false">Ocultar Multimedia</button>
        </details>
        
        <button id="guardar" class="btn-save">Guardar Preferencias</button>
      `;
  
      // Añadir elementos al documento
      doc.body.appendChild(btnAccesibilidad);
      doc.body.appendChild(menuAccesibilidad);
    }
  
    // Función para cambiar el tamaño de la fuente
    function cambiarTamanoFuente(valor) {
      const elementosTexto = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
      elementosTexto.forEach(elemento => {
        if (!elemento.closest('#menu-accesibilidad')) {
          elemento.style.fontSize = valor + 'px';
        }
      });
    }
    
    // Función para cambiar el espaciado entre líneas
    function cambiarEspaciadoLineas(valor) {
      const elementosTexto = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, a, button');
      elementosTexto.forEach(elemento => {
        if (!elemento.closest('#menu-accesibilidad')) {
          elemento.style.lineHeight = valor;
        }
      });
    }
    
    // Función para restablecer los estilos originales
    function restablecerEstilosOriginales() {
      estilosOriginales.forEach(item => {
        item.elemento.style.fontSize = item.fontSize;
        item.elemento.style.lineHeight = item.lineHeight;
      });
    }
  
    // Inicializar eventos
    function inicializarEventos() {
      const btnAccesibilidad = doc.getElementById('miBotonAccesibilidad');
      const menuAccesibilidad = doc.getElementById('menu-accesibilidad');
      const btnCerrar = menuAccesibilidad.querySelector('.close-button');
      
      // Mostrar/ocultar menú
      btnAccesibilidad.addEventListener('click', () => {
        menuAccesibilidad.classList.toggle('open');
      });
      
      // Cerrar menú
      btnCerrar.addEventListener('click', () => {
        menuAccesibilidad.classList.remove('open');
      });
      
      // Ajustes de texto
      const tamanoFuenteSlider = doc.getElementById('tamanoFuenteSlider');
      const espaciadoLineasSlider = doc.getElementById('espaciadoLineasSlider');
      const btnRestablecerTexto = doc.getElementById('restablecerTexto');
      
      tamanoFuenteSlider.addEventListener('input', (e) => {
        cambiarTamanoFuente(e.target.value);
      });
      
      espaciadoLineasSlider.addEventListener('input', (e) => {
        cambiarEspaciadoLineas(e.target.value);
      });
      
      btnRestablecerTexto.addEventListener('click', (e) => {
        e.preventDefault();
        restablecerEstilosOriginales();
        tamanoFuenteSlider.value = 16;
        espaciadoLineasSlider.value = 1.6;
      });
      
      // Alto contraste
      const btnAltoContraste = doc.getElementById('toggleAltoContraste');
      btnAltoContraste.addEventListener('click', function() {
        const elementos = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, div, label, a, button');
        const modoAltoContrasteActivado = this.dataset.altoContraste === 'true';
        
        elementos.forEach(elemento => {
          if (!elemento.closest('#menu-accesibilidad')) {
            if (modoAltoContrasteActivado) {
              elemento.style.backgroundColor = '';
              elemento.style.color = '';
            } else {
              elemento.style.backgroundColor = 'black';
              elemento.style.color = 'white';
              if (elemento.tagName === 'A') {
                elemento.style.color = 'yellow';
              }
            }
          }
        });
        
        this.dataset.altoContraste = modoAltoContrasteActivado ? 'false' : 'true';
        this.textContent = modoAltoContrasteActivado ? 'Alto Contraste' : 'Desactivar Alto Contraste';
        this.style.backgroundColor = modoAltoContrasteActivado ? '' : 'yellow';
        this.style.color = modoAltoContrasteActivado ? '' : 'black';
        this.style.fontWeight = modoAltoContrasteActivado ? '400' : '700';
      });
      
      // Ocultar multimedia
      const btnOcultarImg = doc.getElementById('ocultarImg');
      btnOcultarImg.addEventListener('click', function() {
        let elementosOcultos = false;
        const visible = this.dataset.visible === 'true';
        
        document.querySelectorAll('img, svg, video, iframe').forEach(function(el) {
          if (!el.closest('#menu-accesibilidad') && !el.closest('#miBotonAccesibilidad')) {
            el.style.visibility = visible ? '' : 'hidden';
            if (!visible) elementosOcultos = true;
          }
        });
        
        this.dataset.visible = !visible;
        this.style.backgroundColor = !visible ? 'yellow' : '';
        this.style.color = !visible ? 'black' : '';
        this.style.fontWeight = !visible ? '700' : '400';
        this.textContent = !visible ? 'Mostrar Multimedia' : 'Ocultar Multimedia';
      });
      
      // Guardar preferencias
      const btnGuardar = doc.getElementById('guardar');
      btnGuardar.addEventListener('click', function() {
        const preferencias = {
          altoContraste: btnAltoContraste.dataset.altoContraste === 'true',
          ocultarMultimedia: btnOcultarImg.dataset.visible === 'true',
          tamanoFuente: tamanoFuenteSlider.value,
          espaciadoLineas: espaciadoLineasSlider.value
        };
        
        localStorage.setItem('preferenciasAccesibilidad', JSON.stringify(preferencias));
        alert('Preferencias guardadas correctamente');
      });
    }
  
    // Cargar preferencias guardadas
    function cargarPreferencias() {
      const preferenciasGuardadas = localStorage.getItem('preferenciasAccesibilidad');
      if (preferenciasGuardadas) {
        const preferencias = JSON.parse(preferenciasGuardadas);
        
        if (preferencias.tamanoFuente) {
          const tamanoFuenteSlider = doc.getElementById('tamanoFuenteSlider');
          tamanoFuenteSlider.value = preferencias.tamanoFuente;
          cambiarTamanoFuente(preferencias.tamanoFuente);
        }
        
        if (preferencias.espaciadoLineas) {
          const espaciadoLineasSlider = doc.getElementById('espaciadoLineasSlider');
          espaciadoLineasSlider.value = preferencias.espaciadoLineas;
          cambiarEspaciadoLineas(preferencias.espaciadoLineas);
        }
        
        if (preferencias.altoContraste) {
          doc.getElementById('toggleAltoContraste').click();
        }
        
        if (preferencias.ocultarMultimedia) {
          doc.getElementById('ocultarImg').click();
        }
      }
    }
  
    // Inicializar accesibilidad cuando el DOM esté completamente cargado
    doc.addEventListener('DOMContentLoaded', function () {
      almacenarEstilosOriginales();
      crearElementosAccesibilidad();
      inicializarEventos();
      cargarPreferencias();
    });
  
  })(document);