import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { share } from 'rxjs';
import { SHARED_IMPORTS } from '../../sharedModule';

@Component({
  selector: 'app-leave-dialog',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './leave-dialogue.html',
  styleUrls: ['./leave-dialogue.scss']
})
export class LeaveDialogueComponent {

  @Input() isOpen: boolean = false;

  @Output() closeDialog = new EventEmitter<void>();
  @Output() submitLeave = new EventEmitter<any>();

  leaveData = {
    fromDate: '',
    toDate: '',
    reason: ''
  };

  onCancel() {
    this.closeDialog.emit();
  }

  onSubmit() {

    if (
      !this.leaveData.fromDate ||
      !this.leaveData.toDate ||
      !this.leaveData.reason
    ) {
      alert('Please fill all fields');
      return;
    }

    this.submitLeave.emit(this.leaveData);

    this.leaveData = {
      fromDate: '',
      toDate: '',
      reason: ''
    };

    this.closeDialog.emit();
  }
}