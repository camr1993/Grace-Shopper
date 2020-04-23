const router = require('express').Router()
const {Item} = require('../db/models')
module.exports = router

//GET ALL ITEMS
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll({
      order: [['name', 'ASC']],
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

//SERVES REQ.CURRENTITEM FOR EVERY ROUTE THAT HAS /:itemId
router.param('itemId', async (req, res, next, itemId) => {
  try {
    req.currentItem = await Item.findByPk(itemId)
    if (!req.currentItem) throw new Error()
    next()
  } catch (err) {
    res.status(404).send(`Error at router.param: Item at id: ${itemId}`)
    next(err)
  }
})

//GET ITEM BY ID
router.get('/:itemId', (req, res, next) => {
  res.json(req.currentItem)
})

//UPDATE ITEM QUANTITIES ON CHECKOUT(reducing quantities in Item table)
router.put('/checkout', async (req, res, next) => {
  try {
    // example input:
    // req.body: {
    //  userId: 1,     //WHY IS USERID NEEDED HERE
    //  cart: [{id: 1, quantity: 2}, {id: 2 quantity: 3}]
    //    }
    for (let item of req.body) {
      const currentItem = await Item.findByPk(item.itemId)
      await currentItem.updateQuantities(item.quantity)
    }
    // vv Delete this vv
    const updatedItems = await Item.findAll()
    res.json(updatedItems) //instead of sending back updated items just use front-end reducer to simulate the changes
    //res.sendStatus(2??)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const createItem = await Item.create(req.body)
    res.json(createItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    const itemId = req.params.itemId
    const removeItem = await Item.destroy({
      where: {
        id: itemId,
      },
    })
    res.json(removeItem)
  } catch (err) {
    next(err)
  }
})

router.put('/:itemId', async (req, res, next) => {
  try {
    const itemId = req.params.itemId
    const [, item] = await Item.create(req.body, {
      where: {
        id: itemId,
        returning: true,
      },
    })
    res.json(item)
  } catch (error) {
    next(error)
  }
})
