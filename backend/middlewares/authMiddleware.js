import JWT from 'jsonwebtoken'

export const requireSignIn = async (req,res,next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_KEY
        );
        req.user=decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

//admin access
export const isAdmin = async(req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role!=1){
            return res.status(401).send({
                success: false,
                message: "Unauthorized access",
            })
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware" ,
        })
    }
}