import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../auth/role.enum';
import { UserRolesEntity } from '../userRoles/userRoles.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 16, nullable: false })
  user_name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ default: false, nullable: true })
  is_verified: boolean;


  @Column({ type: 'enum', enum: Status, default: Status.REGISTERED })
  status: Status;

  @Column({ type: 'varchar', length: 250, nullable: true })
  verification_code: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_time: Date;

  @BeforeInsert()
  emailToLowerCase() {
    if (this.email) {
      this.email = this.email.toLowerCase();
    } else {
      this.email = this.email;
    }
  }


  @OneToMany(() => UserRolesEntity, (rol) => rol.user_id, {
    onDelete: 'CASCADE',
  })
  user_role: UserRolesEntity[];

}
