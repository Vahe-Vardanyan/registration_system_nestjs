import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730038949695 implements MigrationInterface {
    name = 'Migration1730038949695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`role_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`create_time\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`user_name\` varchar(16) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`is_verified\` tinyint NULL DEFAULT 0, \`status\` enum ('active', 'approved', 'registered', 'deleted') NOT NULL DEFAULT 'registered', \`verification_code\` varchar(250) NULL, \`create_time\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_time\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`userRoles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NULL, \`role_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`userRoles\` ADD CONSTRAINT \`FK_355bdf8bfdd624c430cdd1a2299\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`userRoles\` ADD CONSTRAINT \`FK_6b12772f8fad7c583492d64dec0\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`role_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`userRoles\` DROP FOREIGN KEY \`FK_6b12772f8fad7c583492d64dec0\``);
        await queryRunner.query(`ALTER TABLE \`userRoles\` DROP FOREIGN KEY \`FK_355bdf8bfdd624c430cdd1a2299\``);
        await queryRunner.query(`DROP TABLE \`userRoles\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
