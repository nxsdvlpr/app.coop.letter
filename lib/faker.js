import faker from 'faker'
import __ from './helper'

const fakerHelper = (() => {
  'use strict'

  const methods = {}
  methods.faker = function (key = null, ...args) {
    if (!key) {
      return faker
    }
    switch (key) {
      case 'name':
        return faker.name.firstName()
      case 'fullname':
        return faker.name.firstName() + ' ' + faker.name.lastName()
      case 'email':
        return faker.internet.email().toLowerCase()
      case 'phone':
        return faker.phone.phoneNumber('081#-####-####')
      case 'address':
        return faker.address.streetAddress()
      case 'city':
        return faker.address.city()
      case 'province':
        return faker.address.state()
      case 'postcode':
        return faker.address.zipCode()
      case 'address_full':
        return (
          faker.address.streetAddress() +
          ', ' +
          faker.address.city() +
          ', ' +
          faker.address.state() +
          ', ' +
          faker.address.zipCode()
        )
      case 'company':
        return faker.company.companyName()
      case 'date':
        return faker.date.past()
      case 'random_number':
        return __.randomInt(args[0], args[1])
      case 'random_char':
        return __.randomChar(args[0])
      case 'unique_id':
        return __.uniqueId(args[0])
      case 'description':
        return faker.lorem.sentences()
      case 'note':
        return faker.lorem.sentences()
      case 'product_title':
        return faker.commerce.productName()
      case 'product_price':
        return __.randomInt(50, 150) * 1000
      case 'product_description':
        return faker.commerce.productName()
      case 'product_category':
        return faker.commerce.department()
      case 'words':
        return faker.random.words()
      case 'slug':
        return __.strSlug(faker.random.words())
      case 'url':
        return 'https://example.com/' + __.strSlug(faker.random.words())
      default: {
        break
      }
    }
  }

  return methods
})()

export default fakerHelper
