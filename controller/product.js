const Product = require('../schema/productSchema.js');

const connectDB = require('../config/database_init.js');
const COLLECTION = "productos";

class ProductController {
    constructor() {
    }

    async createProduct(req, res) {
        try {
            const db = await connectDB;
            console.log("req.file.buffer != null");
            console.log(req.file == null);

            var product = new Product({
                name: req.body.name,
                price: req.body.price,
                kg: req.body.kg,
                img: req.file != null ? req.file.buffer : null
            })

            const result2 = await product.save();
            res.json({
                message: "Productoooo " + req.body.name + " añadido con exito"
            });

            //const result = await myProducts.insertOne(product);
            //await connectDB.hostMongo.close();
            /*
            res.json({
                message: 'Producto creado',
                id: result.insertedId
            });
            */

        } catch (error) {
            res.json({
                message: 'Error al crear productoooooo',
                error: error.message
            });
        }
    };

    async addFile(req, res) {
        var db = connectDB.connection();

        var collection = db.collection("productos");

        var query = {
            $set: { "Foto": 123 }
        }
        try {
            collection.updateMany({ name: req.nameProduct }, query);

            res.send.status(201).json({
                msg: "Foto establecida con exito en el producto ${req.nameProduct}"
            });
        }
        catch {
            res.send.status(500).json({
                msg: "Error with uploading the file in mongo db"
            });
        }

    }


    async insertFile(req, res) {
        var imgFile = (req.files != null && req.files.length > 0) ? req.files[0] : null; //img
        var codeBarFile = (req.files != null && req.files.length > 1) ? req.file[1] : null; //codebar
        var nameProduct = req.params.name;
        
        //Esto no es necesario, trabajo sobre el modelo de datos, no la instancia
        /*
        var product = new Product({
            "img": imgFile,
            "codeBar": codeBarFile
        })*/
        try {
            const filter = { name: nameProduct };
            const update = {
                $set: {
                    img: imgFile?.buffer,
                    codeBar: codeBarFile?.buffer
                }
            }

            const result = await Product.findOneAndUpdate(filter, update, { new: true });

            const fileReferences = req.files.map(file => ({
                originalname: file.originalname,
                filename: nameProduct,
            }));

            res.status(200).json(
                {
                    msg: result,
                    files: fileReferences
                }
            )
        }
        catch (err) {
            res.json({
                msg: err.message
            });
        }

    }
}

module.exports = new ProductController()