const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create a mongoDB schema
const eventSchema = new Schema({
  eventId: {
    type: String,
    required: true
  },
  eventName: {
    type: String,
    required: true
  },
  eventDescription: {
    type: String,
    required: true
  },
  eventCategory: {
    type: String,
    default: ''
  },
  fields: {
    type: Array,
    required: true
  },
  userId: {
    type: String,
    //required: true,
    default: 'a92c1f61-7fe5-4978-97df-4446e9a9c7b2'
  },
  userRole: {
    type: Object,
    required: false,
    default: { manager: false, admin: false, user: true }
  },
  userAccess: {
    type: Object,
    required: false,
    default: { read: true, write: true }
  },
  userRealmName: {
    type: String,
    required: true,
    default: 'Yeni'
  },
  userClientName: {
    type: String,
    required: true,
    default: 'auth-yeni'
  },
  userToken: {
    type: String,
    required: true,
    default:
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2cjEtSzFkQ0VWNkxKalQ3WFkzeVZlaFhVS2tsX2FON0R6OVQ0MEV6aFNnIn0.eyJleHAiOjE2NTYwMDI0MDAsImlhdCI6MTY1NTk5OTQwMCwiYXV0aF90aW1lIjoxNjU1OTk5Mzk4LCJqdGkiOiI0NDE0ZTQxOC0yZDk3LTQ1NjgtYTM1Ni1kZmU4NzkzNWM5MjMiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL1llbmkiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTkyYzFmNjEtN2ZlNS00OTc4LTk3ZGYtNDQ0NmU5YTljN2IyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYXV0aC15ZW5pIiwibm9uY2UiOiI2ODJkYjRmYy1jMTc3LTRhMDYtODZkNC00NTA2MmRiN2IxOGUiLCJzZXNzaW9uX3N0YXRlIjoiZGNlYWI1MTgtYzhkYi00YTg1LWFiZWUtNjVjYmNlODhkY2FmIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsIkt1bGxhbsSxY8SxIiwidW1hX2F1dGhvcml6YXRpb24iLCJBZG1pbiIsImRlZmF1bHQtcm9sZXMteWVuaSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImF1dGgteWVuaSI6eyJyb2xlcyI6WyJhZG1pbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6ImRjZWFiNTE4LWM4ZGItNGE4NS1hYmVlLTY1Y2JjZTg4ZGNhZiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiJ9.M9kSbf9gqOrz5GkFYZa0bk0cxME1n4ImnnkgpIhF1a8rPFjOshTYdt3IZ7zHClGhsvfpBfHThoRfxFrtaIykiVTDEnF4tWixuNyKq4gw6j_FI0r1lEA2vRJeLwXG02o5YHxYV7qseBBhIO34tM30GgKQUpoqVqwPcmZZWKZiLWZguFYMOOQVnivXdKwMu4kjIZfYwG5szmarpRjTEG1LvduD0MI9r_TV0TPanfTwYFsEGIjxubooHnZFzLjZ9XZzXPVCCUdD7BNsOR5otjQcrtdSjXR0-MLUoJHHqKJAcwNwlBruXjE_pPU87V9evwfHNH_ubmKA0i9Toh7wMzFddg'
  },
  userUserName: {
    type: String,
    required: true,
    default: 'admin'
  },
  createdByUser: {
    type: String,
    //required: true,
    default: 'Omer'
  },
  modifiedByUser: {
    type: String,
    //required: true,
    default: 'Mert'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  modifiedDate: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Event', eventSchema)
