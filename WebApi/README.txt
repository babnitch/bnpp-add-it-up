The objective of this exercise is to create a simple website that offers games to train your brain.
The 1st game to implement is AddItUp - a simple addition online game.

Business requirements
---------------------
1/ When user connects to the web application, he is presented with a simple page with a question of type a + b = ?
2/ User must submit answer within given timeframe (defined by server). User can submit one and only one answer for a given equation.
3/ Timer should be displayed on screen for user to know how much time is left.
4/ If answer is correct, next question is returned.
5/ If user provides 3 good answers in a row he is promoted to the next rank and time allowance for each question is reduced by 1 second. 
   Example of ranks: "Beginner", "Talented", "Intermediate", "Advanced", "Expert"
6/ If answer is incorrect or time runs out game ends and user is offered the option to start again.
7/ 2 users should not see the same equations at the same time.

Technical requirements
----------------------
Solution should use the 3 projects provided:
- WebApi .net core project
- Typescript client common library (used by Angular client app)
- Angular 6 front end app

Each project should come with a set of some sensible unit tests which will give quality confidence. 
We don't expect 100% coverage.

Each project has its own way to run the tests:
- WebApi .net core project: test can be listed/executed from Visual Studio
- Typescript client common library: execute "npm run test"
- Angular 6 app

Expectations & Assumptions
--------------------------
Please list assumptions made during implementation of the solution.

Being an asp.net core project, we should be able to run it from any machine with Visual Studio and node / npm

While developer can use libraries of his choice (excluding jQuery), candidates should be able to explain how he/she offer the same functionality without the library.

It is ok if client is served by a different http server than the WebApi .net core project, as long as the client knows how to invoke webapi.
