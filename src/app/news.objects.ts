export class NewsObject {

    public id: number;
    public title: string;
    public content: string;
    public video_url: string;
    public approval: boolean;
    public liked_by_auth_user: boolean;
    public image_file: any;
    public image_file_name: string;
    public comment: string;
    public image_url: string;
    public likes_count: number;
    public comments_count: number;
    public created_at: string;
    public updated_at: string;


    constructor() {
        this.id = null;
        this.title = '';
        this.content = '';
        this.comment = '';
        this.video_url = '';
        this.image_file = null;
       // this.liked_by_auth_user= false;   
    }
    
}
export class Data {
    public id: number;
    public token: string;
    public content: string;

    constructor() {
        this.token = '';

        
    }
}