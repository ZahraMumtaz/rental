const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/PropertyController');
const { validate, validateQuery, propertySchema, propertyUpdateSchema, propertyQuerySchema } = require('../middlewares/validation');

router.post("/create", validate(propertySchema), PropertyController.create);
router.get(
  "/get", validateQuery(propertyQuerySchema),PropertyController.getAll);
router.get("/get/:id", PropertyController.getById);
router.put("/update/:id", validate(propertyUpdateSchema) , PropertyController.update);
router.delete("/delete/:id", PropertyController.delete);

module.exports = router;