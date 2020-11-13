import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCourseTable1605041128119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'university_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'campus_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'kind',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'level',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'shift',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            default: null,
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'universityId',
            columnNames: ['university_id'],
            referencedTableName: 'universities',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'campusId',
            columnNames: ['campus_id'],
            referencedTableName: 'campus',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('courses');
  }
}
