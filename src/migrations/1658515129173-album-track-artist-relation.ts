import { MigrationInterface, QueryRunner } from 'typeorm';

export class albumTrackArtistRelation1658515129173
  implements MigrationInterface
{
  name = 'albumTrackArtistRelation1658515129173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "FK_c1ca261a7b9668e54f5128674ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "FK_2ac64cc2acd200fad5e8c212455"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_5669eb313fe1a8f207a9327bb5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "REL_c1ca261a7b9668e54f5128674e"`,
    );
    await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "albumId"`);
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "UQ_2ac64cc2acd200fad5e8c212455"`,
    );
    await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "trackId"`);
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "REL_62f595181306916265849fced4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "REL_5c52e761792791f57de2fec342"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "REL_ed378d7c337efd4d5c8396a77a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "UQ_5669eb313fe1a8f207a9327bb5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_5669eb313fe1a8f207a9327bb5c" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_5669eb313fe1a8f207a9327bb5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "UQ_5669eb313fe1a8f207a9327bb5c" UNIQUE ("trackId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "REL_ed378d7c337efd4d5c8396a77a" UNIQUE ("artistId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "REL_5c52e761792791f57de2fec342" UNIQUE ("albumId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "REL_62f595181306916265849fced4" UNIQUE ("artistId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "artists" ADD "trackId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "UQ_2ac64cc2acd200fad5e8c212455" UNIQUE ("trackId")`,
    );
    await queryRunner.query(`ALTER TABLE "artists" ADD "albumId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "REL_c1ca261a7b9668e54f5128674e" UNIQUE ("albumId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_5669eb313fe1a8f207a9327bb5c" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "FK_2ac64cc2acd200fad5e8c212455" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "FK_c1ca261a7b9668e54f5128674ea" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
