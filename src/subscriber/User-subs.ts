import { User } from "../entity/User";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { hash } from 'bcryptjs';


@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    
    /**
     * Indicates that this subscriber only listen to User events.
     */
    listenTo() {
        return User;
    }
    
    /**
     * Called before user insertion.
     */
    async beforeInsert(event: InsertEvent<User>) {        
        event.entity.password = await hash(event.entity.password, 10);
    }

    /**
     * called after insert
     */
    async afterInsert(event: InsertEvent<User>) {
        event.entity.age = 27;
        await event.manager
            .getRepository(User)
            .save(event.entity);
    }

}