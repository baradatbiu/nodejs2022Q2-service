import { MigrationInterface, QueryRunner } from 'typeorm';

export class favourites1658584784201 implements MigrationInterface {
  name = 'favourites1658584784201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favourites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_173e5d5cc35490bf1de2d2d3739" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "artists" ADD "favouriteId" uuid`);
    await queryRunner.query(`ALTER TABLE "tracks" ADD "favouriteId" uuid`);
    await queryRunner.query(`ALTER TABLE "albums" ADD "favouriteId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "FK_c58e280ecc5c9a20e3b2a047ee4" FOREIGN KEY ("favouriteId") REFERENCES "favourites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_8dfb0fbdab9c4eb48fa45a2dd4b" FOREIGN KEY ("favouriteId") REFERENCES "favourites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_873a0b40f37049d57b7da840837" FOREIGN KEY ("favouriteId") REFERENCES "favourites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_873a0b40f37049d57b7da840837"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_8dfb0fbdab9c4eb48fa45a2dd4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "FK_c58e280ecc5c9a20e3b2a047ee4"`,
    );
    await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "favouriteId"`);
    await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "favouriteId"`);
    await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "favouriteId"`);
    await queryRunner.query(`DROP TABLE "favourites"`);
  }
}
