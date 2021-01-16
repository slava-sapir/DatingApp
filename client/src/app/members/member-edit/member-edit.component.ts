import { ToastrService } from 'ngx-toastr';
import { MembersService } from './../../_services/members.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @HostListener('window: beforeunload', ['$event']) unloadNotification ($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  @ViewChild('editForm') editForm!: NgForm;
  member!: Member;
  user!: User;
  constructor(private accountService: AccountService,
              private memberService: MembersService,
              private toastrService: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user
    })
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user?.username).subscribe(member => {
      this.member = member;
    })
  }

  updateForm(){
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastrService.success('Profile update successfully!');
      this.editForm.reset(this.member);
    })
  }

}
