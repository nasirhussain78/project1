const express = require('express');
const authorController= require('../controllers/authorController')
const blogController= require('../controllers/blogController')
const loginController= require('../controllers/loginController');
const { authentication, authorisation } = require('../middleware/middleware');



const router = express.Router();


// Auhtor creation 
router.post('/createAuthor',authorController.createAuthor);

//Login 
router.post('/login', loginController.login);

//Blog creation
router.post('/createBlog',authentication, blogController.createBlog);

// All blogs
router.get('/getblogs',authentication, blogController.getBlogs);

// Update by blogid
router.put('/blogs/:blogId' ,authentication,authorisation,blogController.updateBlogs);

// deleteBlogById
router.delete('/deleteBlogById/:blogId', authentication,authorisation,blogController.deleteBlogByid);

//deleteBlogByQuerCondition
router.delete('/deleteBlogByQuerCondition',authentication,authorisation, blogController.deleteBlogByQuerCondition);

module.exports = router;