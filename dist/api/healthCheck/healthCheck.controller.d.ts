import { HealthCheckService } from "./healthCheck.service";
export declare class HealthCheckController {
    private readonly healthCheckService;
    constructor(healthCheckService: HealthCheckService);
    getHealthCheck(): {
        message: string;
    };
}
