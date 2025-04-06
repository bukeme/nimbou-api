/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ChatsController = () => import('#controllers/chats_controller')
const ContentsController = () => import('#controllers/contents_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/api/chat', [ChatsController, 'chat'])

router
  .group(() => {
    router.post('', [ContentsController, 'create'])
    router.get('', [ContentsController, 'index'])
    router.put('/:id', [ContentsController, 'update'])
    router.delete('/:id', [ContentsController, 'destroy'])
  })
  .prefix('/api/content')
