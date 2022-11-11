# social-media-platform

## Description

The purpose of this project was to create an API for a social media network using a NoSQL database; in this case, I used MongoDB. A user is able to to create, edit, and delete users and thoughts. A user is also able to add/remove friends to users and add/remove reactions to thoughts. All of the data creation, alteration, and deletion is accomplished using CRUD and implementing GET, POST, PUT, and DELETE commands in Insomnia. In order to accomplish this, I used Mongoose (a data modeling library to handle MongoDB), created routes, models, and controllers for the API to function, and ensured that the server would work properly. Most of what I learned was simply further understanding of MongoDB, APIs, and the ways in which routes and controllers function together. 

## Technology Used:

1. Javascript
2. MongoDB (including MongoDB Compass for easy reading)
3. Mongoose
4. Insomnia
5. Express

## Link to Video Walkthrough
https://watch.screencastify.com/v/PDAyofeNzYE0dCjJudgl

## Screenshots

Users Collection
![](/images/mongocompass1.png)

Thoughts Collection
![](/images/mongocompass2.png)

Post a new thought
![](/images/postnewthought.png)

Get all thoughts
![](/images/getallthoughts.png)

Delete a thought (using thought ID)
![](/images/deleteathought.png)