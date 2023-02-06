const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class migration1674928217648 {
    name = 'migration1674928217648'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "trip" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "source" character varying NOT NULL, "destination" character varying NOT NULL, "stops" jsonb DEFAULT '[]', "budget" integer NOT NULL, "type" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_location" DROP COLUMN "source"`);
        await queryRunner.query(`ALTER TABLE "user_location" DROP COLUMN "destination"`);
        await queryRunner.query(`ALTER TABLE "user_location" DROP COLUMN "stops"`);
        await queryRunner.query(`ALTER TABLE "user_location" DROP COLUMN "budget"`);
        await queryRunner.query(`ALTER TABLE "user_location" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "user_location" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_location" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_f89812be41bd7d29f98d43445ee" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_f89812be41bd7d29f98d43445ee"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user_location" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_location" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user_location" ADD "type" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_location" ADD "budget" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_location" ADD "stops" jsonb DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "user_location" ADD "destination" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_location" ADD "source" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "trip"`);
    }
}
