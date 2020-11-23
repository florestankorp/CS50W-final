# Welcome

This is the project I submitted as final assignment for _Harvard's CS50W - Web Development with Python and JavaScript_. I wanted to make something that was going to serve a dual purpose: be a sandbox for experimenting with the latest technology in web development, a place where I can learn new skills while also building something useful.

As a photographer I always relied on services built by others to assemble and publish my portfolio's. This time however I wanted to design everything myself from scratch!

In essence, this application is the admin panel for a portfolio website I want to build in the coming months. As photographer I wanted to have an application where I can upload, rate and select the images that I will show to my clients later on.

So, while they will only see a carefully curated selection in the end, I will be working behind the scenes in this app to like, rate and delete images making sure I can build a dynamic selection by either uploading images from this app or dragging and dropping them in the cloud storage provider for images (Cloudinary), then fetching them to display in the frontend.

# Design

```

                    REQUEST:                                        REQUEST:
                    If tag is provided (e.g. 'fav')                 * Credentials for auth
                    fetch images for that tag                       (email and p/w)
                    If no tag is provided fetch all                 * Tags for fetching images
                    images. Limited in API layer to                 from cloud storage
                    max 50 so rate limit and free                   * Image CRUD
                    plan usage is not exceeded!


+------------+      <--------------------       +------------+      <--------------------       +------------+
| CLOUDINARY |                                  |   DJANGO   |                                  |   REACT   |
+------------+      -------------------->       +------------+      -------------------->       +------------+

Image storage       RESPONSE:                   Serialization       RESPONSE:
                    Base64 images               Authentication      * auth response
                                                Security            * Base64 images from cloud
                                                User Database       storage
                                                Cloudinary SDK




```

# Backend

**Django REST framework**: A Python based, lightweight yet powerful and flexible toolkit for building Web API's using only the core features of Django. I chose this because I decided to separate the view from my API layer into a separate frontend.
**Cloudinary (SDK)**: Cloud-based image and video management services. It enables users to upload, store, manage, manipulate, and deliver images and video
**Django-Rest-Knox**: Provides easy to use authentication allowing for common patterns
**Django-CORS-Headers**: Required for allowing requests to the Django application from other origins

# Frontend

**React**: JavaScript framework for building single page applications
**ReduxJS-Toolkit**: State management tool and abstraction layer on top of redux pattern
**Typescript**: Language based on JavaScript (superset) providing type safety and type checking
**ES-Lint**: Syntax and code style checking; identifying and reporting JavaScript patterns
**Prettier**: Code formatter
**Bulma**: CSS framework based on flexbox and built with Sass
**Fontawesome**: Icon library

# Validations, requirements and error handling

**Username (email)**: See **EMAIL_REGEX** in `./CS50W-final/frontend/src/shared/constants.ts`
**Password**: Password has to be at least 8 characters long
**No image selected for upload**: Error thrown prompting to chose a file
**No images in cloud storage**: Frontend error prompting user to upload images
**No images in Favs**: Frontend message prompting user to like images

## Backend errors

**Server offline**:
**Resource not found (404)**:
**Rate limit exceeded (400)**:
**Unauthorized (400)**:
