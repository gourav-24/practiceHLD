import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1710933000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable uuid-ossp extension for UUID generation first
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
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

          // Example column demonstrating all possible TypeORM column options
          /*
          {
            // Basic column properties
            name: 'exampleColumn',           // Required: Column name in the database
            type: 'varchar',                 // Required: SQL type (varchar, int, timestamp, json, etc.)
            length: '255',                   // Optional: Length for types like varchar
            width: 10,                       // Optional: Display width for numeric types
            precision: 10,                   // Optional: Precision for decimal types
            scale: 2,                        // Optional: Scale for decimal types
            
            // Constraints and defaults
            isPrimary: false,               // Optional: Makes this a primary key (default: false)
            isNullable: true,               // Optional: Allows NULL values (default: true)
            isUnique: false,                // Optional: Makes column unique (default: false)
            isGenerated: false,             // Optional: For auto-generated values (default: false)
            generationStrategy: 'increment', // Optional: 'increment', 'uuid', 'rowid', etc.
            default: 'DEFAULT_VALUE',        // Optional: Default value or expression
            
            // Foreign key properties
            foreignKeyConstraintName: 'FK_example', // Optional: Custom foreign key constraint name
            referencedTableName: 'other_table',     // Optional: Referenced table for foreign keys
            referencedColumnNames: ['id'],          // Optional: Referenced columns for foreign keys
            onDelete: 'CASCADE',            // Optional: ON DELETE behavior (CASCADE, SET NULL, etc.)
            onUpdate: 'CASCADE',            // Optional: ON UPDATE behavior
            
            // Indexing
            isArray: false,                 // Optional: For array types in PostgreSQL
            enum: ['value1', 'value2'],     // Optional: For enum types
            enumName: 'custom_enum_name',    // Optional: Custom name for enum type
            
            // Comments and metadata
            comment: 'Example column description', // Optional: Column comment in the database
            charset: 'utf8',                // Optional: Character set for text columns
            collation: 'utf8_general_ci',   // Optional: Collation for text columns
            
            // Spatial types (PostgreSQL)
            spatialFeatureType: 'Point',    // Optional: For geometric types
            srid: 4326                      // Optional: Spatial reference system identifier
          }
          */
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
  }
} 