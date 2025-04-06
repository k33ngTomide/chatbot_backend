

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.post('/chat', 'ResponsesController.chat')
Route.group(() => {
  Route.post('/content', 'CMSController.create')
  Route.get('/content', 'CMSController.index')
  Route.put('/content/:id', 'CMSController.update')
  Route.delete('/content/:id', 'CMSController.destroy')
}).prefix('api/cms')

