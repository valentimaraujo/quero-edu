import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createOfferTable1605041152750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'offers',
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
            name: 'course_id',
            type: 'integer',
            isNullable: true,
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
            name: 'full_price',
            type: 'decimal(18, 2)',
            isNullable: false,
          },
          {
            name: 'price_with_discount',
            type: 'decimal(18, 2)',
            isNullable: false,
          },
          {
            name: 'discount_percentage',
            type: 'decimal(3, 2)',
            isNullable: false,
          },
          {
            name: 'enrollment_semester',
            type: 'decimal(18, 2)',
            isNullable: false,
          },
          {
            name: 'enabled',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'start_date',
            type: 'datetime',
            default: 'now()',
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
            name: 'courseId',
            columnNames: ['course_id'],
            referencedTableName: 'courses',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
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
    await queryRunner.dropTable('offers');
  }
}
