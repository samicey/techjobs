const request = require("supertest");
const { app } = require("../index");
const {Task }= require("../models/task");

describe('Todo CRUD API',()=>{

  test('No test yet',async ()=>{
    expect(true).toBe(true)
  })

  test('Read Todos',async ()=>{
    
    const response = await request(app).get('/todo/all');
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(Array.isArray(response.body)).toBe(true);
    expect(typeof response.body[0]).toBe('object');
    return;
  });

  test('Get One Todo', async ()=>{
    const Todo = await Task.findOne();
    if(!Todo){
      return;
    }

    const response = await request(app).get(`/todo/one?id=${Todo.id}`);
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(Todo.name).toBe(response.body.name);
    expect(String(Todo._id)).toStrictEqual(response.body._id)
  
  })

  test('Get Non Existing Todo', async ()=>{
    
    const id = '5e7a0266e8736232ec58b5f7';

    const response = await request(app).get(`/todo/one?id=${id}`);
    expect(response.status).toBe(404);
  
  })

  test('Create New Todo', async ()=>{
    const now = Date.now();
    const data = {
      name: `My Test Todo Created ${now}`
    };


    const response = await request(app).post(`/todo/create`).send(data);
    const todo = await Task.findOne({name: data.name});
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(todo.name).toStrictEqual(response.body.name);
    expect(todo.name).toStrictEqual(data.name);
    await todo.remove()
    
  })
  // Write test for update and deleting todo
  
  test('Update a Todo', async ()=>{

    const data = {
      name: `Eat Akpu and egusi`,
      done:true
    };

    const Todo = await Task.findOne();
    if(!Todo){
      return;
    }
    const response = await request(app).patch(`/todo/update/${Todo.id}`).send(data);
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    const UpdateTodo = await Task.findOne({name: data.name});
    expect(UpdateTodo.name).toStrictEqual(data.name);
    expect(UpdateTodo.done).toStrictEqual(data.done);  
    expect(String(Todo._id)).toStrictEqual(UpdateTodo.id); 
    
  })
 //  check delete complete to done
 test('Delete a Todo', async ()=>{


  const Todo = new Task({
    name: "Eat well to live well",
    done: true
  }) 

  await Todo.save()
  const response = await request(app).delete(`/todo/delete/${Todo.id}`);
  expect(response.status).toBe(200);
  expect(response.body._id).toStrictEqual(Todo.id)
  const DeleteTodo = await Task.findOne({name: Todo.name}); 
  expect(DeleteTodo).toStrictEqual(null);
  
  
})
})