/**
 * Inyecta el menú lateral en un contenedor específico
 * @param {string} containerId - El ID del div donde se renderizará el menú
 * @param {string} moduleNumber - El número del módulo activo
 * @param {string} classId - El ID de la clase activa (ej. 'clase1')
 */
function cargarMenuLateral(containerId, moduleNumber, classId) {
    const prefix = "../"; // Al estar en moduloX/, la raíz está en el directorio padre
    
    let menuHTML = '';
    
    if (moduleNumber === '1') {
        const clases = [
            { id: 'clase1', title: 'Clase 1: Fundamentos y SDLC', file: 'clase1.html' },
            { id: 'clase2', title: 'Clase 2: Requerimientos', file: 'clase2.html' },
            { id: 'clase3', title: 'Clase 3: Modelado de Datos', file: 'clase3.html' },
            { id: 'clase4', title: 'Clase 4: Comportamiento', file: 'clase4.html' },
            { id: 'clase5', title: 'Clase 5: Diagramas de Clase', file: 'clase5.html' },
            { id: 'clase6', title: 'Clase 6: Relación de Herencia', file: 'clase6.html' },
            { id: 'clase7', title: 'Clase 7: Agregación y Composición', file: 'clase7.html' },
            { id: 'clase8', title: 'Clase 8: Diccionario de Datos', file: 'clase8.html' }
        ];
        
        let linksHTML = `<a href="${prefix}index.html">← Inicio</a>`;
        clases.forEach(c => {
            const activeClass = c.id === classId ? 'class="active-class"' : '';
            linksHTML += `<a href="${c.file}" ${activeClass}>${c.title}</a>`;
        });
        
        menuHTML = `
            <div class="overlay" id="overlay" onclick="toggleMenu()"></div>
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">Diseño de Sistemas</div>
                <nav class="sidebar-nav">
                    ${linksHTML}
                </nav>
            </aside>
            <div class="mobile-header">
                <strong>Diseño de Sistemas</strong>
                <button class="menu-toggle" onclick="toggleMenu()">☰ Menú</button>
            </div>
        `;
    } else if (moduleNumber === '2') {
        const clases2 = [
            { id: 'clase1', title: 'Clase 1: Fundamentos de Programación', file: 'clase1.html' }
        ];
        let linksHTML2 = `<a href="${prefix}index.html">← Inicio</a>`;
        clases2.forEach(c => {
            const activeClass = c.id === classId ? 'class="active-class"' : '';
            linksHTML2 += `<a href="${c.file}" ${activeClass}>${c.title}</a>`;
        });
        menuHTML = `
            <div class="overlay" id="overlay" onclick="toggleMenu()"></div>
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">Programación OO</div>
                <nav class="sidebar-nav">
                    ${linksHTML2}
                </nav>
            </aside>
            <div class="mobile-header">
                <strong>Programación OO</strong>
                <button class="menu-toggle" onclick="toggleMenu()">☰ Menú</button>
            </div>
        `;
    } else if (moduleNumber === '2_old') {
        menuHTML = `
            <div class="overlay" id="overlay" onclick="toggleMenu()"></div>
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">Desarrollo Web</div>
                <nav class="sidebar-nav">
                    <a href="${prefix}index.html">← Inicio</a>
                    <a href="#" class="active-class">Próximamente</a>
                </nav>
            </aside>
            <div class="mobile-header">
                <strong>Desarrollo Web</strong>
                <button class="menu-toggle" onclick="toggleMenu()">☰ Menú</button>
            </div>
        `;
    } else if (moduleNumber === '3') {
        menuHTML = `
            <div class="overlay" id="overlay" onclick="toggleMenu()"></div>
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">Bases de Datos</div>
                <nav class="sidebar-nav">
                    <a href="${prefix}index.html">← Inicio</a>
                    <a href="#" class="active-class">Próximamente</a>
                </nav>
            </aside>
            <div class="mobile-header">
                <strong>Bases de Datos</strong>
                <button class="menu-toggle" onclick="toggleMenu()">☰ Menú</button>
            </div>
        `;
    } else if (moduleNumber === '4') {
        menuHTML = `
            <div class="overlay" id="overlay" onclick="toggleMenu()"></div>
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">Arquitectura de Software</div>
                <nav class="sidebar-nav">
                    <a href="${prefix}index.html">← Inicio</a>
                    <a href="#" class="active-class">Próximamente</a>
                </nav>
            </aside>
            <div class="mobile-header">
                <strong>Arquitectura</strong>
                <button class="menu-toggle" onclick="toggleMenu()">☰ Menú</button>
            </div>
        `;
    }

    const contenedor = document.getElementById(containerId);
    if (contenedor && menuHTML) {
        contenedor.innerHTML = menuHTML;
    }
}

// Función para abrir/cerrar el menú en móviles
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }
}

// Ejecutar la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const module = document.body.getAttribute('data-module');
    const activeClass = document.body.getAttribute('data-class');
    if (module) {
        cargarMenuLateral('menu-container', module, activeClass);
    }
});