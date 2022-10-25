const { check } = require("express-validator")

module.exports = [
    check("title")
        .notEmpty().withMessage("Debes ingresar un titulo de pelicula").bail(),
    check("rating")
        .notEmpty().withMessage("Debes ingresar un rating").bail()
        .isFloat({ min: 1, max: 10}).withMessage('Entre 1 y 10'),
    check("awards")
        .notEmpty().withMessage("Debes ingresar cantidad de premios").bail()
        .isFloat({ min:0}).withMessage('Mayor o igual a 0'),
    check("release_date")
        .notEmpty().withMessage("Debes ingresar una fecha").bail(),
    check("length")
        .notEmpty().withMessage("Debes ingresar una duracion").bail()
        .isFloat({ min: 1}).withMessage('debe ser mayor a 0'),
    check("genre_id")
        .notEmpty().withMessage("Debes seleccionar un genero").bail()

]