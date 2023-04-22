MyMusic Music App

Welcome to our music website, where we aim to provide an immersive and user-friendly experience for all music enthusiasts. Our website boasts an intuitive flow and multiple pages that cater to all your music-related needs. This website is built using Angular, HTML, CSS, Bootstrap and MongoDB. It utilizes the Spotify API key to fetch the latest songs and display them on the website.

Here are some instructions on how to run the project:
Clone the repository to your local machine.
Install Node.js and Angular CLI on your system.
Navigate to the project directory and run the command npm install to install all the required dependencies.
Create a Spotify Developer account and obtain the API key.
Open the src/environments/environment’s file and replace the spotifyApiKey value with your API key.
Run the command ng serve to start the development server.
Open your browser and navigate to http://localhost:4200 to view the website.

The website satisfies the following requirements:
1. It is mobile friendly and compatible on devices like iPhone SE, iPad Mini, nest hub, iPhone 12 Pro etc.
2.Number of roles in the website – User and Admin.
3. Login page has two fields email and password If a user doesn’t have an account one can create a new account. These details are stored in mongoDB and we have used encryption on password.
4. This website has total 30 pages.
5.Number of transactions- 15
6. Backend tech- Node.js v-16.20.0
7.Frontend- HTML, CSS, Bootstrap
8.External API- Spotify API on Live Music section
9.CRUD – Created on login page (Created user), Admin Panel (Read users which were created, Admin can Update the details and Delete)
10. We have followed git branching and each one of us has a branch.
11. Functionality wise commits are followed. We committed as components were made.
12.Database used is MongoDB.
13. Frontend Framework- Angular CLI: 15.2.6

Flow and Pages
Firstly, our "Get Started" page is designed as a landing page to give users an initial glimpse of what our website has to offer. From there, users can proceed to the "Login" page, where they can either sign in with an existing account or create a new one.
Once logged in, users are directed to the "Home" page, which showcases a sleek navigation bar featuring essential features such as "Home," "Explore," and "Live Music." The page also displays our logo and links to pages such as "Subscription," "Contact Us," and "About Us."
Our "About" page provides information about the website and its creators, highlighting our passion for music and our dedication to providing a top-notch music experience. The "Contact" page allows users to reach out to us with any questions or feedback they may have, with form validations in place to ensure valid details are submitted.
Our "Subscription" page is designed to provide users with information regarding our plans and offers three different subscription plans. Users can select a plan and proceed to another page to complete their payment details. Our form validations ensure that only valid details are submitted, providing a smooth and secure payment experience.
The "Explore" page is an excellent place for music lovers to discover various albums, including rock, pop, jazz, dance, and more. Additionally, our "Live Music" feature allows users to search for their favorite songs and enjoy them.
For administrative purposes, we have included an "Admin Panel" with two tabs: "Users" and "Artist." Here, the admin can manage user details such as their name, last name, email, and role. They can also delete users or make any user an admin. In the "Artist" tab, users can create an artist, add an image, and add multiple albums under the artist.
In summary, our website is designed to cater to all music lovers, offering a seamless and immersive music experience with multiple pages and features to explore.
