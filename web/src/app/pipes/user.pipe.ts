import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel } from '../shared/models/user.model';
import { UserService } from '../core/services/user.service';

@Pipe({ name: 'user' })
export class UserPipe implements PipeTransform {

    constructor(private userService: UserService) { }

    transform(userId: string): Observable<UserModel> {
        return this.userService
            .findUserStatsById(userId);
    }
}
