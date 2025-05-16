import { Feature1Service } from "./feature1.service";
export declare class Feature1Controller {
    private readonly feature1service;
    constructor(feature1service: Feature1Service);
    getFeature1(): Promise<{
        message: string;
        users: import("../../entities/user.entity").User[];
    }>;
}
