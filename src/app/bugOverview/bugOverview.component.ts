import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import '../_content/app.less';

import { User } from '@/_models';
import { BugService, AuthenticationService } from '@/_services';

@Component({selector: 'app', templateUrl: 'bugOverview.component.html' })
export class BugOverviewComponent implements OnInit {
    currentUser: User;
    bugs = [];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private bugService: BugService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllBugs();
    }

    deleteBug(id: number) {
        this.bugService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllBugs());
    }

    private loadAllBugs() {
        this.bugService.getAll()
            .pipe(first())
            .subscribe(bugs => this.bugs = bugs);
    }
}