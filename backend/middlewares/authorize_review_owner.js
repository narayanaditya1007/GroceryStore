
const Reviews = require('../models/Reviews');

const authorize_reviewer = async(req,res,next) =>{
    try{

        const review =await Reviews.findById(req.body.reviewId);
        // console.log(review);
        // console.log(req.body);
        if(req.body.UserId.equals( review.user_id)){
            next();
        }
        else{
            throw Error("Not original Reviewer");
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports = authorize_reviewer;