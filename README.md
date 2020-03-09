# ui5-cap

A repository showcasing the use of [UI5 Tooling](https://github.com/SAP/ui5-tooling), [CAP](https://cap.cloud.sap/docs/) + [UIveri5](https://github.com/SAP/ui5-tooling)-based testing (as presented at [UI5conBE in Feb 2020](https://openui5.org/ui5con/belgium2020/)).

## Overview

UI5 app and CAP media server providing an OData v4 media upload and preview capabilities.

http://localhost:4081 runs the ui5 app,
http://localhost:4004 drives the CAP middleware and persistence.

It is based on

- the UI5 ecosystem showcase: https://github.com/petermuessig/ui5-ecosystem-showcase
- the CAP community media handling example: https://github.com/sapmentors/cap-community/tree/master/examples/media-handling

## Getting Started

```bash
# yarn needed - install node deps
yarn
# init local persistence layer (based on CAP)
yarn deploy
# run it all (ui5 + CAP)
yarn dev:cap
```

## License

This work is licensed under the Derived Beer-ware License:

When you like this stuff, buy [@vobu](https://twitter.com/vobu) a beer, [@pmuessig](https://twitter.com/pmuessig) a coke or [@wolf_gregor](https://twitter.com/wolf_gregor) also a beer when you see one of them.