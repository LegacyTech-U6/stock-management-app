const express = require('express');
const router = express.Router();
const WorkersController = require('../controller/workers.controller');
const { body } = require('express-validator');

// Create
router.post(
  '/',
  [
    body('entreprise_id').isInt().withMessage('Entreprise ID must be a number'),
    body('user_id').isInt().withMessage('User ID must be a number'),
    body('position').optional().isString(),
    body('date_hired').optional().isDate(),
    body('status').optional().isIn(['active', 'inactive', 'suspended'])
  ],
  WorkersController.createWorker
);

// Get all
router.get('/', WorkersController.getAllWorkers);

// Get one
router.get('/:id', WorkersController.getWorkerById);

// Update
router.put('/:id', WorkersController.updateWorker);

// Delete
router.delete('/:id', WorkersController.deleteWorker);

module.exports = router;
