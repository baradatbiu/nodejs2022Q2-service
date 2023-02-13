import { MigrationInterface, QueryRunner } from 'typeorm';

export class tracks1658510119709 implements MigrationInterface {
  name = 'tracks1658510119709';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "REL_62f595181306916265849fced4" UNIQUE ("artistId"), CONSTRAINT "REL_5c52e761792791f57de2fec342" UNIQUE ("albumId"), CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "artists" ADD "trackId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "UQ_2ac64cc2acd200fad5e8c212455" UNIQUE ("trackId")`,
    );
    await queryRunner.query(`ALTER TABLE "albums" ADD "trackId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "UQ_5669eb313fe1a8f207a9327bb5c" UNIQUE ("trackId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "FK_2ac64cc2acd200fad5e8c212455" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_5669eb313fe1a8f207a9327bb5c" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_5669eb313fe1a8f207a9327bb5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "FK_2ac64cc2acd200fad5e8c212455"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "UQ_5669eb313fe1a8f207a9327bb5c"`,
    );
    await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "trackId"`);
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "UQ_2ac64cc2acd200fad5e8c212455"`,
    );
    await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "trackId"`);
    await queryRunner.query(`DROP TABLE "tracks"`);
  }
}
