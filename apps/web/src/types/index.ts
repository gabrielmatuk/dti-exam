export type User = {
	id: number;
	email: string;
	name: string | null;
	password: string;
	isActive: boolean;
	role: string;
	photos?: Photo[];
	createdAt: Date;
};

export type Photo = {
	id: number;
	url: string;
	user_id: number;
	album_id: number | null;
	createdAt: Date;
};

export type ListPhotos = Photo[] & {
	total: number;
};
