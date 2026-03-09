const multer = require("multer");

const storage = multer.memoryStorage();

/*
const storage = multer.diskStorage({
    destination: (req, file, cb) = 
        cb(null, "uploads/"),
    filename: (req,file,cb) =
        cb(null, Date.now()+file.originalname)
});
*/

const upload = multer({
    storage: storage,
    fileFilter: (req,file,cb) =>{
        if(file.mimetype == "png" ||
            file.mimetype == "jpg"
        ){
            file.filename += Date.now().toString();
            cb(null,true);
        }
        else{
            console.log("only png or jpg");
            cb(null,true);
        }
    },
    limits: {
        fileSize: 1024 * 1024*8
    }
});

module.exports = upload;