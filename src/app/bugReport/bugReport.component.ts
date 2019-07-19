import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { AlertService, BugService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'bugReport.component.html' })
export class BugReportComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    currentUser: User;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private bugService: BugService,
        private alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            state: ['', Validators.required],
            priority: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.bugService.register(this.registerForm.value, this.currentUser.username)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Bug reported', true);
                    this.router.navigate(['/bugs']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}