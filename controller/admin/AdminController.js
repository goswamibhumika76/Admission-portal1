const CourseModel = require('../../models/course');
const UserModel = require('../../models/user')
const nodemailer = require('nodemailer')
class AdminController{

    static dashboard = async(req,res) =>{
        try {
            const { name, image,} = req.userdata;
            res.render('admin/dashboard',{n:name,i:image})
        } catch (error) {
            console.log(error)
        }
    }

    static studentDisplay = async(req,res)=>{
        try {
            const data = await UserModel.find()
            // console.log(data)
            res.render('admin/studentDisplay',{d:data })//d:data se data ko pass krege 
        } catch (error) {
            console.log(error)
        }
    }

    static studentView = async(req,res)=>{
        try {
           // console.log(req.params.id)//id ko get krega web waali id se
           const id = req.params.id
           const data = await UserModel.findById(id)
           res.render('admin/studentView',{d:data})
           //console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    static studentDelete = async(req,res)=>{
        try {
            const id = req.params.id
            const data = await UserModel.findByIdAndDelete(id)
            res.redirect('/admin/studentDisplay')
        } catch (error) {
            
        }
    }

    //update ke liye pehle data ko display edit method call hua hai karayege then update karayege
    static studentEdit = async(req,res)=>{
        try {
           // console.log(req.params.id)//id ko get krega web waali id se
           const id = req.params.id
           const data = await UserModel.findById(id)
           res.render('admin/studentEdit',{d:data})
           //console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    static studentUpdate = async(req,res)=>{
        try {
           console.log(req.body)
            let id = req.params.id //id get krke update kr diya jo req.body me aaya hai
             const {name,email,password} = req.body
             await UserModel.findByIdAndUpdate(id,{
                name,
                email,
                password
             })
             res.redirect('/admin/studentDisplay')
        } catch (error) {
            
        }
    }

    static studentInsert = async(req,res)=>{
        try {
            const {name,email,password} = req.body
            await UserModel.create({
                name,
                email,
                password
            })
            res.redirect('/admin/studentDisplay')
        } catch (error) {
            console.log(error)
        }
    }

    static courseDisplay = async (req,res) => {
        try {
            const {name, image } = req.userdata
            const course = await CourseModel.find()
            res.render('admin/courseDisplay',{c:course, n:name, i:image })
        } catch (error) {
            console.log(error)
        }
    }

    static update_status = async(req,res)=>{
        try {
           //console.log(req.body)
            let id = req.params.id 
             const {name, email, status, comment ,course } = req.body
             await CourseModel.findByIdAndUpdate(id,{
               status,
               comment,
             })
              this.sendEmail(name,email,course,status,comment)
             res.redirect('/admin/courseDisplay')
        } catch (error) {
            console.log(error)
        }
    }

    static sendEmail = async (name, email,course,status,comment) => {
        // console.log(name,email,course)
         // connenct with the smtp server
     
         let transporter = await nodemailer.createTransport({
           host: "smtp.gmail.com",
           port: 587,
     
           auth: {
             user: "bhumikagoswami913@gmail.com",
             pass: "aqav ktvm upxg lwzy",
           },
         });
         let info = await transporter.sendMail({
             from: "test@gmail.com", // sender address
             to: email, // list of receivers
             subject: ` Course ${course} ${status}`, // Subject line
             text: "heelo", // plain text body
             html: `<b>${name}</b> Course  <b>${course} ${status} </b>  ${comment}  <br>
              `, // html body
         });
       };
}

module.exports = AdminController