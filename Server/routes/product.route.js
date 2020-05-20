const express = require('express');
const productModel = require('../models/product.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const list = await productModel.all();
  res.json(list);
})

router.get('/:id', async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({
      err: 'Invalid id.'
    });
  }

  const id = +req.params.id || -1;
  const list = await productModel.detail(id);
  if (list.length === 0) {
    return res.status(204).end();
  }

  res.json(list[0]);
})

module.exports = router;