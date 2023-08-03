const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json()); // Express builtin Middleware

app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})


// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

// 3) ROUTES


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {

    // const err = new Error(`Can't finds ${req.originalUrl} on this server`)
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)


module.exports = app