# Welcome

This is the project I submitted as final assignment for _Harvard's CS50W - Web Development with Python and JavaScript_.

In the following paragraphs I want to outline what I did and, where applicable, why I did it.

It was my goal build something I was proud of, that looked nice, worked well, but also added utility to my own life. I took this opportunity to experiment with ReactJS because I wanted to experiment with the latest in web development, learn new skills and as I said, also building something useful.

As a photographer I always relied on services built by others to assemble and publish my portfolio's. This time however I wanted to design everything myself from scratch!

In essence, this application is the admin panel for a portfolio website I want to build in the coming months. As photographer I wanted to have an application where I can upload, rate and select the images that I will show to my clients later on.

So, while they will only see a carefully curated selection in the end, I will be working behind the scenes in this app to like, rate and delete images, making sure I can build a dynamic selection by either uploading images from this app or dragging and dropping them in the cloud storage provider for images (Cloudinary), then fetching them to display in my admin panel and later the portfolio frontend.

# Design

```

                    REQUEST:                                            REQUEST:
                    If tag is provided (e.g. 'fav')                     * Credentials for auth
                    fetch images for that tag.                          (email and p/w)
                    If no tag is provided fetch all                     * Tags for fetching images
                    images. Limited in API layer to                     from cloud storage
                    max 50 so rate limit and free                       * Image CRUD
                    plan usage is not exceeded!


+------------+      <--------------------       +----------------+      <--------------------       +------------+
| CLOUDINARY |                                  | DRF (REST API) |                                  |   REACT-JS |
+------------+      -------------------->       +----------------+      -------------------->       +------------+

Image storage       RESPONSE:                   Serialization           RESPONSE:
                    Base64 images               Authentication          * auth response
                                                Security                * Base64 images from cloud
                                                User Database           storage
                                                Cloudinary SDK




```

## Why ReactJS?

As one of the leading use-cases and implementations of JavaScript today this framework is very popular and a valuable addition to my toolkit as a web developer. It will considerably improve my position on the job market, and, although it added a steep learning curve to my project, I felt this was also a sound architectural decision because it leaves me with an app that is far easier to maintain and offers room for expanding in the future, that I thought it worth the extra time I'd have to invest.

## Why Django Rest Framework (DRF)?

As the view part of my application and templates would be handled solely by the ReactJS frontend (separation of concerns) I was looking for a way to disable all the features of Django I would not be needing such as the Jinja2 templates and views, which lead me to discover DRF, which is a lightweight alternative that would let me use all the things I had picked up about it in the course of CS50W, while having a much smaller memory footprint that the full fledged Django framework.

**This is now my new dream stack!**

## Why Cloudinary?

I opted for a third party storage platform because that seemed like the most robust and safe option in the long run. So, instead of having to deal with the overhead of learning how to store and optimize for image retrieval in Djano, plus having to have my own storage, I decided to 'outsource' that task to Cloudinary :)

# Before you run

## Frontend

**1) Install the dependencies using npm**
Requirements:

- [NodeJS](https://nodejs.org/en/)

```
$ cd frontend
$ npm install
```

This should install the frontend dependencies and create a folder called `node_modules`

## Backend

**1) Install the dependencies using pip3**
Requirements:

- Python3
- Pip3

```
$ cd backend
$ pip3 install -r requirements.txt
```

**2) Django migrations and setup**
While in the `./backend` folder run the following commands:

```
$ py manage.py makemigrations
$ py manage.py migrate
```

This should create your migrations and `db.sqlite3` file,

# Running the applications

## ...with Bash script

In the root of the project there is a bash script for starting the front- and the backend called **run.sh**, once you've made the script [executable](https://www.andrewcbancroft.com/blog/musings/make-bash-script-executable/) then running the following command from the root of the project:

```
$ sh run.sh
```

This should open two terminal windows with the development servers of the front- and backend applications.
You can access the application by going to `http://localhost:3000/` where you should be greeted with the login screen!

If the script fails to run you might have to make the following scripts excecutable as well:
`./backend.sh`
`./frontend.sh`

These are the scripts that get called by the `run.sh` script.

If you don't want to use this approach, you can always run the applications...

## ...by starting them manually

**Frontend**

```
$ cd frontend
$ npm run start
```

This will start a development server on `http://localhost:3000/`
**Note**: If you wish to run the frontend development server on another port, don't forget to update the CORS policy on the Django settings!

**Backend**

```
$ cd backend
$ python3 manage.py runserver 8001
```

**Note**: The Django server will run on port 8001. If you wish to change this don't forget to update the **API_BASE_URL** in `./frontend/src/shared/constants.ts`

# Dependencies

## Backend

**Django REST framework**: A Python based, lightweight yet powerful and flexible toolkit for building Web API's using only the core features of Django. I chose this because I decided to separate the view from my API layer into a separate frontend.
**Cloudinary (SDK)**: Cloud-based image and video management services. It enables users to upload, store, manage, manipulate, and deliver images and video
**Django-Rest-Knox**: Provides easy to use authentication allowing for common patterns
**Django-CORS-Headers**: Required for allowing requests to the Django application from other origins

## Frontend

**React**: JavaScript framework for building single page applications
**ReduxJS-Toolkit**: State management tool and abstraction layer on top of redux pattern
**Typescript**: Language based on JavaScript (superset) providing type safety and type checking
**ES-Lint**: Syntax and code style checking; identifying and reporting JavaScript patterns
**Prettier**: Code formatter
**Bulma**: CSS framework based on flexbox and built with Sass
**Fontawesome**: Icon library

The combination of these tools helps me to catch errors while writing my code and without even leaving my IDE. They also help me deliver semantic, readable and well-formatted code that is maintainable.

As for the styling dependencies I was curious and excited to work with something new, so I decided to go with Bulma over Bootstrap. This helped with giving the application a modern look and feel while maintaining a focus on responsive layouts and being setup mobile first. Plus the Fontawesome icons add a lot of visual appeal to the cards...

# Validations and error handling

## Frontend

**Username (email)**: See **EMAIL_REGEX** in `./frontend/src/shared/constants.ts`
**Password**: Password has to be at least 8 characters long
**No image selected for upload**: Error thrown prompting to chose a file
**No images in cloud storage**: Frontend error prompting user to upload images
**No images in Favs**: Frontend message prompting user to like images

## Backend

**API call pending state**: Triggers a spinner in the FE for uploading images, toggle likes, deleting and auth calls
**Server offline**: Triggers Error component to be shown on every page in the frontend with the error message
**Resource not found (404)**: Triggers Error component to be shown on every page in the frontend with the error message
**Rate limit exceeded (400)**:Triggers Error component to be shown on every page in the frontend with the error message
**Unauthorized (400)**:Triggers Error component to be shown on login page in the frontend with the error message
