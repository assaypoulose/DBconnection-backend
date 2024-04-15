exports.isAdmin = (req, res, next) => {
    console.log('Req.Profile:', req.profile);
    console.log('Admin is hit!')
    const admin = (req.profile.role === 1);

    if(!admin){
        return res.status(401).send({message: 'Access Denied! Admin Resource'})
    }

    next();
};

exports.isContentCreator = (req, res, next) => {
    console.log('Req.Profile:', req.profile);
    console.log('Content creator is hit!')
    const contentCreator = (req.profile.role === 2);

    if(!contentCreator){
        return res.status(401).send({message: 'Access Denied! Content creator Resource'})
    }

    next();
};