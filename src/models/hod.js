import mongoose from "mongoose";

    const hodSchema =new mongoose.Schema ({
        role: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        contact: { type: String, required: true },
        department: { type: String, required: true },
        userName: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    })

const HOD = mongoose.model("HOD", hodSchema)

export default HOD