// Asegúrate de tener html2canvas disponible en el proyecto
// <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>

function getInlineStyles() {
  const styles = Array.from(document.styleSheets)
    .map(sheet => {
      try {
        return Array.from(sheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n');
      } catch (e) {
        return ''; // Evita errores por CORS
      }
    })
    .join('\n');
  return `<style>${styles}</style>`;
}

function exportAsHTML() {
  const content = document.getElementById('firma-preview');
  const styles = getInlineStyles();
  const html = `
    <html>
      <head>
        <meta charset="UTF-8">
        ${styles}
      </head>
      <body>${content.outerHTML}</body>
    </html>
  `;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'firma-cica.html';
  a.click();
  URL.revokeObjectURL(url);
}

function exportAsImage() {
  const content = document.getElementById('firma-preview');
  html2canvas(content, { useCORS: true, backgroundColor: null }).then(canvas => {
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'firma-cica.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  });
}

// Vincular eventos
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('exportHtml')?.addEventListener('click', exportAsHTML);
  document.getElementById('exportImage')?.addEventListener('click', exportAsImage);
});
