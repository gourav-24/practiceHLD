"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckModule = void 0;
const common_1 = require("@nestjs/common");
const healthCheck_controller_1 = require("./healthCheck.controller");
const healthCheck_service_1 = require("./healthCheck.service");
let HealthCheckModule = class HealthCheckModule {
};
exports.HealthCheckModule = HealthCheckModule;
exports.HealthCheckModule = HealthCheckModule = __decorate([
    (0, common_1.Module)({
        controllers: [healthCheck_controller_1.HealthCheckController],
        providers: [healthCheck_service_1.HealthCheckService],
    })
], HealthCheckModule);
//# sourceMappingURL=healthCheck.module.js.map