exports.postAvatar = (req, res, next) => {
    //console.log(filter);
    console.log(req.file);
    let fileName = req.file.originalname; //To save in DB 
    res.status(200).json({
        'message': 'Image uploaded successfully',
        'fileName': fileName
    });
}