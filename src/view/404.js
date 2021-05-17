export default () => {
  const viewDifferent = `
  <div class="body404">
  <section id="error-page">
    <section class="content">
      <h2 class="header">404</h2>
        <h4>Opps! Página no encontrada</h4>
          <p class="text-404">Lo sentimos, la ruta ingresada no es correcta, presiona el botón de inicio para visitar nuestra página </p>
      <section class="bottons">
        <a href="#/">Ir al Inicio</a>
      </section>
    </section>
  </section>
</section> 
        `;

  const divElemt = document.createElement('div');
  divElemt.innerHTML = viewDifferent;
  return divElemt;
};
