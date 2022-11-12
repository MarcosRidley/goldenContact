import cors from 'cors';
import express from 'express';
import login from './middleware/login';
import contactsRoute from './routes/contacts.route';
import loginRoute from './routes/login.route';
import registerRoute from './routes/register.route';

const app = express();


//basic middleware handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//login and registration routes comes before auth middleware so that middleware can be applied to all routes except login and registration
app.use('/login', loginRoute);
app.use('/register', registerRoute);

//auth middleware
app.use(login.validateJwtMiddleware);
//all routes after this middleware will require a valid token

//routes

app.get('/', (_req, res) => {
  res.send('Created by Marcos Ridley');
});

//contacts route
//should only be accessible if user is logged in
//routes: getAll, getOne, create, update/:id, delete/:id
app.use('/contacts', contactsRoute);


//server export
export default app;
