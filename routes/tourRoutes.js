const tourController = require('../controllers/tourControllers');

const router = express.Router();

router.route('/').post(tourController.createTour);

module.exports = router;