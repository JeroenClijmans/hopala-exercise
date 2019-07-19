import {User} from "@/_models/user";

export class Bug {
    id: number;
    owner: string;
    title: string;
    description: string;
    state: string;
    priority: string;
}