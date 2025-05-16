"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1710933000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserTable1710933000000 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'firstName',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'lastName',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
        await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
    }
}
exports.CreateUserTable1710933000000 = CreateUserTable1710933000000;
//# sourceMappingURL=1710933000000-CreateUserTable.js.map