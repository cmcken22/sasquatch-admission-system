After cloning the workspace from github, or downloading the zipped folder containing all the source code,
run the following commands:

<<>><<>><<>><<>>FRONTEND<<>><<>><<>><<>>
- in the terminal cd to frontend
- install all the necessary node modules and npm packages using: npm install 
- make sure bower is installed in your workspace using: bower version
  - if bower is not installed install it using: npm install -g bower
- install all the necessary bower components using: bower install
- make sure ember-cli is installed using: ember v
  - if ember is not installed install it by using: npm install -g ember-cli

<<>><<>><<>><<>>BACKEND<<>><<>><<>><<>>
- in the terminal cd to backend
- install all the necessary node modules and npm packages using: npm install

*****IMPORTANT****
There are a couple lines in the code that need to be replaced with the proper urls:

- fontend/app/adapters/application.js
  - replace: host: 'https://sasquatch-admission-system-cmcken22.c9users.io:8082'
  - with: host: 'https://YOUR-URL-GOES-HERE.c9users.io:8082'

- frontend/config/environment.js
  - replace: 'connect-src' : "'self' https://sasquatch-admission-system-cmcken22.c9users.io:8082"
  - with: 'connect-src' : "'self' https://YOUR-URL-GOES-HERE.c9users.io:8082"

- backend/server.js
  - replace: res.header('Access-Control-Allow-Origin', 'https://sasquatch-admission-system-cmcken22.c9users.io:8080');
  - with: res.header('Access-Control-Allow-Origin', 'https://YOUR-URL-GOES-HERE.io:8080');


ONCE ALL THE INSTALLS HAVE BEEN COMPLETED --> FIRE UP THE SERVERS

TO RUN THE MONGO SEVRVER
- cd to frontend and run the following command: mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"
- if an unclean shut down has been detected:
  - delete the file named "mongod.lock" in te data folder
  - re-run the following code
  - mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"

TO RUN THE EMBER SERVER
- cd to frontend and run the following command: ember server --proxy https://YOUR-URL-GOES-HERE.io:8082
- *****IMPORTANT**** : make sure to replace "YOUR-URL-GOES-HERE" with the intended url to desired url that the software will be ran on

TO RUN THE NODE SERVER
- cd to backend and run the following command: node server.js


Notes:
- all images must be located in: frontend/app/public/images
- the css files must be located in: frontend/app/styles/app.css