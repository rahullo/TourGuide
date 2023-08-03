const express = require('express')
const tourController = require('../controllers/tourController')
const authcontroller = require('./../controllers/authController')

const router = express.Router();


// router.param('id', tourController.checkID)

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours)

router.route('/tour-stats').get(tourController.getTourStats)
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan)

router.route('/').get(authcontroller.protect, tourController.getAllTours).post(tourController.createTour)

router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour)

module.exports = router