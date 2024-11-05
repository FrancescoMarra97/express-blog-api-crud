const { title } = require('process')
const posts = require('../db/db.js')
const fs = require('fs')

const show = (req, res) => {
    const slug = req.params.slug

    const post = posts.find((post) => post.slug === slug)

    if (!post) {
        return res.status(404).json({
            message: '404! not found'
        })
    }

    res.status(200).json(post)
}

const index = (req, res) => {
    let html = '<ul>'
    posts.forEach((post) => {
        html += `
		<li>
			<h2>${post.title}</h2>
            <img src="/imgs/posts/${post.image}" alt="${post.title}">
            <p>${post.content}</p>           
            ${post.tags.join(', ')}
		</li>
		`
    })
    html += '</ul>'
    res.send(html)
}

const store = (req, res) => {
    console.log(req.body);
    const post = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    posts.push(post)
    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)
    return res.status(201).json({
        status: 201,
        data: posts,
        count: posts.length
      })
}
module.exports = { show, index, store }