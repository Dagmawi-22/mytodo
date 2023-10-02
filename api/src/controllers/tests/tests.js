
import request from 'supertest'
import {Express} from 'express-serve-static-core'

import {createServer} from '@exmpl/utils/server'

let server = Express

beforeAll(async () => {
  server = await createServer()
})

describe('GET /', () => {
  it('should return welcome message', async done => {
    request(server)
      .get(`/api`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject({ message: "Welcome to dagmawi:s to do application." })
        done()
      })
  })

  it('should return list of todos', async done => {
    request(server)
      .get(`/api/todos`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done({message: "Some error occurred while retrieving todos."})
        expect(res.body).toMatchObject([{}])
        done()
      })
  })
  
  it('should return 500 & valid error response if payload is empty', async done => {
    request(server)
      .post(`/api/todos`)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done({message: "Some error occurred while creating todo."})
        expect(res.body).toMatchObject({'error': {
          message: "Some error occurred while creating todo."
        }})
        done()
      })
  })
})