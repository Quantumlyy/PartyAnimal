export interface Result {
	status?: number;
	id?: string;
	type?: string;
	baseType?: string;
	nsfw?: boolean;
	fileType?: string;
	mimeType?: string;
	account?: string;
	hidden?: boolean;
	tags?: string[];
	url?: string;
}
