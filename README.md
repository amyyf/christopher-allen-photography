# To-Do

- [x] Get Contentful data once (React Query wrapper?)
- [x] Dynamic routing
- [x] Routing between images in album - back/forward nav
- [x] Upwards nav back to home
- [x] Basic album page
- [x] Basic image page
- [x] Layout wrapper for all routes: <https://nextjs.org/docs/basic-features/layouts#single-shared-layout-with-custom-app>
- [x] Informative error messaging
- [x] Styles! Responsive!
- [x] Fix nav arrows in galleries to wrap to beginning
- [x] Page for all albums
- [x] Dynamic page title
- [x] Sort albums from Contentful consistently
- [x] Put loading and error components into appropriate slots
- [x] Download one static file to host and display as a backup on the homepage
- [x] Nav bar different mobile layout? -> went with flex-wrap
- [x] Pretty urls (maybe, nice to have)
- [x] Rework to match updated content model - albums -> entries
- [x] Handling for images where the title is not a single number
- [x] Hover styles
- [ ] Possible different mobile and desktop homepage images? (landscape vs portrait dimensions)
- [ ] Limit number of homepage images that can be published (`https://www.contentfulcommunity.com/t/- limit-content-entries-by-content-model-type/539/3`)
- [ ] Size images from Contentful appropriately for album layout; can images be pre-fetched for speed?
      -> putting height/width into the Contentful query significantly slowed down image render
- [ ] Contentful credit in footer?
- [ ] Finalize fonts and color scheme for all components, including error
- [ ] Finalize layout (footer at botttom of viewport, loaders, errors, grid content) to minimize content shifting
- [ ] Handling for null entries and images
- [ ] Add captions when provided
- [ ] Do draft posts come through in the API? How to separate out test data from real data?
- [ ] Flatten out data coming back from Contentful to remove that logic from the presentational components?

## Dev instructions

Run the development server:

```bash
npm run dev
# or
yarn dev
```
