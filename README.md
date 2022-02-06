# (PostCodes UK) Save data

This is a microservice mounted on **ExpressJS** that receives a csv file with a set of points with which it must query the postal codes for each point and store the information obtained in the database. 
## Project

The project information can be found at the following link: [PostCodes UK]()

## Requirements
- Tener el microservicio [Consume PostCodesIO](https://github.com/oneCiser/PostCodeUK-MS-Consume-PostCodesIO)

## Commands

### Deploy Server
To build the server
`
$ npm run build
`

To start the server
`
$ npm start
`

### Development

Run tests
`
$ npm run tests
`

Run the server and update changes

    $ npm run tsc
    $ npm run dev


## .env files

.env files should not be saved in the repositories. In this case they are stored for didactic purposes.
- **.env** for server deployment
- **.env.dev** in the development process

## Author
- [@oneCiser](https://github.com/oneCiser)