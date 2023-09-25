
# OTP Verification

Simple nodejs application to authenticate user throught otp. I have used twilio library for sending the otp.

*Note :- only numbers registered on https://www.twilio.com/en-us can recieve the otp on their mobile number .



## Run Locally

Clone the project

```bash
  git clone --recursive https://github.com/rohit27-02/admitkard.git
```

Go to the project directory

```bash
  cd admitkard
```
update submodule
```bash
  git submodule update --recursive --remote
```

Install dependencies for both frontend and backend 

```bash
cd frontend
```
```bash
  npm install
```
```bash
cd MobileOtpBackend
```

```bash
  npm install
```

*Note :- cross check from package json that all the dependencies are installed .

Start the backend

```bash
  nodemon start
```
Start the frontend

```bash
  npm run dev
```





## Screenshots
### Home page
![App Screenshot](https://i.ibb.co/pZk2txn/screencapture-localhost-3000-2023-09-25-21-53-15.png
)

### Verify OTP page
![App Screenshot](https://i.ibb.co/64YrBHX/screencapture-localhost-3000-otp-verify-919318409519-2023-09-25-21-59-38.png
)

### verification success page
![App Screenshot](https://i.ibb.co/xGPch3R/screencapture-localhost-3000-success-2023-09-25-22-02-06.png)


## Tech Stack

**Framework:** NextJS

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

**Libraries:** Twilio - for SMS services





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL`

`JWT_SECRET_KEY`

`TWILIO_SID`

`TWILIO_TOKEN`

`TWILIO_NUMBER`


## Contributing

Contributions are always welcome!


Please adhere to this project's `code of conduct`.


## Authors

- [@rohit27-02](https://github.com/rohit27-02/)


## 🛠 Skills
Javascript, HTML, CSS, MongoDB, NextJS, NodeJS, API, REST

