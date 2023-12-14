# Contribution Guidelines

## Code Style and Project Structure

-   Where-ever possible, prefer functional containers with React Hooks over class components.
    [https://reactjs.org/docs/components-and-props.html](Components and Props).
-   Stick to the [https://airbnb.io/javascript/react/](Air B and B styleguide) for code formatting:
-   If a component holds state, put it in the "containers" directory, for stateless components, place them within "components".
-   For state or configuration which must span across multiple components, use [https://reactjs.org/docs/context.html](React context)
    to manage and consume the state in children components. This is already available in the project as "ShopContext",
    there is a "withShopContext" HOC available.
-   Put brand specific configuration within the brandConfig.json file and pass the configuration into your
    components via the shopContext.
-   Use only one external library for a task (e.g. modal library), when swapping a library out within one component, swap it out of any other instances too.
-   In general, stick to full words instead of abbreviations. e.g. use "navigation" not "nav", this is the best way to ensure
    that everyone uses the same word / spelling for something.

## Styling (css, scss)

-   Use styled JSX within the component index.js or styles.js file.
-   Import breakpoints when needed `import { breakpointSmall } from 'theme/styles/breakpoints';`
-   Use camelCase for classnames e.g. reviewStars.
-   Avoid nested styles so that full class names can be search for easily within the project.

## Front-end Markup

-   Use microdata markup from [https://schema.org/Product](schema.org) tags to mark up information on the page.
-   Maintain headings hierarchy - use appropriate heading tags depending on the type of heading.
    e.g. H1 for an actual page heading, H2 for a sub heading and H3 for a section heading. Don't mix
    these up in order to apply an H2 "style" to what should be an H3 heading.
-   Use the [http://getbem.com/](BEM CSS) naming convention for element class names. This is to ensure consistency and modularity
    for component re-use and style overriding.
-   Add an ID to every major section of the page to use used as anchor points or GTM tagging targets.
    e.g. '<section id="footer" className="footer">... </section>`.
-   Add data attributes for GTM targeting to actionable page elements such as buttons and links.
    At minimum, the data attributes should provide an action title and value (and position when relevant).
    `data-action="Add to cart" data-value="{CART VALUE}`.
-   Use rgb for all colours, and rgba for colours with transparency. `rgb(255, 255, 255);`.
