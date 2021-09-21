<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/dwinovic/VehiclesRental">
    <img src="https://res.cloudinary.com/dnv-images/image/upload/v1631957118/VehicleRental/ewallet_2_ktkxde.svg" alt="Logo" width="180" height="180">
  </a>

  <h3 align="center">RESTful API for Vehicle Rental</h3>

  <p align="center">
  Back-end application or server in charge of supplying <br> Vehicle Rental web application data needs through Rest API technology.
    <br />
    <a href="https://github.com/dwinovic/backend-vehicleRental"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://vehicle.noopik.com/">View Demo</a>
    ·
    <a href="https://github.com/dwinovic/VehiclesRental">Report Bug</a>
    ·
    <a href="https://github.com/dwinovic/VehiclesRental">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
        <ol>
            <li>
                <a href="#build-with">Build With</a>
            </li>
        </ol>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ol>
        <li>
          <a href="#installation">Installation</a>
        </li>
        <li>
          <a href="#prerequisites">Prerequisites</a>
        </li>
        <li>
          <a href="#related-project">Related Project</a>
        </li>
      </ol>
    </li>
    <li><a href="#vehicle-rental-api-documentation">Vehicle Rental API Documentation</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

<b>Vehicle Rental</b> is a platform for providing vehicle rental services from various major cities in Indonesia. The service provider is managed by a trusted vendor.

### Build With
* [Express Js](https://expressjs.com/)
* [Node Js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)
* [Json Web Token](https://jwt.io/)
* [Nodemailer](https://nodemailer.com/about/)

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* [Node Js](https://nodejs.org/en/download/)
* [MySQL](https://www.mysql.com/downloads/)
* [Postman](https://www.postman.com/downloads/)

### Installation
    
1. Clone These 2 Repos (Backend and Frontend)
```sh
https://github.com/dwinovic/Blanja-ReactJS
```
2. Go To Folder Repo
```sh
cd blanja-backend
```
3. Install Module
```sh
npm install
```
4. Make a new database and import [vehicle-rental-db-sample.sql](https://drive.google.com/file/d/1nkGK8AMA_NEvgIqXbYQLtEnVCwCU3j9U/view?usp=sharing)
5. Add .env file at root folder project, and add following
```sh
DB_NAME = [DB_NAME]
DB_HOST = [DB_HOST]
DB_USER = [DB_USER]
DB_PASS = [DB_PASS]
PORT = 4000
PRIVATE_KEY = [YOUR_PRIVATE_KEY_FOR_JWT_DECODE]
EMAIL_SERVICE = [YOUR_SMTP_EMAIL]
PASS_EMAIL_SERVICE = [EMAIL_PASS]
HOST_SERVER = [URL_LOCAL_BACKEND]
HOST_CLIENT = [URL_LOCAL_FRONTEND]
CLOUD_NAME = [YOUR_NAME_CLOUDINARY]
API_KEY = [YOUR_API_KEY_CLOUDINARY]
API_SECRET = [YOUR_API_SECRET_CLODINARY]
```
6. Starting application
```sh
npm run dev
```
7. Testing with Postman
    * [Vehicle Rental Postman APIs Collection](https://documenter.getpostman.com/view/15390348/UUxtDVep)

### Related Project
* [`Frontend Vehicle Rental`](https://github.com/dwinovic/VehiclesRental)
* [`Backend Vehicle Rental`](https://github.com/dwinovic/backend-vehicleRental)

## Vehicle Rental API Documentation

* [Vehicle Rental Postman APIs Collection](https://documenter.getpostman.com/view/15390348/UUxtDVep)

## Contact
My Email : novidwicahya19@gmail.com

Project Link: [https://github.com/dwinovic/blanja-backend](https://github.com/dwinovic/blanja-backend)
