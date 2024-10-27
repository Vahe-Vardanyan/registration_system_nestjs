import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRolesEntity } from '../userRoles/userRoles.entity';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_time: Date;
  
  @OneToMany(() => UserRolesEntity, (rol) => rol.role_id, {
    onDelete: 'CASCADE',
  })
  user_role: UserRolesEntity[];
}
