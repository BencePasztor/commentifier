# Commentifier

## About
Commentifier is a work-in-progress web application inspired by Disqus and 444hsz that lets users post articles from other websites so that other users can write comments and discuss them.
To try the application, navigate to the project directory and run:

```docker-compose up --build```

![image](https://github.com/user-attachments/assets/ceefdc99-1320-4e64-ab2f-c99d320a6933)
![image](https://github.com/user-attachments/assets/351ff8b6-8aee-4e6f-80ef-90d886b11e78)
![image](https://github.com/user-attachments/assets/7decae2e-5ea3-480b-8ed0-824782306348)


## Features:
- User Authentication: Users can register, log in, and set their profile pictures.
- Infinite Scroll
- Article Submission: Users can submit articles from other websites; the app fetches the title, description, and Open Graph image automatically.
- Comment System
- Upvote System: Users can upvote comments, highlighting popular content.
- Search Functionality

## Stack:
- Frontend: React
- Backend: Node/Express.js
- Database: Posgres using Prisma ORM
