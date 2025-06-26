// Espera a que exista el div donde se renderiza la firma
const waitForElement = (selector, callback) => {
  const el = document.querySelector(selector);
  if (el) return callback(el);

  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el) {
      observer.disconnect();
      callback(el);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

// Función para copiar el HTML al portapapeles
function copyToClipboard(html) {
  const blob = new Blob([html], { type: 'text/html' });
  const data = [new ClipboardItem({ 'text/html': blob })];
  navigator.clipboard.write(data).then(() => {
    alert('Firma copiada al portapapeles');
  }).catch(err => {
    alert('Error al copiar: ' + err);
  });
}

// Función para descargar como archivo HTML
function downloadHTML(html) {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'firma-cica.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Inyecta los botones de acción
function injectButtons(firmaDiv) {
  if (document.getElementById('firma-export-buttons')) return;

  const container = document.createElement('div');
  container.id = 'firma-export-buttons';
  container.style.marginTop = '20px';

  const copyBtn = document.createElement('button');
  copyBtn.innerText = 'Copiar firma (HTML)';
  copyBtn.style.marginRight = '10px';
  copyBtn.onclick = () => copyToClipboard(firmaDiv.innerHTML);

  const downloadBtn = document.createElement('button');
  downloadBtn.innerText = 'Descargar firma (HTML)';
  downloadBtn.onclick = () => downloadHTML(firmaDiv.innerHTML);

  container.appendChild(copyBtn);
  container.appendChild(downloadBtn);

  firmaDiv.parentNode.insertBefore(container, firmaDiv.nextSibling);
}

// Ejecutar cuando el contenedor esté listo
waitForElement('#firma-preview', injectButtons);
