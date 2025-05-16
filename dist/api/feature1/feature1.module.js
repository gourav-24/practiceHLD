"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature1Module = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const feature1_controller_1 = require("./feature1.controller");
const feature1_service_1 = require("./feature1.service");
const user_entity_1 = require("../../entities/user.entity");
let Feature1Module = class Feature1Module {
};
exports.Feature1Module = Feature1Module;
exports.Feature1Module = Feature1Module = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])
        ],
        controllers: [feature1_controller_1.Feature1Controller],
        providers: [feature1_service_1.Feature1Service],
    })
], Feature1Module);
//# sourceMappingURL=feature1.module.js.map