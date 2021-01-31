# Housing Data API

## Overview
Applicattion for scraping housing / apartment rental data from multiple origins through custom data transformers. Curently support the following origins

* Zillow
* ApartmentsDotCom

Currently need to provide the fully formed URL to be scraped.

## Configuring 



### Running 
Prebuilt artifacts are included, to run the api execute the following `node dist/index.js <path to configuration file>`. API can also be run from the included docker file. port specified should be forwarded out of the container.

### Building
to build from source, `npm run build` will run the tsc and output files to the `dist` directory. please see above foor instructions on how to run.

