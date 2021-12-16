const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          properties:
 *              _id:
 *                  type: ObjectId
 *                  description: Auto-generated Id of the category
 *              username:
 *                  type: string
 *                  description: Name of the user
 *              emai:
 *                  type: string
 *                  description: email of the user
 *              password:
 *                  type: string
 *                  description: password of the user
 *              passwordConf:
 *                  type: string
 *                  description: confirmation of the password
 *          example:
 *              _id: ObjectId(619ba7db50d64f6605a877ec)
 *              username: asd
 *              email: golshanjimee@gmail.com
 *              password: asd
 *              passwordConf: asd
 */


const schema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        passwordConf: {
            type: String,
            required: true
        }
    },    
    {versionKey: false}
);

const Schema = mongoose.model('user', schema);
module.exports = Schema

