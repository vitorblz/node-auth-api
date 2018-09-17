const UserDAO = require('../persistence/UserDAO');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connectionFactory = require('../persistence/connectionFactory');
const jwtSecret = process.env.JWT_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

module.exports = app => {
    app.post('/user/create', verifyToken, (req, res)=>{

        var user = req.body;
    
        bcrypt.hash(user.password, saltRounds).then((hash)=>{
    
            user.password = hash;
            const connection = connectionFactory();
            var userConnection = new UserDAO(connection);
        
            userConnection.save(user, (error,result)=>{
                if(error){
                    console.log("Can not create user. Error: "+JSON.stringify(error));
                    return res.status(500)
                        .send("Can not create user.");
                }
                
                return res.status(201).send("User created!");
            });
        }).catch((error)=>{
            res.send("Can not create hash! Error: "+error);  
        });
    });
    
    app.post('/api/login',(req, res)=>{
        const loginRequest = req.body; 

        const connection = connectionFactory();
        var userConnection = new UserDAO(connection);
        userConnection.getByLogin(loginRequest.username,  (error,user)=>{
            if(error)
            {
                console.log("Can not auth user. Error: "+JSON.stringify(error));
                return res.status(500).send("Can not auth user.");
            }

            if(user.length == 0)
            {
                console.log("Invalid user or password.");
                return res.status(403).send("Invalid user or password.");
            }

            bcrypt.compare(loginRequest.password, user[0].password, function(err, test) {
                if(test == false)
                {
                    console.log("Invalid user or password.");
                    return res.status(403).send("Invalid user or password.");
                }
                
                const token = jwt.sign({data: loginRequest.username}, jwtSecret, { expiresIn: '24h' });
                res.json(token);
            });
              
        });
    });

    app.get('/', (req, res)=>{
        console.log(req.body.name);
        res.json({api: 'Auth API'});
    });
}

function verifyToken(req, res, next){
    if(req.headers.authorization == undefined)
        return res.status('403').send('Is necessary inform Authorization Header with JWT.');

    const token = req.headers.authorization.split(" ");
    
    if(token[1] == undefined)
        return res.status('403').send('Token not found');
        
    jwt.verify(token[1],jwtSecret, (error, authPayload) => {
        if(error)
            return res.status('403').send('Failed to authenticate token.'); 
        req.data = authPayload;
        next();
    });
}