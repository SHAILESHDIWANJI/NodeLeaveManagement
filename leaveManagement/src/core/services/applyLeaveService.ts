import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApplyLeaveService {

    constructor(private http: HttpClient) { }

    applyLeave(employeeId: string, leaveData: any) {
        const payload = {
            employeeId,
            ...leaveData
        };
        console.log("Applying leave for employeeId:", employeeId, "with data:", leaveData);
        return this.http.post(`http://localhost:5500/employee/${employeeId}/applyLeave`, payload);
    }

    getEmployeeLeaves(employeeId: string) {
        return this.http.get(`http://localhost:5500/employee/employeeLeave/${employeeId}`);
    }
}