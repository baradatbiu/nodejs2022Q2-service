import { MigrationInterface, QueryRunner } from 'typeorm';

export class albumTrackRelationFix1658517332406 implements MigrationInterface {
  name = 'albumTrackRelationFix1658517332406';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_5669eb313fe1a8f207a9327bb5c"`,
    );
    await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "trackId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "albums" ADD "trackId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_5669eb313fe1a8f207a9327bb5c" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
