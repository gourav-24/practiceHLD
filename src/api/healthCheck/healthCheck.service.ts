import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthCheckService {
    check(){
        return {
            message: 'OK',
        }
    }
}
