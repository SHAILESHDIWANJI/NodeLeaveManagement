import mongoose  from "mongoose";


 const employeeSchema =new mongoose.Schema ({
    role: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: Number, required: true },
    department: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
 })

const Employee = mongoose.model("Staff", employeeSchema)

export default Employee