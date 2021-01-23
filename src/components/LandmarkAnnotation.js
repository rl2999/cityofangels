import {
  setupScrollObserver as scrollSetup
} from './../ScrollEvents';

class LandmarkAnnotation extends HTMLElement {
  constructor() {
    super();
    const theTemplate = document.createElement('template');
    theTemplate.innerHTML = `
<style>
  .landmark-annotation {
    border-top: 1rem solid red;
    background-color: var(--c-red);
    color: var(--c-white);
    margin-bottom: 200vh;
    padding: var(--margin-mobile);
  }

  .landmark__title {
    font-size: var(--font-h3);
    line-height: 1.1;
    max-width: 30ch;
  }

h2, h3 {
    font-family: var(--font-headings);
}

@media screen and (min-width: 600px) {
  .landmark-annotation {
    max-width: 50%;
    padding: var(--margin-mobile);
}
}

@media screen and (min-width: 600px) {
  .landmark-annotation {
    max-width: 20vw;
    padding: var(--margin-mobile);
  }
}

</style>
<section class="landmark-annotation scroll-trigger">
<h3 class="landmark__title">
<slot name="title">
Title of landmark
</slot>
</h3>
<p>
<slot name="body">
intro paragraph
</slot>
</p>
</header>
</section>
  `;

    const template = theTemplate;
    const templateContent = template.content;
    const shadowRoot = this.attachShadow({
      mode: 'open'
    })
      .appendChild(templateContent.cloneNode(true));
  }

  setVisId(el, theId) {
    // Set all the IDS
    const shadow = el.shadowRoot;
    try {
      shadow.querySelector('.landmark-container')?.setAttribute('id', `${theId}`);

    } catch (err) {
      console.error(err);
    }
  }

  connectedCallback() {
    // Take attribute content and put it inside the info span
    const areaId = this.getAttribute('data-area-id');
    const zoomLevel = this.getAttribute('data-zoom-level');
    if (!areaId) {
      console.error('No vizId set');
    }
    this.setVisId(this, areaId);
    scrollSetup(this, areaId, zoomLevel);
  }
}

window.customElements.define('landmark-annotation', LandmarkAnnotation);

export default LandmarkAnnotation;