<h2>Student API - Middleware and validation</h2>


<P>This project uses <bold>middleware</bold> to improve the structure, readability, and reliability of the Student Management API.</p>

<P>Middleware in Express is a function that runs <bold>before the route handler</bold>. It can be used to log requests, validate incoming data, or stop invalid requests before they reach the main route logic.</p>

<P>Validation in this project is implemented <bold>through middleware</bold>. This means the API checks incoming data before creating, updating, or deleting student records.</p>

<h2>What is Middleware</h2>

<p>Middleware is a function with this structure:</p>

```js
(req, res, next) => {
  // do something
  next();
}
