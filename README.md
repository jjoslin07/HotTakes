# Build a Secure API for a Review App
## To Run Project ⤵️
Pull the front-end app code from [this project repo](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6) and take the following steps:
1. Clone repo
2. Open a terminal (Linux/Mac) or command prompt/PowerShell (Windows)
3. Run npm install from within the project directory
4. Run npm start
5. Run your API on http://localhost:3000

## Scenario
You have spent the past year or so as a freelance back-end developer, and you have worked on multiple projects of varying sizes and difficulties.

Last week, you received a message on your freelance account asking for your help with a new project. With the rise in popularity of boutique hot sauces, in no small part thanks to the YouTube series "Hot Ones," this new client, the So Pekocko brand, wants to develop a hot sauce review web app called "Hot Takes." 

<div align="center">
<img src="https://user-images.githubusercontent.com/73438491/125133350-9dbed400-e0ba-11eb-836a-642c8248cadc.png" alt="Company Logo"/>
</div>

While the app will eventually become an online store, the product owner at So Pekocko considers the MVP to be an app which allows users to upload their favorite hot sauces, and to like/dislike the sauces uploaded by others. The front-end app has been developed and tested internally, but So Pekocko needs a back-end developer to build the API. 

The deadline is manageable, so you decide to accept the project. After meeting with So Pekocko’s product manager, she sends you the following email:

> From: Paula Z
>
> To: Me
>
> Subject: API requirements

Hello,

Excited to have you contribute to the new app! We’re a small brand, so this project will have a big impact on our growth.

You’ll find attached the requirements specification for the API. Within that document you’ll find a link to the project repo, where you’ll have access to the front end. 

Please take special note of the security requirements. We’ve experienced recent web attacks on our website, so we want reassurance that the API for this app is built using secure coding practices. All user data collected by the application must be protected!

Regards,

Paula Z
Product Manager
So Pekocko


Attached: 

- [Requirements](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Web%20Developer%20P6/EN%20P6_requirements.pdf)

It seems that your knowledge of the NEM stack and OWASP is perfectly suited for this project. You’ll use Node.js, Express, MongoDB, and Mongoose to build and secure the API. 

You’re ready to get started!

### Deliverables
The link to a public Git repo containing the code for the API.

- When your repo is cloned by your mentor or your assessor, they will run npm install from within the project root.
- They must then be able to run node server (or nodemon server) to spin up your API.

### Presentation
You'll do an oral presentation of your project with an assessor in order to imitate real-life conditions. Your assessor in this case will play the role of Paula, the So Pekocko product manager. The meeting will proceed as follows: 

- **Presentation of deliverables (15 minutes)**
  - Explain how your code works, especially elements that cannot be verified using the front-end app, such as your authentication middleware.
  - Explain the structure of your code (controllers, routers, etc.) and your reasons for choosing your specific structure. 
  - Explain your methods for securing the database based on GDPR and OWASP standards. 
- **Discussion (10 minutes)**
  - Playing the role of product manager, the assessor will ask you questions about your methodology and your deliverables. 

The assessor will challenge your decisions, so be prepared to defend your work. At the end of the session, the assessor will stop playing the role of product manager so that you can debrief together.

### Skills

🧰 Enable users to interact with a database using CRUD operations

🧰 Implement a data model

🧰 Store data securely using NoSQL

