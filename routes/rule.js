const express = require('express')
const ruleRoutes = express.Router()

const mongoose = require('mongoose')

const Rule = require('../models/Rule')
//connection
const username = 'doadmin'
const password = '094R13joZ5y28uIX'
const url = 'db-mongodb-sfo3-92685-47592cc2.mongo.ondigitalocean.com'
const dbName = 'Monachus'
const connection = mongoose.connection
mongoose.connect(
  `mongodb+srv://doadmin:094R13joZ5y28uIX@db-mongodb-sfo3-92685-47592cc2.mongo.ondigitalocean.com/Monachus?authSource=admin&replicaSet=db-mongodb-sfo3-92685&tls=true`,
  {
    useNewUrlParser: true
  }
)

connection.on('error', console.error.bind(console, 'connection error:'))

const getRules = async (paramID) => {
  /*  let collection = await connection
    .collection("rules")
    .find({
      eventID: eventID,
    })
    .toArray()
    .then(
      (data) => {
        return data;
      },
      (err) => {
        console.log("getRules error", err);
      }
    );
  return collection; */
  let collection = await connection
    .collection('rules')
    .find({
      eventID: paramID
    })
    .toArray()
    .then(
      (data) => {
        return { isFound: true, message: 'Rules has been found', data: data }
      },
      (err) => {
        console.log('getRules error:', err)
        return { isFound: false, message: `An error occured: ${err}` }
      }
    )
  return collection
}

const getAllRules = async () => {
  // i need to find all the rules in the database
  let collection = await connection
    .collection('rules')
    .find()
    .toArray()
    .then(
      (data) => {
        return {
          isFound: true,
          message: 'All rules that are found',
          data: data
        }
      },
      (err) => {
        console.log('getAllRules error:', err)
        return { isFound: false, message: `An error occured: ${err}` }
      }
    )
  return collection
}

const getRuleById = async (id, updateData) => {
  // search the database documents for the eventId and update the document that matches the objectId with updateData
  // first try to find the event
  /*  let found = await connection
    .collection("rules")
    .findOne({ id: id })
    .then((data) => {
      return data;
    });
  // if the event is found, update it
  if (found) {
    connection
      .collection("rules")
      .updateOne({ id: id }, { $set: updateData })
      .then(
        (data) => {
          return data;
        },
        (err) => {
          console.log("update error", err);
        }
      );
  } */
  let found = await connection
    .collection('rules')
    .findOne({ id: id })
    .then((data) => {
      return data
    })
  // if the event is found, update it
  /*updateData bana  
  data:{
          id: id,
          name: name,
          desc: desc,
          fields: fields,
          ruleLogicFormat:jsonLOGIC
      }
  şeklinde dönecek
      */
  if (found) {
    let updatedFound = await connection
      .collection('rules')
      .updateOne(
        { id: id },
        {
          $set: {
            //_id : updateData._id,
            //id: updateData.id,
            //eventID: updateData.eventID,
            name: updateData.name,
            desc: updateData.desc,
            category: updateData.category,
            fields: updateData.fields,
            ruleLogicFormat: updateData.ruleLogicFormat
            //eventID: updateData.eventID,
            //userID: updateData.userID,
            //createdByUser : updateData.createdByUser,
            //modifiedByUser: updateData.modifiedByUser,
            //isDeleted: updateData.isDeleted,
            //createdDate: updateData.createdDate,
            //modifiedDate: new Date(updateData.modifiedDate.$date),
          }
        }
      )
      .then(
        (data) => {
          return {
            isUpdated: true,
            message: 'Rule has been updated',
            ruleToBeUpdated: found,
            insertedData: updateData,
            info: data,
            // update the found object with the updateData
            updatedRule: [
              {
                ...found,
                updateData
              }
            ]
          }
        },
        (err) => {
          console.log('update error', err)
        }
      )
    return updatedFound
  } else {
    // first create a from the updateData using Rule model
    let newRule = new Rule(updateData)
    // then add the new event to the database using
    let inserted = await addRule(newRule)
    if (inserted.isAdded === true) {
      return {
        isUpdated: false,
        message: 'Rule not found, but added',
        data: data
      }
    } else {
      return {
        isUpdated: false,
        message: 'Rule not found'
      }
    }
  }
}

const deleteRuleById = async (id) => {
  // search the database documents for the objectId and delete the document that matches the objectId
  // first try to find the event
  /* let found = await connection
    .collection("rules")
    .findOne({ id: id })
    .then((data) => {
      return data;
    });
  // if the event is found, delete it
  if (found) {
    let deleted = await connection
      .collection("rules")
      .deleteOne({ id: id })
      .then(
        (data) => {
          return data;
        },
        (err) => {
          console.log("deleteRuleById error", err);
        }
      );
    return deleted;
  } */
  let found = await connection
    .collection('rules')
    .findOne({ id: id })
    .then((data) => {
      return data
    })
  // if the event is found, delete it
  if (found) {
    let deleted = await connection
      .collection('rules')
      .deleteOne({ id: id })
      .then(
        (data) => {
          return {
            data: data,
            deleteComplete: true,
            message: 'Rule has been deleted',
            deletedRule: found
          }
        },
        (err) => {
          console.log('deleteRuleById error', err)
        }
      )
    return deleted
  } else {
    return { deleteComplete: false, message: 'Rule not found' }
  }
}

