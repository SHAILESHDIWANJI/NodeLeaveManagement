import express from 'express';
import { registerEmployee, loginEmployee, getAllEmployees, applyLeave, getAllLeaves, approveLeave, rejectLeave,getEmployeeLeaves } from './employeeController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Employee route is working');
});

router.post('/register', registerEmployee)
router.post('/login', loginEmployee)
router.get('/allEmployees', getAllEmployees)
router.get('/allLeaves', getAllLeaves)
router.post('/:employeeId/applyLeave', applyLeave)
router.patch('/approveLeave/:leaveId', approveLeave)
router.patch('/rejectLeave/:leaveId', rejectLeave)
router.get('/employeeLeave/:employeeId', getEmployeeLeaves)

export default router;
