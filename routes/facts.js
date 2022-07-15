// imports for account Routing
const express = require('express')
const eventRoutes = express.Router()
// imports for mongoDB connection
const mongoose = require('mongoose')

const Event = require('../models/Facts')
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

const getEvents = async (userID) => {
  let collection = await connection
    .collection('facts')
    .find({
      userId: userID
    })
    .toArray()
    .then(
      (data) => {
        return { isFound: true, message: 'Events has been found', data: data }
      },
      (err) => {
        console.log('getEvents error:', err)
        return { isFound: false, message: `An error occured: ${err}` }
      }
    )
  return collection
}

const getEventById = async (id, updateData) => {
  let found = await connection
    .collection('facts')
    .findOne({ eventId: id })
    .then((data) => {
      return data
    })
  if (found) {
    let updatedFound = await connection
      .collection('facts')
      .updateOne(
        { eventId: id },
        {
          $set: {
            fields: updateData
          }
        }
      )
      .then(
        (data) => {
          return {
            isUpdated: true,
            message: 'Event has been updated',
            eventToBeUpdated: found,
            insertedData: updateData,
            info: data,
            updatedEvent: [
              {
                ...found,
                fields: updateData
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
    return {
      isUpdated: false,
      message: 'Event not found'
    }
  }
}

const deleteEventById = async (id) => {
  let found = await connection
    .collection('facts')
    .findOne({ eventId: id })
    .then((data) => {
      return data
    })
  if (found) {
    let deleted = await connection
      .collection('facts')
      .deleteOne({ eventId: id })
      .then(
        (data) => {
          return {
            data: data,
            deleteComplete: true,
            message: 'Event has been deleted',
            deletedEvent: found
          }
        },
        (err) => {
          console.log('deleteEventById error', err)
        }
      )
    return deleted
  } else {
    return { deleteComplete: false, message: 'Event not found' }
  }
}

const addEvent = async (eventSet) => {
  let found = await connection
    .collection('facts')
    .findOne({
      eventId: eventSet.data.eventID
    })
    .then((data) => {
      return data
    })
  if (!found) {
    let event = await Event.create(eventSet.data).then(
      (data) => {
        return { isAdded: true, message: 'Event has been added', data: data }
      },
      (err) => {
        console.log('An error occured', err)
        return { isAdded: false, message: `An error occured: ${err}` }
      }
    )
    return event
  } else {
    return { isAdded: false, message: 'Event already exists', data: found }
  }
}

eventRoutes.post('/facts/addevent', async (req, res) => {
  const { userId, userRealm, userName, userAccessToken, userClientId, data } =
    req.body
  data.userId = userId
  data.userRealmName = userRealm
  data.userUserName = userName
  data.userToken = userAccessToken
  data.userClientName = userClientId

  addEvent(req.body).then((data) => {
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
})

eventRoutes.get('/facts/list', (req, res) => {
  const userID = req.query.userId || 'f84497f4-c97f-43b2-a338-f43dd36bb701'

  getEvents(userID).then((data) => {
    if (data) {
      res.status('200').send({
        message: data.message,
        data: data.data
      })
    } else {
      res.status('402').send({
        message: data.message,
        data: data.data
      })
    }
  })
  //res.send(accounts);
})

// Update - using Put method
eventRoutes.put('/facts/:id', async (req, res) => {
  let fieldsToBeAdded = req.body[req.body.length - 1].fields
  getEventById(req.params.id, fieldsToBeAdded).then((data) => {
    if (data.isUpdated) {
      res.status('200').send({
        message: data.message,
        target: data.eventToBeUpdated,
        insertedData: data.insertedData,
        updatedEvent: data.updatedEvent
      })
    } else {
      res.status('404').send({
        message: data.message
      })
    }
  })
})

//delete - using delete method
eventRoutes.delete('/facts/delete/:id', async (req, res) => {
  let targetedEvent = await Event.findOne({ eventId: req.params.id })
  if (targetedEvent) {
    deleteEventById(targetedEvent.eventId).then((data) => {
      if (data.deleteComplete) {
        data.deletedEvent.isDeleted = true
        res.status('200').send({
          message: data.message,
          data: { deletedEvent: data.deletedEvent }
        })
      } else {
        res.status('404').send({
          message: data.message
        })
      }
    })
  } else {
    res.status('304').send({
      message: 'No event found to delete'
    })
  }
})
module.exports = eventRoutes
