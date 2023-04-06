const { response } = require("express");
const Evento = require("../models/Evento");

const getEvents = async( req, res = response) => {
    
    const events = await Evento.find().populate('user','name')

    res.json({
        ok: true,
        events
    })

}
const createEvent = async( req, res = response) => {

    const evento = new Evento( req.body );
    
    try {

        evento.user = req.uid;

        const eventSaved = await evento.save()

        res.json({
            ok: true,
            evento: eventSaved
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}
const updateEvent = async( req, res = response) => {
    
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Evento.findById( eventId )

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'id wrong'
            })
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg:'You cannot to edit this event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const eventUpdated = await Evento.findByIdAndUpdate( eventId, newEvent, { new: true } )

        res.json({
            ok: true,
            evento: eventUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk to the admin'
        })
    }
}
const deleteEvent = async( req, res = response) => {
    
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Evento.findById( eventId )

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'id wrong'
            })
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg:'You cannot to delete this event'
            })
        }

        await Evento.findByIdAndDelete( eventId )

        res.json({
            ok: true,
            msg: 'Event deleted successfully',
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'talk to the admin'
        })
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}