const express = require('express')
const FrontController = require('../controller/FrontController')
const AdminController = require('../controller/admin/AdminController')
const route = express.Router()
const checkAuth = require('../middleware/auth')
const CourseController = require('../controller/CourseController')
const adminrole = require('../middleware/admin_role')
const isLogin = require('../middleware/islogin')



//User Routing
route.get('/home', checkAuth, FrontController.home)
route.get('/about', checkAuth, FrontController.about)
route.get('/', isLogin, FrontController.login)
route.get('/register', FrontController.register)
route.get('/contact', checkAuth, FrontController.contact)

//insert Data
route.post('/insertStudent', FrontController.studentInsert)
//verifylogin
route.post('/verifyLogin', FrontController.verifyLogin)
route.get('/logout', FrontController.logout)
//Profile
route.get('/profile', checkAuth, FrontController.profile)
//change password
route.post('/changePassword', checkAuth, FrontController.changePassword)
//
route.post('/updateProfile', checkAuth, FrontController.updateProfile)
//Admin Routing
route.get('/admin/dashboard', checkAuth, adminrole('admin'), AdminController.dashboard)
route.get('/admin/studentDisplay', checkAuth, adminrole('admin'), AdminController.studentDisplay)
route.get('/admin/studentView/:id', checkAuth, adminrole('admin'), AdminController.studentView) //id bhi bheje/:id laga ke
route.get('/admin/studentDelete/:id', checkAuth, adminrole('admin'), AdminController.studentDelete)
route.get('/admin/studentEdit/:id', checkAuth, adminrole('admin'), AdminController.studentEdit) //for get the data
route.post('/admin/studentUpdate/:id', checkAuth, adminrole('admin'), AdminController.studentUpdate) //for update the post to model
route.post('/admin/insertStudent', checkAuth, adminrole('admin'), AdminController.studentInsert)
route.get('/admin/courseDisplay', checkAuth, adminrole('admin'), AdminController.courseDisplay)
route.post('/update_status/:id', checkAuth, adminrole('admin'), AdminController.update_status)
// course
route.post('/course_insert', checkAuth, CourseController.courseinsert)
route.get('/coursedisplay', checkAuth, CourseController.coursedisplay)
route.get("/courseView/:id", checkAuth, CourseController.courseView)
route.get("/courseEdit/:id", checkAuth, CourseController.courseEdit)
route.get("/courseDelete/:id", checkAuth, CourseController.courseDelete)
route.post("/courseUpdate/:id", checkAuth, CourseController.courseUpdate)

// forget password
route.post('/forgot_Password', FrontController.forgetPasswordVerify)
route.get('/reset-password', FrontController.reset_Password)
route.post('/reset_Password1', FrontController.reset_Password1)

//varify email
route.get('/verify', FrontController.verifyMail)


module.exports = route