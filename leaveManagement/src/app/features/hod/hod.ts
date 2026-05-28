import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HodService } from '../../../core/services/hodService';
import { SHARED_IMPORTS } from '../../../core/shared/sharedModule';

@Component({
  selector: 'app-hod',
  imports: [SHARED_IMPORTS],
  templateUrl: './hod.html',
  styleUrl: './hod.scss',
})
export class Hod implements OnInit {

  constructor(private http: HttpClient, private hodService: HodService, private cdr: ChangeDetectorRef  ) { }
  leaveList: any[] = [];
  totalLeaveDays: any
  ngOnInit() {
    this.fetchAllLeaves();
  }

  fetchAllLeaves() {
    this.hodService.getAllLeaves().subscribe({
      next: (leaves:any) => {
        this.leaveList = leaves.data;
      
        this.cdr.detectChanges(); 
        console.log('Fetched leaves:', leaves);
      },
      error: (error) => {
        console.error('Error fetching leaves:', error);
      }
    }); 
  }
  approveLeave(leaveId: string) {
    this.hodService.approveLeave(leaveId).subscribe({
      next: (response) => {
        console.log('Leave approved:', response);
        this.fetchAllLeaves(); 
      },
      error: (error) => {
        console.error('Error approving leave:', error);
      }
    });
  }
  rejectLeave(leaveId: string) {
    this.hodService.rejectLeave(leaveId).subscribe({
      next: (response) => {
        console.log('Leave rejected:', response);
        this.fetchAllLeaves(); 
      },
      error: (error) => {
        console.error('Error rejecting leave:', error);
      }
    });
  }

  logout() {
    localStorage.clear();
    window.location.href = '/auth/login';
  }
}