import mongoose from "mongoose";


const employeeLeaveSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    fullName: { type: String, required: true },
    startDate: { type: String, required: true },  
    endDate: { type: String, required: true },
    totalLeaveDays: { type: Number, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending' },
});

const EmployeeLeave = mongoose.model("EmployeeLeave", employeeLeaveSchema);

export default EmployeeLeave;