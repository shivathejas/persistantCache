# Redis with NodeJS
We are storing the translation on the cache. This will be halpful to avoid the repeated hits to the transaltion API.
In this application we are calling a mack API, and it returns a constant output with array of transaltions. APi provides transaltion for below specified languages.

  - English
  - Telugu
  - Kannada
  - Hindi
  - Malyalam
  - Bangla
  - Tamil
 
We used the below MOck API:
- "https://run.mocky.io/v3/775a3db8-1cd2-4b68-8050-ad658e5041bd"

### POST endpoint:
- "http://localhost:8080/api/get/translation"
- request body:
    {
    "targetLanguage":${language},
    "message":${message value for 
    }
### Tech
Application is developed with below set of technologies:

* [node.js] - runtime environment.
* [Express] - fast node.js network app 
* [morgan] - Used for logging the HTTP request.

### Installation
Install the dependencies and devDependencies and start the server. And make sure Redis server is up and running.

```sh
$ cd ${directory path}
$ npm install
$ node app
```