const addRule = async (ruleSet) => {
  /*   //search the database for the eventSet
  let found = await connection
    .collection("rules")
    .findOne({ name: ruleSet.name })
    .then((data) => {
      return data;
    });
  // if the eventSet is not in the database, add it
  if (!found) {
    let event = await connection
      .collection("rules")
      // insert  ruleSet in the form of id:"", name:"", desc:"", fields:{}, jsonLOGIC: {},
      // it adds the ruleSet to the database twice and with all of the properties being null, why?
      .insertOne(ruleSet)
      .then(
        (data) => {
          return data;
        },
        (err) => {
          console.log("addRule error", err);
        }
      );
    return event;
  } 
  //search the database for the eventSet
  let found = await connection
    .collection("rules")
    .findOne({
      id: ruleSet.id,
    })
    .then((data) => {
      //console.log(data);
      return data;
    });
  // if the eventSet is not in the database, add it
  if (!found) {
    let rule = await connection
      .collection("rules")
      .insertOne(ruleSet)
      .then(
        (data) => {
          return { isAdded: true, message: "Rule has been added", data: data };
        },
        (err) => {
          console.log("An error occured", err);
          return { isAdded: false, message: `An error occured: ${err}` };
        }
      );
    return rule;
  } else {
    return { isAdded: false, message: "Rule already exists", data: found };
  }
  */

  /* let found = await connection
  .collection("rules")
  .findOne({
    id: eventSet.id,
  })
  .then((data) => {
    return data;
  });
if (!found) {
  let event = await Event.create(eventSet.data).then(
    (data) => {
      return { isAdded: true, message: "Event has been added", data: data };
    },
    (err) => {
      console.log("An error occured", err);
      return { isAdded: false, message: `An error occured: ${err}` };
    }
  );
  return event;
} else {
  return { isAdded: false, message: "Event already exists", data: found };
} */
  let found = await connection
    .collection('rules')
    .findOne({
      id: ruleSet.id
    })
    .then((data) => {
      return data
    })
  if (!found) {
    let rule = await Rule.create(ruleSet).then(
      (data) => {
        return { isAdded: true, message: 'Rule has been added', data: data }
      },
      (err) => {
        console.log('An error occured', err)
        return { isAdded: false, message: `An error occured: ${err}` }
      }
    )
    return rule
  } else {
    return { isAdded: false, message: 'Rule already exists', data: found }
  }
}

/* const saveAccountData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(dataPath, stringifyData);
};

const getAccountData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
}; */

// reading the data
/* ruleRoutes.get("/rule", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
}); */

ruleRoutes.post('/rules/add', async (req, res) => {
  // then use newEventModel in addEvent function to add the new event to the database
  const newRule = req.body[req.body.length - 1]
  addRule(newRule).then((data) => {
    if (data) {
      res.status('200').send({
        message: data.message,
        data: data.data
      })
    } else {
      res.status('400').send({
        message: data.message
      })
    }
  })

  /*  var existAccounts = getAccountData()
  existAccounts = req.body
  saveAccountData(existAccounts)
  res.send({ success: true, msg: 'account data added successfully' }) */
})

ruleRoutes.get('/rules/all', (req, res) => {
  const eventId = req.query.eventID
  getAllRules().then((data) => {
    if (data) {
      res.status('200').send({
        message: data.message,
        data: data.data
      })
    } else {
      res.status('404').send({
        message: data.message
      })
    }
  })
  /* const accounts = getAccountData()
  res.send(accounts) */
})
// Read - get all accounts from the json file
ruleRoutes.get('/rules/list', (req, res) => {
  const eventId = req.query.eventID || 'da5b366-a6b6-4ba-6004-a8d734b31540'
  getRules(eventId).then((data) => {
    if (data) {
      res.status('200').send({
        message: data.message,
        data: data.data
      })
    } else {
      res.status('404').send({
        message: data.message
      })
    }
  })
  /* const accounts = getAccountData()
  res.send(accounts) */
})

// Update - using Put method
ruleRoutes.put('/rules/:id', (req, res) => {
  console.log('req body from put', req.body) // req.body[req.body.length - 1].fields da olabilir emin değilim, ön tarafta put isteği yok
  console.log('req params from put', req.params)
  getRuleById(req.params.id, req.body).then((data) => {
    console.log('data', data)
    if (data.isUpdated) {
      res.status('200').send({
        message: data.message,
        target: data.ruleToBeUpdated,
        insertedData: data.insertedData,
        updatedRule: data.updatedRule
      })
    } else {
      res.status('404').send({
        message: data.message
      })
    }
  })
  /*   var existAccounts = getAccountData()
  const accountId = req.params['id']
  fs.readFile(
    dataPath,
    'utf8',
    (err, data) => {
      saveAccountData(req.body)
      res.send(`accounts with id ${accountId} has been updated`)
    },
    true
  ) */
})

//delete - using delete method
ruleRoutes.delete('/rules/delete', async (req, res) => {
  /*   deleteRuleById(req.params.id).then((data) => {
    res.send(data);
  }); */
  let targetedRule = await Rule.findOne({ id: req.body.id }) // buraya bakılmalı
  if (targetedRule) {
    deleteRuleById(targetedRule.id).then((data) => {
      if (data.deleteComplete) {
        data.deletedRule.isDeleted = true
        res.status('200').send({
          message: data.message,
          data: { deletedRule: data.deletedRule }
        })
      } else {
        res.status('404').send({
          message: data.message
        })
      }
    })
  } else {
    res.status('304').send({
      message: 'No rule found to delete'
    })
  }
  /*   fs.readFile(
    dataPath,
    'utf8',
    (err, data) => {
      const userId = req.params['id']
      var existAccounts = getAccountData()
      console.log('existAccounts', existAccounts)
      const cleaneventlist = existAccounts.filter(
        (event) => event.eventId !== userId
      )

      saveAccountData(cleaneventlist)
      res.send(`accounts with id ${userId} has been deleted`)
    },
    true
  ) */
})
module.exports = ruleRoutes
