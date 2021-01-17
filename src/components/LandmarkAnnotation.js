import { setupScrollObserver as scrollSetup} from './../ScrollEvents';

class LandmarkAnnotation extends HTMLElement {
  constructor() {
    super();
    const theTemplate = document.createElement('template');
    theTemplate.innerHTML = `
<style>
  .landmark-annotation__container {
    border-top: 1rem solid red;
    background-color: var(--c-red);
    color: var(--c-white);
    margin-bottom: 200vh;
    padding: var(--margin);
    max-width: 50%;
  }

  .landmark__title {
    font-size: 3rem;
    line-height: 1.1;
  }

h2, h3 {
    font-family: var(--font-headings);
}

</style>
<section class="landmark-annotation__container scroll-trigger">
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
    const shadowRoot = this.attachShadow({ mode: 'open' })
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