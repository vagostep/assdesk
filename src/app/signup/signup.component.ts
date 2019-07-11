import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [
        SignupService
    ]
})
export class SignupComponent implements OnInit {
    
    public signupForm: FormGroup;
    public isLoading: boolean;

    constructor(private fb: FormBuilder,
                private signupService: SignupService,
                private router: Router) {
                    
        this.isLoading = false;
    }

    ngOnInit() { 

        this.initForm();
    }

    public async signup() {

        this.signupForm.disable();
        try {

            await this.signupService.signup(this.signupForm.get('username').value,
                                  this.signupForm.get('password').value);

            console.log('rol', localStorage.getItem('authority'));
            switch (localStorage.getItem('authority')) {

                case 'USUARIO': 
                    this.router.navigate(['/home/users']);
                    break;

                case 'ANALISTA':
                    console.log('Go to Analyst');
                    this.router.navigate(['/home/analysts']);
                    break;
            }
            
        } catch (e) {

        } finally {

            this.signupForm.enable();
        }
        
    }

    private initForm() {

        this.signupForm = this.fb.group({
            username: new FormControl('', Validators.required ),
            password: new FormControl('', Validators.required )
        })
    }
}
