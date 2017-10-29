// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseApiUrl: 'http://localhost:5000',
  firebaseConfig: {
    apiKey: 'AIzaSyCwjP2n8zJutiF3fAcHL_02UUPfPmyybJU',
    authDomain: 'quotesocialnetwork.firebaseapp.com',
    databaseURL: 'https://quotesocialnetwork.firebaseio.com',
    storageBucket: 'quotesocialnetwork.appspot.com',
    messagingSenderId: '15943729790',
    projectId: 'quotesocialnetwork'
  }
};
