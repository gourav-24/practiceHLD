"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const typeorm_1 = require("typeorm");
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'hldcase1_db',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../migrations/*.{js,ts}'],
    synchronize: false,
    migrationsRun: true,
};
exports.default = new typeorm_1.DataSource({
    ...exports.typeOrmConfig,
    migrationsTableName: 'migrations_history',
});
//# sourceMappingURL=typeorm.config.js.map