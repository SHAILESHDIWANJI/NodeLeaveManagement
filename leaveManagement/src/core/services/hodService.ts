import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HodService {
   constructor(private http: HttpClient) { }

   getHodDetails() {
       // Logic to get HOD details
   }

   getAllLeaves() {
       return this.http.get('http://localhost:5500/employee/allLeaves');
   }

   approveLeave(leaveId: string) {
       return this.http.patch(`http://localhost:5500/employee/approveLeave/${leaveId}`, {});
   }

   rejectLeave(leaveId: string) {
       return this.http.patch(`http://localhost:5500/employee/rejectLeave/${leaveId}`, {});
   }
}
