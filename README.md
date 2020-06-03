[![Build Status](https://travis-ci.org/Arquisoft/viade_0.svg?branch=master)](https://travis-ci.org/Arquisoft/viade_0)
[![codecov](https://codecov.io/gh/Arquisoft/viade_0/branch/master/graph/badge.svg)](https://codecov.io/gh/Arquisoft/viade_0)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6d87ad7b8b89409aa9dc2d7a7492affc)](https://www.codacy.com/gh/Arquisoft/viade_0?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arquisoft/viade_0&amp;utm_campaign=Badge_Grade)

# VIADE 0

This repository contains a skeleton of the VIADE project.

This project is an assignment for the [Software Architecture course](https://arquisoft.github.io/) following [these requirements](https://labra.solid.community/public/SoftwareArchitecture/AssignmentDescription/).

The app is deployed at [https://arquisoft.github.io/viade_0/](https://arquisoft.github.io/viade_0/) which also contains a [technical documentation](https://arquisoft.github.io/viade_0/docs).

More information about how this project has been setup is available [in the wiki](https://github.com/Arquisoft/viade_0/wiki).


## Building and running the web app locally

You’ll need to have [Node](https://nodejs.org/) 8.16.0 or Node 10.16.0 or later version on your local development machine.

Run:

```
npm start
```

## Building the docs locally

In order to create the docs you'll need [asciidoctor](https://asciidoctor.org/) and in case you use [plantuml](https://plantuml.com/) drawings, you'll also need [openjdk 8](https://openjdk.java.net/).

In Linux, they can be installed as:

```
apt-get install ruby openjdk-8-jre
gem install asciidoctor asciidoctor-diagram
```

Once they have been installed, the docs can be generated with:

```
npm run docs
```