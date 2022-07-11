const { expanse } = require("../models");

module.exports.add = (req, res) => {
  const { shop } = req.body;
  const { cost } = req.body;
  if(!shop || !cost){
    res.status(422);
    return res.send({answer: "Name or price input is not defined."});
  }
  if(cost < 0 || isNaN(cost)){
    res.status(422);
    return res.send({answer: "Price should be a positive number!"});
  }
  if (!req.body["shop"].trim()) {
    res.status(422);
    res.send({answer: "Text is required"});
  }
  expanse.create(req.body)
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(422).send({answer: err});
  })
}


module.exports.get = async (req, res) => {
  try {
    const all = await expanse.findAll();
    res.json(all);
  }
  catch (err) {
    console.error(err.message);
  }
}

module.exports.remove = (req, res) => {
  const {id} = req.params;
  if (!id.trim()) {
    res.status(422).send({answer: "Invalid id"})
  }
  expanse.destroy({where: {id}})
  .then(async(removed) =>  {
    if(removed) {
      const all = await expanse.findAll();
      return res.send(all);
    }
    return res.status(404).send({answer: "row not found"})
  }).catch(err => {
    res.status(422).send({answer: err});
  })
}

exports.updateInstance = async (req, res) => {
  const { id } = req.params;
  const { shop, cost } = req.body;
  if (id) {
    if (!shop && !cost) {
      return  res.end("Name or price input is not defined.")
    } else {
      if (shop) {
        if (shop.startsWith(" "))
          return res.end("Edited name cannot be empty or invalid format.")
      }
      if (cost) {
        if (cost < 0 || isNaN(cost)) {
          return res.end("Edited price must be positive number.")
        }
      }   
    }

    try {
      const result = await list.update({ shop, cost }, {
        where: {id: id }
      });
      if (result[0] === 1) {
        return await this.get(req, res);
      } else {
      return res.status(404).send({ answer: 'Instance not found.' });
      }
  } catch (error) {
      return res.status(422).send({ answer: error });
  }
  }
}