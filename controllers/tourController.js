// const fs = require('fs');
const Tour = require('./../models/tourModel')
const APIFeatures = require('./../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );


exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5'
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
    next()
}


exports.getAllTours = catchAsync(async(req, res, next) => {
    // EXECUTE RESPONSE
    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitfields().pagination()
    const tours = await features.query

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    })

    // try {

    //     // EXECUTE RESPONSE
    //     const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitfields().pagination()
    //     const tours = await features.query

    //     // SEND RESPONSE
    //     res.status(200).json({
    //         status: 'success',
    //         requestedAt: req.requestTime,
    //         results: tours.length,
    //         data: {
    //             tours,
    //         },
    //     });
    // } catch (err) {
    //     res.status(404).json({
    //         status: 'fail1',
    //         message: err
    //     })
    // }
});

exports.getTour = catchAsync(async(req, res, next) => {
    const tour = await Tour.findById(req.params.id)

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404))
    }

    res.status(200).json({
        status: 'Success',
        data: {
            tour
        }
    })

    // try {
    //     const tour = await Tour.findById(req.params.id)
    //     res.status(200).json({
    //         status: 'Success',
    //         data: {
    //             tour
    //         }
    //     })

    // } catch (err) {
    //     res.status(404).json({
    //         status: "Failed",
    //         message: err
    //     })
    // }

    // const id = req.params.id * 1;

    // const tour = tours.find((el) => el.id === id);

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour,
    //     },
    // });
});

exports.createTour = catchAsync(async(req, res, next) => {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour,
        },
    });
    // try {
    //     // const newTour = new Tour({})
    //     // newTour.save()

    //     const newTour = await Tour.create(req.body);

    //     res.status(201).json({
    //         status: 'success',
    //         data: {
    //             tour: newTour,
    //         },
    //     });

    // } catch (err) {
    //     res.status(400).json({
    //         status: 'fail2',
    //         // message: " Invalid Data Sent !! "
    //         message: {
    //             err
    //         }
    //     })
    // }


});

exports.updateTour = catchAsync(async(req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        },
    });

    // try {
    //     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    //         new: true,
    //         runValidators: true
    //     })
    //     res.status(200).json({
    //         status: 'success',
    //         data: {
    //             tour
    //         },
    //     });
    // } catch (err) {
    //     res.status(404).json({
    //         status: 'fail4'
    //     })
    // }

});

exports.deleteTour = catchAsync(async(req, res, next) => {

    const tour = await Tour.findByIdAndDelete(req.params.id)

    if (!tour) {
        return next(new AppError('No tour found with that ID', 404))
    }

    res.status(200).json({
        status: 'Success',
        data: {
            tour
        }
    })

    // try {
    //     const tour = await Tour.findByIdAndDelete(req.params.id)
    //     res.status(200).json({
    //         status: 'Success',
    //         data: {
    //             tour
    //         }
    //     })
    // } catch (err) {
    //     res.status(400).json({
    //         status: 'Fail5',
    //         message: err,

    //     })
    // }
});


exports.getTourStats = catchAsync(async(req, res, next) => {
    const stats = await Tour.aggregate([{
            $match: { ratingAverage: { $gte: 4.5 } }
        },
        {
            $group: {
                _id: null,
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingQuantity' },
                avgRating: { $avg: '$ratingAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }

            }
        },
        {
            $sort: { avgPrice: 1 }
        }
    ])

    res.status(200).json({
            status: 'Success',
            data: {
                stats
            }
        })
        // try {
        //     const stats = await Tour.aggregate([{
        //             $match: { ratingAverage: { $gte: 4.5 } }
        //         },
        //         {
        //             $group: {
        //                 _id: null,
        //                 numTours: { $sum: 1 },
        //                 numRatings: { $sum: '$ratingQuantity' },
        //                 avgRating: { $avg: '$ratingAverage' },
        //                 avgPrice: { $avg: '$price' },
        //                 minPrice: { $min: '$price' },
        //                 maxPrice: { $max: '$price' }

    //             }
    //         },
    //         {
    //             $sort: { avgPrice: 1 }
    //         }
    //     ])

    //     res.status(200).json({
    //         status: 'Success',
    //         data: {
    //             stats
    //         }
    //     })
    // } catch (err) {

    //     res.status(400).json({
    //         status: 'Fail5',
    //         message: err,
    //     })
    // }
})

exports.getMonthlyPlan = catchAsync(async(req, res, next) => {
    const year = req.params.year * 1

    const plan = await Tour.aggregate([{
            $unwind: '$startDates'
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {

            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' }
            }
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: {
                _id: 0
            }
        },
        {
            $sort: { numTourStarts: -1 }
        },
        {
            $limit: 12
        }
    ]);

    res.status(200).json({
            status: 'Success',
            data: {
                plan
            }
        })
        // try {
        //     const year = req.params.year * 1

    //     const plan = await Tour.aggregate([{
    //             $unwind: '$startDates'
    //         },
    //         {
    //             $match: {
    //                 startDates: {
    //                     $gte: new Date(`${year}-01-01`),
    //                     $lte: new Date(`${year}-12-31`)
    //                 }
    //             }
    //         },
    //         {

    //             $group: {
    //                 _id: { $month: '$startDates' },
    //                 numTourStarts: { $sum: 1 },
    //                 tours: { $push: '$name' }
    //             }
    //         },
    //         {
    //             $addFields: { month: '$_id' }
    //         },
    //         {
    //             $project: {
    //                 _id: 0
    //             }
    //         },
    //         {
    //             $sort: { numTourStarts: -1 }
    //         },
    //         {
    //             $limit: 12
    //         }
    //     ]);

    //     res.status(200).json({
    //         status: 'Success',
    //         data: {
    //             plan
    //         }
    //     })
    // } catch (err) {
    //     res.status(400).json({
    //         status: 'Fail5',
    //         message: err,
    //     })
    // }
});