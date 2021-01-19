const Personne = require('../models/person');

exports.getPersons = async (req, res, next) => {
    console.log(req.query);
    
    const filter = req.query.filter;

    console.log(filter);
    try {
        const result = await Personne.find({"nom": new RegExp(filter)}) // .find({"nom":/.*jel.*/})
        res.status(200).json(result)
    } catch(err) {
        console.log(err);
    }
    
}

exports.createPerson = async (req, res, next) => {
    //console.log(req.body);
    const prenom = req.body.prenom;
    const nom = req.body.nom;
    const age = req.body.age;
    const profession = req.body.profession;
    const avatar = req.body.avatar;
    const status = req.body.status;

    const person = new Personne({
        prenom : prenom,
        nom : nom,
        age : age,
        profession : profession,
        avatar : avatar,
        status : status
    });

    try {
        const result = await person.save();
        console.log(result);
        res.status(201).json({ //201 success a ressource was created 
                message : 'New Person created successfully',
                prenom : prenom,
                nom : nom,
                id : result._id.toString()
            });
    } catch(err) {
        console.log(err)
    }
   
}

exports.getPerson = (req, res, next) => {
    const pId = req.params.personId;

    Personne
    .findById(pId)
    .then(p => {
        if(!p) {
            const error = new Error('Could not find this person');
            //error.message = "Verify your person ID"
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(p)
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
}

exports.updatePerson = (req, res, next) => {
    const pId = req.params.personId;

    const prenom = req.body.prenom;
    const nom = req.body.nom;
    const age = req.body.age;
    const profession = req.body.profession;
    const avatar = req.body.avatar;
    const status = req.body.status;


    Personne.findById(pId)
    .then(p => {
        if(!p) {
            const error = new Error('Could not find person');
            error.statusCode = 404;
            throw error;
        }
        p.nom = nom;
        p.prenom = prenom;
        p.age = age;
        p.profession = profession;
        p.avatar = avatar;
        p.status = status;

        return p.save();
    })
    .then(result => {
        res.status(200).json({
            message : 'Person updated',
            result : result
        });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
}

exports.deletePerson = (req, res, next) => {
    const pId = req.params.personId;
    Personne.findByIdAndRemove(pId)
        .then(p => {
            if(!p) {
                const error = new Error('Could not find post');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message : 'Deleted Person !', result : p})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

// exports.getPersonByName = (req, res) => {


// }

// constructor(public id: number,
//     public prenom: string,
//     public nom : string,
//     public age: number,
//     public profession : string,
//     public avatar?: string,
//     public status?: string) {