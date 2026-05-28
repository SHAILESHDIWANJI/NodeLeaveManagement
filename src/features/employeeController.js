import Staff from "../models/employee.js";
import { registerUserService ,loginUserService, getAllEmployeesService, applyLeaveService, getAllLeavesService, approveLeaveService, rejectLeaveService, getEmployeeLeavesService } from "./employeeService.js";

export const registerEmployee = async(req,res)=>{
    try {
        const user = await registerUserService(req.body);
        res.status(201).json({message: 'User registered successfully', data: user});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const loginEmployee = async(req,res, next)=>{
    try {
        const { userName, password } = req.body;
        const user = await loginUserService(userName, password);
        res.status(200).json({message: "Login successful", data: user});
    } catch (error) {
        next(error);
    }
}

export const getAllEmployees = async(req,res, next)=>{
    try {
        const employees = await getAllEmployeesService();
        res.status(200).json({message: 'Employees fetched successfully', data: employees});
    } catch (error) {
       next(error);
    }
}

export const getAllLeaves = async(req,res, next)=>{
    try {
        const leaves = await getAllLeavesService();
        res.status(200).json({message: 'Leaves fetched successfully', data: leaves});
    } catch (error) {
       next(error);
    }
}

export const applyLeave = async(req,res, next)=>{
    try {
        const employeeId = req.params.employeeId;
        console.log("Received apply leave request with body:", req.body);
        const { reason, startDate, endDate } = req.body;
        const leave = await applyLeaveService(employeeId, { reason, startDate, endDate });
        res.status(201).json({message: 'Leave applied successfully', data: leave});
    } catch (error) {
       next(error);
    }
}

export const approveLeave = async(req,res, next)=>{
    try {
        const leaveId = req.params.leaveId;
        const leave = await approveLeaveService(leaveId);
        res.status(200).json({message: 'Leave approved successfully', data: leave});
    } catch (error) {
       next(error);
    }
}

export const rejectLeave = async(req,res, next)=>{
    try {
        const leaveId = req.params.leaveId;
        const leave = await rejectLeaveService(leaveId);
        res.status(200).json({message: 'Leave rejected successfully', data: leave});
    } catch (error) {
       next(error);
    }
}

export const getEmployeeLeaves = async(req,res, next)=>{
    try {
        const employeeId = req.params.employeeId;
        const leaves = await getEmployeeLeavesService(employeeId);
        res.status(200).json({message: 'Employee leaves fetched successfully', data: leaves});
    } catch (error) {
       next(error);
    }
}
