# Whose Turn Is It?

This is a tiny React app that lets you input a set of names and whose turn it is now, then gives you a URL to return to and see whose turn it is next time. It comes with infrastructure-as-code to deploy it as a static site in S3.

* `npm install`
* `npm start` to run the local dev server
* Edit the code in `src/index.tsx` and the template in `dist/index.html`
  * `npm run lint`
* Follow the instructions in [infrastructure](infrastructure) to enable:
  * `npm run deploy` to upload the app to S3
  * `npm run teardown` to remove the S3 deployment
