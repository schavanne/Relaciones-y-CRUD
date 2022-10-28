const { check } = require("express-validator")

module.exports = [
    check("first_name")
        .notEmpty().withMessage("Debes ingresar un nombre").bail(),
    check("last_name")
        .notEmpty().withMessage("Debes ingresar un apellido").bail(),
    check("rating")
        .notEmpty().withMessage("Debes ingresar un rating").bail()
        .isFloat({ min: 1, max: 10}).withMessage('Entre 1 y 10'),
    check("favorite_movie_id")
        .notEmpty().withMessage("Debes seleccionar una pelicula favorita").bail()

]