const { Router } = require("express");
const { check } = require("express-validator");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Pasar todas por validacion del JWT
router.use( validarJWT );

// Obtener eventos
router.get('/',getEvents
);

// Crear evento
router.post('/',
    [   
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','La fecha de inicio es obligatoria').custom( isDate ),
        check('end','La fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    createEvent
);

//Actualizar evento
router.put('/:id',
    [   
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','La fecha de inicio es obligatoria').custom( isDate ),
        check('end','La fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ]
    ,updateEvent
);

//Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;