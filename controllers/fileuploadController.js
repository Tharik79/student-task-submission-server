const res = require("express/lib/response");
const SingleFile = require('../models/singlefile');

const singleFileUpload = async( req, res, next) => {

    try{
        
        const file = new SingleFile({
            fileName: req.file.originalName,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        });
        await file.save();
        console.log(file);
        res.status(201).send('File Uploaded Successfully');
    } catch(error) {
        res.status(400).send(error.message);
    }
}

    // getting all single files
        getallSingleFiles = async(req, res, next) => {
            try{
                const files = await SingleFile.find();
                res.status(200).send(files);
            } catch(error){
                res.status(400).send(error.message);
            }
        }

        // sizes of files
    const fileSizeFormatter = (bytes, decimal) => {
        if(bytes === 0){
            return '0 Bytes';

        }
        const dm = decimal || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
        const index = Math.floor(Math.log(bytes)/ Math.log(1000));
        return parseFloat((bytes/ Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index];
    }

            module.exports = {singleFileUpload, getallSingleFiles}