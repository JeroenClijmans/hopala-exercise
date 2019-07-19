import {User} from "@/_models/user";

export class Bug {
    id: number;
    title: string;
    description: string;
    owner: User;
    state: string;
    priority: string;
}