const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class migration1674929354108 {
    name = 'migration1674929354108'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isMarried" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_location" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_location" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "trip" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "trip" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid()`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "trip" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "trip" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user_location" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_location" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isMarried" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
    }
}
