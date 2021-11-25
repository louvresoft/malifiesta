import { getActionTypeFromInstance } from '@ngxs/store';
​import { Logout } from './auth.actions';

export function logoutPlugin(state, action, next) {
​
  // Use the get action type helper to determine the type
  if (getActionTypeFromInstance(action) === Logout.type) {
​
    // if we are a logout type, lets erase all the state
    state = {
		EntepriseSelected: null,
		EnterprisesUser: null,
		Subscription: null,
		Auth: {
			token: null,
			firebase: null,
			session: null
		},
		UserInformation: null
    }
  }
​
  // return the next function with the empty state
  return next(state, action);
}
