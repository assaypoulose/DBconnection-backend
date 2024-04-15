exports.isAdmin = (req, res, next) => {
    const admin = req.profile.role === 1;
    console.log('Req.Profile:', req.profile);
    console.log('Admin is hit!')

    if(!admin){
        return res.status(401).send({message: 'Access Denied! Admin Resource'})
    }

    next();
};

exports.isContentCreator = (req, res, next) => {
    const contentCreator = req.profile.role === 2;
    console.log('Req.Profile:', req.profile);
    console.log('Content creator is hit!')

    if(!contentCreator){
        return res.status(401).send({message: 'Access Denied! Content creator Resource'})
    }

    next();
};