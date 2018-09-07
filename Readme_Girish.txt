Assumptions and Ideas:
Kept server and client separate (could have combined)
Used angular 6,  material designs and flex-box
The angular app - (could improve scrolling of question and displaying of rank using directive)
Could have add many more tests and additional error handling.
Would like to try the same application with ngrx


The following instructions tested on PC and MAC (with Chrome and Safari) 
Unzip BNPP_additup (All instructions from root (location you unzipped files))

Building the server:
cd WebApi/WebApi/
dotnet build

Running the tests:
From root
cd WebApi/WebApi.Tests/
dotnet test

Running the service:
From root
cd WebApi/WebApi/
dotnet run


Building and Testing NPM common lib (assumption lib folder is empty; otherwise delete it first)
cd WebApiClient/common/
npm intall
npm run build
npm run tests

Create a global link for Angular projects
npm link


Building and Angular App
cd WebApiClient/additup-app/
npm link additup-common
npm install
ng build
ng test
ng serve






