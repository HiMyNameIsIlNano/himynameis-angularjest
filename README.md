# AngularJest

This is just a small sample project to integrate the `Jest` testing framework in an `Angular` project. The goal is to
understand
how easier/faster it is to use jest instead of `Karma` for such a task and also how easier and more readable
the `test classes` are
in comparison to using `Jasmine`.

## How to get Jest to work with TS

To get `Jest` up and running I simply followed the documentation under: https://github.com/thymikee/jest-preset-angular.
Another thing I did was to remove `karma.conf.js` as it clashed with the `setup-jest.ts` file.

## Start the application

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Continuous testing

Add the following entry:

```json
"continuos-test": "jest --watchAll"
```

to `package.json`.
