# mern-workouts

This is a web application that allows allows fitness enthusiasts to create, track, and modify their workout routines. This application features a user-friendly dashboard that provides users with a summary of their workouts, including the number of workouts completed.

With the workout creation feature, users can easily create and modify their workout routines by adding custom exercises and specifying the sets, reps, and weights for each exercise. This feature is implemented through a user-friendly form that allows users to input all the relevant information.

The application is built with React, NodeJS, and MongoDB for tracking and managing workout routines. In the backend, GET requests are used to display all workouts to the browser, POST requests are used to create new workouts, DELETE requests are used to remove workouts, and PATCH requests are used to update existing workouts. A schema file is also included in the backend to ensure that only valid data is stored in the database.

This application is created with React, NodeJS and MongoDB. 

From the NodeJS I have created GET request to show all the workouts to the browser, POST request to create a new workout, DELETE request to delete a workout and PATCH request to update existing workouts. I've also created a GET request to show a single workout, that I haven't implemented in the front-end.

On the front-end, a React component is created to manage the form that saves workout information to the database. Another component is created to display the saved information, allowing users to easily delete or update their workouts. To ensure seamless data flow between components, a Context is created and a custom hook is developed for easy access to the Context.

Future features are user authentication and creation.
