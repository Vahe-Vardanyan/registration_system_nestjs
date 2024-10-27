import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolesEntity } from '../roles/roles.entity';
import { UserEntity } from '../user/user.entity';


@Entity('userRoles')
export class UserRolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user_id: number; 

  @ManyToOne(() => RolesEntity, (role) => role.user_role, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role_id: number;
}
