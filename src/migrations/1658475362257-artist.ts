import { MigrationInterface, QueryRunner } from 'typeorm';

export class artist1658475362257 implements MigrationInterface {
  name = 'artist1658475362257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "artist" ADD "grammy" boolean NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "grammy"`);
  }
}
