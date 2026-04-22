/**
 * Inyecta el menú lateral en un contenedor específico
 * @param {string} containerId - El ID del div donde se renderizará el menú
 */
function cargarMenuLateral(containerId) {
    const menuHTML = `
        <div class="overlay" id="overlay" onclick="toggleMenu()"></div>

        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">Guinea</div>
            <nav class="sidebar-nav">
                <a href="index.html">Dashboard</a>
                <a href="clase1.html">
                    Clase 1
                </a>
            </nav>
        </aside>

        <div class="mobile-header">
            <strong>DevAcademy</strong>
            <button class="menu-toggle" onclick="toggleMenu()">☰ Menú</button>
        </div>
    `;

    const contenedor = document.getElementById(containerId);
    if (contenedor) {
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
    cargarMenuLateral('menu-container');
});