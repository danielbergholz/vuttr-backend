'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tool = use('App/Models/Tool')

const Redis = use('Redis')

class ToolController {
  // LIST TOOLS
  async index ({ request, auth }) {
    const { tag, page = 1 } = request.get()

    const user = await auth.getUser()

    const query = Tool.query().where('user_id', user.id)

    let tools
    if (tag) {
      const lowerCasetag = tag.toLowerCase()
      tools = await query.where('tags', '@>', `{${lowerCasetag}}`).fetch()
    } else {
      const cachedTools = await Redis.get(`tools:user=${user.id}:page=${page}`)
      if (cachedTools) {
        return JSON.parse(cachedTools)
      } else {
        tools = await query.paginate(page, 5)
        await Redis.set(`tools:user=${user.id}:page=${page}`, JSON.stringify(tools))
      }
    }

    return tools
  }

  // CREATE TOOL
  async store ({ request, response, auth }) {
    const { title, link, description, tags } = request.post()

    if (!title || !link || !tags) {
      response.status(400).json({ error: "Missing 'title', 'link' or 'tags' on request body" })
      return
    }

    const user = await auth.getUser()

    const toolExists = await Tool.findBy({ title, user_id: user.id })

    if (toolExists) {
      response.status(400).json({ error: `Tool '${title}' already exists` })
      return
    }

    const lowerCasetags = tags.map(tag => tag.toLowerCase())

    const tool = await Tool.create({
      title: title.toLowerCase(), link, tags: lowerCasetags, description, user_id: user.id
    })

    Redis.keys(`tools:user=${user.id}:*`).then(function (keys) {
      var pipeline = Redis.pipeline()
      keys.forEach(function (key) {
        pipeline.unlink(key)
      })
      return pipeline.exec()
    })

    response.status(201)
    return tool
  }

  // UPDATE TOOL
  async update ({ request, response, auth }) {
    const { title, link, description, tags, id } = request.post()

    if (!id || !title) {
      response.status(400).json({ error: 'Missing "id" or "title" field on body' })
      return
    }

    const user = await auth.getUser()

    const tool = await Tool.find(id)

    if (tool.title !== title) {
      const toolExists = await Tool.findBy({ title, user_id: user.id })

      if (toolExists) {
        response.status(400).json({ error: `Tool '${title}' already exists` })
        return
      }
    }

    tool.title = title

    if (link) {
      tool.link = link
    }

    if (description) {
      tool.description = description
    }

    if (tags) {
      tool.tags = tags
    }

    await tool.save()

    Redis.keys(`tools:user=${user.id}:*`).then(function (keys) {
      var pipeline = Redis.pipeline()
      keys.forEach(function (key) {
        pipeline.unlink(key)
      })
      return pipeline.exec()
    })

    return tool
  }

  // DELETE TOOL
  async destroy ({ response, params, auth }) {
    const { id } = params

    const user = await auth.getUser()

    const tool = await Tool.findBy({ id, user_id: user.id })

    if (!tool) {
      response.status(400).json({ error: `Tool with id = '${id}' not found` })
      return
    }

    Redis.keys(`tools:user=${user.id}:*`).then(function (keys) {
      var pipeline = Redis.pipeline()
      keys.forEach(function (key) {
        pipeline.unlink(key)
      })
      return pipeline.exec()
    })

    await tool.delete()
  }
}

module.exports = ToolController
