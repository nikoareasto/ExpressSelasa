const db = require('../../config/dbMySql')
const {
  Brand
} = db

const getBrand = (req, res) =>
  Brand
  .findAll({
    limit: 10
  })
  .then(result => {
    console.log(result)

    if (result)
      res
      .status(200)
      .json(result)
    else
      res
      .status(500)
      .json({
        message: 'Data not found.'
      })
  })

// delete employee
const deleteBrand = (req, res) => {
  const {
    id
  } = req.params

  return Brand
    .destroy({
      where: {
        brand_id: id
      }
    })
    .then(() =>
      res
      .status(204)
      .json({})
    )

}

module.exports = {
  getBrand,
  deleteBrand,
}