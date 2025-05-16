import { Controller, Get } from "@nestjs/common";
import { HealthCheckService } from "./healthCheck.service";

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}
  @Get()
  getHealthCheck() {
    return this.healthCheckService.check();
  }
}