import Staff from "../models/employee.js";
import HOD from "../models/hod.js";
import bcrypt from "bcryptjs";
import EmployeeLeave from "../models/employeeleave.js";

export const registerUserService = async (data) => {
  console.log("Data in service", data);
  const existingStaff = await Staff.findOne({ email: data.email });
  const existingHOD = await HOD.findOne({ email: data.email });
  if (existingStaff || existingHOD) {
    throw new Error("User already exists with this email");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  if (data.role === "Staff") {
    const user = new Staff({
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contact: data.contact,
      department: data.department,
      userName: data.userName,
      password: hashedPassword,
    });
    await user.save();
    return user;
  }
  if (data.role === "HOD") {
    const hod = new HOD({
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contact: data.contact,
      department: data.department,
      userName: data.userName,
      password: hashedPassword,
    });
    await hod.save();
    return hod;
  }
};


export const loginUserService = async (userName, password) => {
  const user = await Staff.findOne({ userName }) || await HOD.findOne({ userName });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  return user;
};

export const getAllEmployeesService = async () => {
  const employees = await Staff.find();
  return employees;
}

export const getAllLeavesService = async () => {
  const leaves = await EmployeeLeave.find()
  return leaves;
}

export const applyLeaveService = async (employeeId, leaveData) => {
  console.log("Applying leave for employeeId:", employeeId, "with data:", leaveData);
  const employee = await Staff.findById(employeeId);
  console.log("Found employee:", employee);
  if (!employee) {
    throw new Error("Employee not found");
  }
  
  const startDate = new Date(leaveData.startDate);
  const endDate = new Date(leaveData.endDate);
  const totalLeaveDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  const leave = new EmployeeLeave({
    userId: employee._id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    startDate: leaveData.startDate,
    endDate: leaveData.endDate,
    reason: leaveData.reason,
    totalLeaveDays: totalLeaveDays,
  });
  console.log("Created leave object:", leave);
  await leave.save();
  return leave;
};

export const approveLeaveService = async (leaveId) => {
  const leave = await EmployeeLeave.findById(leaveId);
  if (!leave) {
    throw new Error("Leave request not found");
  }
  leave.status = "approved";
  await leave.save();
  return leave;
};

export const rejectLeaveService = async (leaveId) => {
  const leave = await EmployeeLeave.findById(leaveId);
  if (!leave) {
    throw new Error("Leave request not found");
  }
  leave.status = "rejected";
  await leave.save();
  return leave;
};

export const getEmployeeLeavesService = async (employeeId) => {
  const leaves = await EmployeeLeave.find({ userId: employeeId });
  return leaves;
}