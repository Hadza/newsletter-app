# Newsletter App
This is a newsletter app that allows you to create and send newsletters to your subscribers.
You can perform the following actions:
* Send personalized emails to your subscribers, with attachments.
* Categorize your newsletters by topic.
* Send a newsletter to a specific group of subscribers.
* Subscribe/unsubscribe users from specific topic.
* Create a newsletter to manually send later.

## Tech Stack
* Vue 3
* Pinia
* Quasar
* NodeJS
* Sequelize
* Nodemailer w/ Handlebars
* PostgreSQL

# Installation
1. Download the latest version of the app from this repository.

2. Create Docker image.
```bash
 docker build -t newsletter-image .
```

3. Build container with Docker compose
```bash
 docker-compose build
```

4. Run the container
```bash
 docker-compose up -d backend
```

5. Open the browser and go to http://localhost:3000

## Preview
![](images/home.png)
![](images/new.png)
![](images/email.jpg)


