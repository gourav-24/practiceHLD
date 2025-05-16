import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Feature1Controller } from "./feature1.controller";
import { Feature1Service } from "./feature1.service";
import { User } from "../../entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [Feature1Controller],
    providers: [Feature1Service],
})
export class Feature1Module {}