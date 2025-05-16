import { Feature1Service } from "./feature1.service";
import { Controller, Get } from "@nestjs/common";

@Controller('feature1')
export class Feature1Controller {
    constructor(private readonly feature1service:Feature1Service){}

    @Get()
    getFeature1(){
        return this.feature1service.getAllUsers();
    }
}