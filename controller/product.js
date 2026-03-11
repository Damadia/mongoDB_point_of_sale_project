const Product = require('../schema/productSchema.js');

const connectDB = require('../config/database_init.js');
const product = require('../schema/productSchema.js');
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

    async insertFile(req, res) {
        var imgFile = (req.files != null && req.files.length > 0) ? req.files[0] : null; //img
        var codeBarFile = (req.files != null && req.files.length > 1) ? req.files[1] : null; //codebar
        var nameProduct = req.body.name;
        //Esto no es necesario, trabajo sobre el modelo de datos, no la instancia
        /*
        var product = new Product({
            "img": imgFile,
            "codeBar": codeBarFile
        })*/
        try {
            const conection = await connectDB;

            const exist = await product.findOne({ name: nameProduct });
            if (!exist) {
                return res.status(404).json({
                    err: "Producto no hallado"
                })
            }
            const filter = { name: nameProduct };
            const update = {
                $set: {}
            };

            if (imgFile) update.$set.img = imgFile.buffer;
            if (codeBarFile) update.$set.barCode = codeBarFile.buffer;
            const result = await Product.findOneAndUpdate(filter, update, { new: true });

            const fileReferences = req.files?.map(file => ({
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

    async price300600(req, res) {
        try {
            const products = await Product.find({
                price: {
                    $gte: 300,
                    $lte: 600
                },
                "department.category": "ropa"
            });
            if (!products) {
                return res.status(404).json({
                    msg: "Ningún producto coincidió con la busqueda"
                })
            }
            return res.status(200).json({
                msg: "Estos fueron los productos hallados",
                query: products
            });

        }
        catch (err) {
            return res.status(500).json({
                err: err.message
            });
        }

    }

    async withExp(req, res) {
        try {
            const products = await Product.find({
                expDate: {
                    $ne: null,
                    $gt: new Date("2026-03-20")
                },
            },
                { _id: 0, name: 1, stock: 1, nutritionalInfo: 1, expDate: 1 }
            );
            if (!products) {
                return res.status(404).json({
                    msg: "Ningún producto coincidió con la busqueda"
                })
            }
            return res.status(200).json({
                msg: "Estos fueron los productos hallados",
                query: products
            });

        }
        catch (err) {
            return res.status(500).json({
                err: err.message
            });
        }
    }

    async lowStock(req, res) {
        try {
            const products = await Product.find({
                stock: {
                    $gt: 0,
                    $lt: 5
                },
                price: {
                    $gt: 3000
                }
            },
                {_id:0, name:1, stock:1, price:1});
            if (!products) {
                return res.status(404).json({
                    msg: "Ningún producto coincidió con la busqueda"
                })
            }
            return res.status(200).json({
                msg: "Estos fueron los productos hallados",
                query: products
            });

        }
        catch (err) {
            return res.status(500).json({
                err: err.message
            });
        }
    }

}

module.exports = new ProductController()