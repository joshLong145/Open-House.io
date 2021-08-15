# Open-House.io
![CI](https://github.com/joshLong145/housingDataScrape/workflows/Node.js%20CI/badge.svg) [![jest-testing](https://github.com/joshLong145/Open-House.io/actions/workflows/jest-testing.yml/badge.svg?branch=master)](https://github.com/joshLong145/Open-House.io/actions/workflows/jest-testing.yml)

Allows for data injest from multiple origins to document store based persistence layer.

Currenly the transformers for site layouts are statically included 

### supports the following layouts

    * Zillow
    * ApartmentsDotCom

## Configuring
Create a new `.env` at root of repository.
See `env_sample` for defaults.

## Building
Depedencies should be installed before building.
`npm run build` will run the tsc and output files to the `dist` directory.

See `tsconfig.json` for specific configuration settings.

## Developing
We now support development within containers. see `.devcontainer`

requires both Docker, and Docker-Compose
