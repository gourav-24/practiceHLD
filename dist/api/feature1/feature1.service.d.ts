import { DataSource } from "typeorm";
import { User } from "../../entities/user.entity";
export declare class Feature1Service {
    private dataSource;
    constructor(dataSource: DataSource);
    getFeature1(): Promise<{
        message: string;
        users: User[];
    }>;
}
