import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../core/shared/sharedModule';
import { LeaveDialogueComponent } from '../../../core/shared/component/leave-dialogue/leave-dialogue';
import { HttpClient } from '@angular/common/http';
import { ApplyLeaveService } from '../../../core/services/applyLeaveService';

@Component({
  selector: 'app-staff',
  imports: [SHARED_IMPORTS, LeaveDialogueComponent],
  templateUrl: './staff.html',
  styleUrl: './staff.scss',
})
export class Staff implements OnInit {
  constructor(
    private http: HttpClient,
    private applyLeaveService: ApplyLeaveService,
    private cdr: ChangeDetectorRef,
  ) {}
  applyLeaveOpen: boolean = false;
  isOpen: boolean = false;
  leaveList: any[] = [];
  totalLeaves = 0;
  approvedLeaves = 0;
  rejectedLeaves = 0;

  applyLeave() {
    this.isOpen = true;
  }

  ngOnInit() {
    this.getEmployeeLeaves();
  }

  handleLeaveSubmit(leaveData: any) {
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    const data = {
      startDate: leaveData?.fromDate,
      endDate: leaveData?.toDate,
      reason: leaveData?.reason,
    };
    this.applyLeaveService.applyLeave(userId!, data).subscribe({
      next: (response) => {
        this.getEmployeeLeaves();
        console.log('Leave applied successfully', response);
      },
      error: (error) => {
        console.error('Error applying leave', error);
      },
    });
    this.isOpen = false;
  }

  handleLeaveCancel() {
    this.isOpen = false;
  }

  getEmployeeLeaves() {
    const userId = localStorage.getItem('userId');
    this.applyLeaveService.getEmployeeLeaves(userId!).subscribe({
      next: (response: any) => {
        this.leaveList = response?.data;
        console.log('Fetched employee leaves:', this.leaveList);
        console.log('Employee leaves fetched successfully', response);
        this.totalLeaves = this.leaveList.length;

        this.approvedLeaves = this.leaveList.filter((leave) => leave.status === 'approved').length;

        this.rejectedLeaves = this.leaveList.filter((leave) => leave.status === 'rejected').length;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching employee leaves', error);
      },
    });
  }
}
