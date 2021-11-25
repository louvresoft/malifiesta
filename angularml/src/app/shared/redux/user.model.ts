export interface UserInformation {
	email: string;
	first_name: string;
	last_name: string;
	username: string;
	id: number;
	image_profile: string;
}

export interface UserAuth {
	token: string;
	firebase: string;
	session: string;
}
