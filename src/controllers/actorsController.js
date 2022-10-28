const db = require('../database/models');
const sequelize = db.sequelize;
const moment = require('moment');
const { validationResult } = require("express-validator");


const actorsController = {
    'list': (req, res) => {
        db.Actor.findAll()
            .then(actors => {
                res.render('actorsList.ejs', {actors})
            })
    },
    'detail': (req, res) => {
        let list_movies = db.Movie.findAll({
            order :['title']
        });
        let act = db.Actor.findByPk(req.params.id,{
            include : [
                {
                    association : 'peliculas'
                }
            ]
        });
        Promise.all([act,list_movies])
            .then(([actor,movies]) => {
                res.render('actorsDetail.ejs', {actor,movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        db.Movie.findAll({
            order :['title']
        })
            .then(movies => {
                return res.render('actorsAdd',{
                    movies
                })
        })
        .catch(error => console.log(error))
    },
    store: function (req,res) {
        let errors = validationResult(req)
        errors = errors.mapped()

        if (Object.entries(errors).length === 0) {
        db.Actor.create({
             ...req.body,
            first_name : req.body.first_name.trim(),
            last_name : req.body.last_name.trim()
        })
            .then(newActor => {
                console.log(newActor)
                return res.redirect('/actors/detail/' + newActor.id)
            })
            .catch(error => console.log(error))
        }
        else {
            db.Movie.findAll({
                order :['title']
            })
                .then(movies => {
                    return res.render('actorsAdd',{
                        movies,
                        errors,
                        old: req.body,
                    })
            })
            .catch(error => console.log(error))
        }
    },
    edit: function(req,res) {
        let act = db.Actor.findByPk(req.params.id);
        let list_movie = db.Movie.findAll({
            order :['title']
        });
        Promise.all([act,list_movie])
            .then(([actor,movies]) => {
                return res.render('actorsEdit',{
                    Actor: actor,
                    movies,
                    moment
                })
            })
            .catch(error => console.log(error))
    },
    update: function (req,res) {
        let errors = validationResult(req)
        errors = errors.mapped()

        if (Object.entries(errors).length === 0) {
            db.Actor.update(
                {
                    ...req.body
                },
                {
                    where : {
                        id : req.params.id
                    }
                }
            )
                .then(result => {
                    return res.redirect('/actors/detail/' + req.params.id)
                })
                .catch(error => console.log(error))
            } else {
                let act = db.Actor.findByPk(req.params.id);
                let list_movie = db.Movie.findAll({
                    order :['title']
                });
                Promise.all([act,list_movie])
                    .then(([actor,movies]) => {
                        console.log(actor);

                        return res.render('actorsEdit',{
                            Actor: actor,
                            movies,
                            moment,
                            errors
                        });
                    })
                    .catch(error => console.log(error))
        }
    },
    delete: function (req,res) {
        db.Actor.findByPk(req.params.id)
            .then(actor => {
                return res.render('actorsDelete',{
                    Actor : actor
                })
            })
            .catch(error => console.log(error))
    },
    destroy: function (req,res) {
        db.Actor.destroy({
            where : {
                id : req.params.id
            }
        })
            .then(result => {
                return res.redirect('/actors')
            })
            .catch(error => console.log(error))
    }
}

module.exports = actorsController;
