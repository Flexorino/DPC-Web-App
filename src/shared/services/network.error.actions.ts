import { createAction } from '@ngrx/store';

export class NetworkErrorActions {
    static CONNECTION_ERROR = createAction('[Network] connection_error');
    static AUTHENTIFICATION_ERROR = createAction('[Network] authentification_error');
    static AUTHORIZATION_ERROR = createAction('[Network] authorization_error');
}
