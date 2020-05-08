Products Grid
====

### How do I start the app?
- first install all dependencies by running `npm install` or `yarn install`
- to run both server and the app use `npm run dev` or `yarn dev`.
- to run only the server use `npm run server` or `yarn server`
- to run only the app use `npm run start` or `yarn start`

## Features I have added
----
### Products features
- products are displayed in a grid.
- products can be sort by "size", "price" or "id". The products list are reloaded when a new sorting option is chosen.
- products with their real correct size, price in dollars and a formatted date.
- products grid automatically load more items as you scroll down.
- an animated loader is diplayed while the user waits for the data to load.
- the next batch of results is fetched in advance, and it is not displayed until the user has scrolled to the bottom of the product grid.
- the message "~ end of catalogue ~" is shown when the user reaches the end and there are no more products to be shown.
- *loading of products on scroll* and *formatting of dates* are created from scratch by me.
### Ads features
- after every 20 products an advertisement is inserted.
- Ads are randomly selected, and never display the same ad twice in a row.
