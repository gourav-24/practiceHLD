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
exports.Feature1Controller = void 0;
const feature1_service_1 = require("./feature1.service");
const common_1 = require("@nestjs/common");
let Feature1Controller = class Feature1Controller {
    feature1service;
    constructor(feature1service) {
        this.feature1service = feature1service;
    }
    getFeature1() {
        return this.feature1service.getFeature1();
    }
};
exports.Feature1Controller = Feature1Controller;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Feature1Controller.prototype, "getFeature1", null);
exports.Feature1Controller = Feature1Controller = __decorate([
    (0, common_1.Controller)('feature1'),
    __metadata("design:paramtypes", [feature1_service_1.Feature1Service])
], Feature1Controller);
//# sourceMappingURL=feature1.controller.js.map