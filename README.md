[![Build Status](https://travis-ci.org/Adrian265431/viadeUO265431.svg?branch=master)](https://travis-ci.org/Adrian265431/viadeUO265431)
[![codecov](https://codecov.io/gh/Adrian265431/viadeUO265431/branch/master/graph/badge.svg)](https://codecov.io/gh/Adrian265431/viadeUO265431)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/348ae21cbc454ec3ad9b17c83d7ae2d0)](https://app.codacy.com/manual/Adrian265431/viadeUO265431/dashboard)

# VIADEUO265431

This project shows how to create a new react webapp and configure it using travis in order to enable continuous integration for students of Oviedo's University.

## Contributors
*   Adrián Díaz Moro.

## Requirements
*   Node js : You’ll need to have Node 8.16.0 or Node 10.16.0 or later version on your local development machine.
*   Ruby.
*   AsciiDoctor : You’ll need to have asciiDoctor and asciiDoctor-diagrams.

```sh
sudo apt-get update
sudo apt-get -y install ruby nodejs
sudo gem install asciidoctor asciidoctor-diagram
sudo apt-get -y install graphviz 
```

## Run project

```sh
npm install
npm start
```

If you have installed yet, you don't need npm install, you can use npm update for actualize the dependencies.

Or, you can entry in this web <https://adrian265431.github.io/viadeUO265431/> and you can work with our app.

## Build documentation

```sh
Node and Ruby are required. 
npm install
gem install asciidoctor
gem install asciidoctor-diagram 
npm run docs
```

You can view the documentation in this web: <https://adrian265431.github.io/viadeUO265431/docs/>.

## Run test

```sh
Chi is required. 
npm i chi 
npm test:e2e
```
