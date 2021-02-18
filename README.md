# open-house.io
![CI](https://github.com/joshLong145/housingDataScrape/workflows/Node.js%20CI/badge.svg)
## Overview
Applicattion for scraping housing / apartment rental data from multiple origins through extendable data  transformers. MongoDB is used for data persistance. 

### support the following origins

    * Zillow
    * ApartmentsDotCom

## Configuring 
see `env_sample` for 

### Running 
Prebuilt artifacts are included, to run the api execute the following `node dist/index.js <path to configuration file>`. API can also be run from the included docker file. port specified should be forwarded out of the container.

### Building
`npm run build` will run the tsc and output files to the `dist` directory. please see above foor instructions on how to run.

