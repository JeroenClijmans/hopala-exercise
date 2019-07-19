import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Bug } from '@/_models';

@Injectable({ providedIn: 'root' })
export class BugService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Bug[]>(`${config.apiUrl}/bugs`);
    }

    register(bug: Bug, owner: string) {
        bug.owner = owner;
        console.log(owner);
        return this.http.post(`${config.apiUrl}/bugs/register`, bug);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/bugs/${id}`);
    }
}