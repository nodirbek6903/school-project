const Event = require("../models/Event")

const getEvents = async(req,res) => {
    try {
        const events = await Event.find().sort({date:-1})

        const now = new Date()
        for(const event of events){
            if(event.date < now && event.status !== "completed"){
                event.status = "completed"
                await event.save()
            }else if(event.date >= now && event.status !== "upcoming"){
                event.status = "upcoming"
                await event.save()
            }
        }
        res.json(events)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

const getEventById = async(req,res) => {
    try {
        const event = await Event.findById(req.params.id)
        if(!event){
            return res.status(404).json({message:"Tadbir topilmadi"})
        }
        res.json(event)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error: error.message})
    }
}

const createEvent = async(req,res) => {
    try {
        const {title,description,date,location} = req.body

        const images = req.files ? req.files.map((file) => file.filename) : []

        const now = new Date(date)
        const status = now < new Date() ? "completed" : "upcoming"

        const event = new Event({
            title,
            description,
            date,
            location,
            images,
            status
        })

        const createdEvent = await event.save()
        res.status(201).json(createdEvent)
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: err.message });
    }
}

const updateEvent = async(req,res) => {
    try {
        const {title,description,date,location} = req.body
        const event = await Event.findById(req.params.id)
        if(!event){
            return res.status(404).json({message:"Tadbir topilmadi"})
        }
        event.title = title || event.title
        event.description = description || event.description
        event.date = date || event.date
        event.location = location || event.location
        if(req.files && req.files.length > 0){
            event.images = [...event.images, ...req.files.map((f) => f.filename)]
        }

        const now = new Date(event.date)
        event.status = now < new Date() ? "completed" : "upcoming"

        const updatedEvent = await event.save()
        res.json(updatedEvent)
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: err.message });
    }
}

const deleteEvent = async (req,res) => {
    try {
        const event = await Event.findById(req.params.id)
        if(!event){
            return res.status(404).json({message:"Tadbir topilmadi"})
        }
        await event.deleteOne()
        res.json({message:"Tadbir o'chirildi"})
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

module.exports = {createEvent,getEvents,getEventById,updateEvent,deleteEvent}