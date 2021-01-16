import embed from 'vega-embed';
import { renderAllPlotsForArea } from './../charts/SetupPlots';
import { makePricePlot, makeMiniNights, makePlotRentalType } from './../charts/PlotStyles';


class LandmarkNeighborhood extends HTMLElement {
  constructor() {
    super();
    const theTemplate = document.createElement('template');

    theTemplate.innerHTML = `
<style>

  .landmark-container {
    border-top: 1rem solid red;
    background-color: rgba(255, 255, 255, .95);
    margin-bottom: 200vh;
    padding: var(--margin);
    width: 50%;
  }

  .landmark__title {
    font-size: 5rem;
    line-height: 1.1;
  }

.vega-embed, .vis-container {
  height: 400px;
  width: 100%;
}

h2, h3 {
    font-family: var(--font-headings);
}

</style>
<section id="ktown" class="container landmark-container">
    <header class="landmark__header">
        <h2 class="landmark__title">
            <slot name="title">
                Title of landmark
            </slot>
        </h2>
        <p class="lead">
            <slot name="quote">
                quote
            </slot>
        </p>
        <slot name="intro-p">
            intro paragraph
        </slot>

    </header>

    <div class='landmark__container'>
        <div class="">
            <h3>
                Rental types
            </h3>
            <figure class="vizContainerFigure">
                <div class="vis-container">
                    <div class="landmark__vis-rental-types"></div>
                </div>
                <details>
                    <summary>
                        Rental Types
                    </summary>
                    <p class="vis-description">
                        A transient traveler has many considerations for selecting a
                        rental: the amenities offered, the general aesthetic of the
                        living environment, and space needed. This affects the choice
                        among the four rental type options. For those without any other
                        choice in the City of Los Angeles, more affordable options like
                        tents, vehicles, and shelters housed 36,165 people in 2019
                        (LAHSA).
                    </p>
                </details>
            </figure>

            <figure class="vizContainerFigure">
                <div class="vis-container">
                    <div class="landmark__vis-nights"></div>
                </div>
                <details>
                    <summary>
                        Minimum Nights
                    </summary>
                    <p class="vis-description">
                        Ranging from one day to a few months, Airbnb hosts can require a
                        minimum number of nights a renter could stay in their rental.
                        This offers a preview into the length of time a transient
                        traveler might stay in the neighborhood and why they might be
                        visiting, whether for long-term work or a short-term vacation.
                        By contrast, 23% of the homeless population surveyed experienced
                        homelessness for the first-time that year, whereas chronic
                        homelessness increased by 17% (LAHSA, 2019).
                    </p>
                </details>
            </figure>

            <div class="vis-container">
                <div class="landmark__vis-price"></div>
            </div>
            <details>
                <summary>
                    Daily rate of an Airbnb rental</summary>

                <figure class="visContainerFigure">
                    <p class="vis-description">
                        How much money would a transient traveler pay to visit? In
                        contrast, economic factors are the main driver of increases in
                        homelessness and Los Angeles is the least affordable housing
                        market in the United States (LAHSA, 2019).
                    </p>
                </figure>
            </details>
        </div>
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

      shadow.querySelector('.landmark__vis-rental-types')?.setAttribute('id', `${theId}-vis-rental-types`);
      shadow.querySelector('.landmark__vis-nights')?.setAttribute('id', `${theId}-vis-nights`);
      shadow.querySelector('.landmark__vis-price')?.setAttribute('id', `${theId}-vis-price`);
    } catch (err) {
      console.error(err);
    }
  }

  setupScrollObserver(el, areaId) {
    function callback (entries, observer) {
      console.log(observer);
      console.log('observed changs');

      entries.forEach(entry => {
        console.log(entry);
      });

    // flyMapTo(entries, map);
    }

    const makeObserver = function (selector, callback) {
      const observer = new IntersectionObserver(callback, {
        root: document.root,
        rootMargin: '0px',
        threshold: 0.5
      });
      console.log(selector);
      try {
        observer.observe(document.querySelector(selector));
      } catch (e) {
        console.error("Couldn't get " + selector);
      }
    };

    // const waypoints = ['#ktown', '#hollywood', '#venice']
    makeObserver('#', () => console.log('Logged IO'));
  }

  renderPlot(el, areaId, dataUrl) {
    return Promise.all([
      embed(el.shadowRoot.querySelector('#' + areaId + '-vis-rental-types'), makePlotRentalType(dataUrl)),
      embed(el.shadowRoot.querySelector('#' + areaId + '-vis-nights'), makeMiniNights(dataUrl)),
      embed(el.shadowRoot.querySelector('#' + areaId + '-vis-price'), makePricePlot(dataUrl))
    ], (values) => console.log(values));
  }

  connectedCallback() {
    // Take attribute content and put it inside the info span
    const visId = this.getAttribute('data-vis-id');
    const visUrl = this.getAttribute('data-vis-url');
    if (!visId) {
      console.error('No vizId set');
    }
    this.setVisId(this, visId);
    this.renderPlot(this, visId, visUrl);
  }
}

window.customElements.define('landmark-neighborhood', LandmarkNeighborhood);

export default LandmarkNeighborhood;