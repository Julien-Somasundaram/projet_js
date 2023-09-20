import { User } from './user';
import { UserService } from './user.service';
import * as jsonfile from 'jsonfile';


export class UserJSONService implements UserService {
    UserJsonFilepath = './data/USerData.json';

 
    add(username: string): User {
        
        console.log("add " + username)
        const data =jsonfile.readFileSync(this.UserJsonFilepath);
        console.log(data.users);
        let newUser = new User(this.getNextId(),username);
        data.users.push(newUser);
        jsonfile.writeFileSync(this.UserJsonFilepath, data);
        return newUser;
    }
    
    getById(id: number): User | null {
        const data =jsonfile.readFileSync(this.UserJsonFilepath);
        let i:number = 0;
        while (i < data.users.length) {
            if (data.users[i].id == id) {
                
                console.log("get " + data.users[i].username)
                return data.users[i]
            } 
        i++;
    };
        return null
    }
    getNextId(): number {
        const data =jsonfile.readFileSync(this.UserJsonFilepath);
        const maxId = data.users.reduce((max: number, user: User) => {
            return user.id > max ? user.id : max;
        }, -1);
        
        return maxId + 1;
    
    }


}

