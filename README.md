# Mr Men News

- Full stack Reddit-style news application 
- This is the frontend code for the app, built using React
<br>

[Click here](https://mr-men-news.netlify.app/) to see the **hosted** version of the app
<br>

[Click here](https://github.com/bellaroyle/Mr-Men-News-Backend) to see the **backend code** code for the app

<br>

### Some info about the app 
---
- The app currently is logged in as 'cooljmessy' so that a user can see some of the functionality that comes with that such as posting and deleting comments 
- I made this using [Create React App](https://github.com/facebook/create-react-app)
- The app is hosted using [netlify](https://www.netlify.com/)
- I used some components from [Material-UI](https://material-ui.com) aswell as CSS to style the app, and some components from [Reach Router](https://reach.tech/router/) for functionality. 

<br>

### How to use repo
---
- Fork and clone this repo and open it in your code editor.
- Run the command `npm install` in your terminal to install the dependencies
- Run the command `npm start` to see the app in your browser on local a local host port. if you make any edits, the page will reload whenever you save the file you're working on. 
<br>


### Planned Improvements
---

Although this is hosted and functional, it is still a work in progress and there are many improvements I am planning on implementing such as: 
<br>

- A side bar with a list of all the articles titles which link to their page when viewing on a desktop
- Functionality to sort Articles by number of comments 
- Ability to log in as any valid user, allowing for the functionality that comes with that such as posting and deleting comments
- Pagination of articles
- giving a max height to the articles with a view more button/link so that each article does not take up most of the screen when viewing on a phone
- Limit the voting functionality so that a user can only up vote or down vote an article once, and cannot vote on their own articles. And only able to vote on articles if logged in. 
- Ability to create a new user 
- Ability to post an article as a logged in user, to an existing topic or create a new one
