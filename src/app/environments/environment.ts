
 import 'zone.js/dist/zone';  // Included with Angular CLI.
 import 'zone.js/dist/zone-error';


export const environment = { 
    production: false,
    // apiUrl: 'http://localhost:4200/register',
    // apiUrl: 'http://localhost:4200/assets/data/userdata.json'  *** Modified 06/05/2020 ***
    // private url = 'http://localhost:4200/assets/data/userdata.json';
    apiUrl: 'https://nodejs-fb-app.herokuapp.com/users/register'  // *** Modified 06/05/2020 ***
};