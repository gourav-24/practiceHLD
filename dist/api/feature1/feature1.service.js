"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature1Service = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../entities/user.entity");
let Feature1Service = class Feature1Service {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getFeature1() {
        try {
            const userRepository = this.dataSource.getRepository(user_entity_1.User);
            const users = await userRepository.find({
                select: ['id', 'firstName', 'lastName', 'email', 'createdAt']
            });
            return {
                message: 'Feature 1',
                users: users
            };
        }
        catch (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    }
};
exports.Feature1Service = Feature1Service;
exports.Feature1Service = Feature1Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], Feature1Service);
//# sourceMappingURL=feature1.service.js.map