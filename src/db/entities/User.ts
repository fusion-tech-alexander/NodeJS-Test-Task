import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(data?: Partial<User>) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;
}
