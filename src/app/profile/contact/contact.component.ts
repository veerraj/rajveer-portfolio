import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { SnotifyService } from 'ng-snotify';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
 

  contactForm:FormGroup;
  constructor(private fb:FormBuilder,private profileService:ProfileService,
    private toastr:ToastrService){}

  ngOnInit() {
      this.initForm();
     }

  initForm(){
    this.contactForm = this.fb.group({
        name:['',Validators.required],
        _subject:['',Validators.required],
        _replyto:['',[Validators.required,Validators.email]],
        message:['',[Validators.required,Validators.minLength(20)]]
    })
  }


  submitForm(){
     this.profileService.formSubmit(this.contactForm.value).subscribe((res)=>{
         this.contactForm.reset();
         this.toastr.success('successfully sent', 'I will get back to you soon !');
     })   
  }



}
