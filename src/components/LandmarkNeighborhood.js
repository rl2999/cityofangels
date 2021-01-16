const theTemplate = document.createElement('template')

theTemplate.innerHTML = `
<style>

  .landmark-container {
    width: 50%;
  }
</style>
<section id="ktown" class="container landmark-container">
    <header class="landmark__header">
        <h2>
        <slot name="title">
            Koreatown: A Multifaceted Cultural Enclave
        </slot>
        </h2>
        <p class="lead">
        <slot name="quote">
          <q>Koreatown is a bit of a misnomer. In truth, if we're sticking
            to ethnic assignations, the neighborhood should be called
            Korea-Mexico-town"</q>
          ―Roy Choi, Chef
          </slot>
        </p>
        <slot name="intro-p">
      <p>
          K-Town has the highest density of Homelessness in the City of Los
          Angeles. The passage of the Hart-Celler Act of 1965 resulted in a
          demographic shift across the country, encouraging an influx of
          immigrants that changed the cultural landscape of Los Angeles and
          catalyzed the growth of "The best Koreatown outside of Korea"
          (Curbed LA, 2019). Encompassing approximately 3 square miles just
          west of Downtown LA and south of Hollywood, the area was once the
          epicenter of Golden Age Hollywood, home to the Ambassador Hotel,
          the Cocoanut Grove and the Brown Derb. Today, Korean and Latinx
          populations contribute to Koreatown’s rich cultural diversity
          (Discover LA, 2019).
        </p>
        </slot>

    </header>

    <div class='landmark__container'>
      <div class="">
        <h3>
          Rental types
        </h3>
        <figure class="vizContainerFigure">
        <div id="ktownRentalTypes"></div>
        <details>
        <summary>
        Rental Types
        </summary>
          <p class="viz-description">
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
        <div id="ktownMiniNights"></div>
        <details>
        <summary>
          Minimum Nights
        </summary>
        <p class="viz-description">
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

        <div id="ktown-viz-airbnb-price" class="landmark__vis-container"></div>
        <details>
        <summary>
        Daily rate of an Airbnb rental</summary>

        <figure class="vizContainerFigure">
          <p class="viz-description">
            How much money would a transient traveler pay to visit? In
            contrast, economic factors are the main driver of increases in
            homelessness and Los Angeles is the least affordable housing
            market in the United States (LAHSA, 2019).
          </p>
        </figure>
        </details>
      </div>
  </section>
  `

class LandmarkNeighborhood extends HTMLElement {
  constructor () {
    super()
    const template = theTemplate
    const templateContent = template.content
    const shadowRoot = this.attachShadow({ mode: 'open' })
      .appendChild(templateContent.cloneNode(true))
  }

  setVizId (el, theId) {
    const shadow = el.shadowRoot
    shadow.querySelector('.landmark__vis-container').setAttribute('id', theId)
  }

  connectedCallback () {
    // Take attribute content and put it inside the info span
    const vizId = this.getAttribute('data-viz-id')
    if (!vizId) {
      console.error('No vizId set')
    }
    this.setVizId(this, vizId)
  }
}

window.customElements.define('landmark-neighborhood', LandmarkNeighborhood)

export default LandmarkNeighborhood
