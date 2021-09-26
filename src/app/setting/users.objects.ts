export class User {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public user_role_id: number;
    public created_at: string;
    public updated_at: string;
    constructor() {
        this.id = 0;
        this.name = '';
        this.email = '';
        this.password = '';
        this.user_role_id = null;
        this.created_at = '';
        this.updated_at = '';
    }
}