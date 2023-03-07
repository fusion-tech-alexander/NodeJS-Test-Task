import { CreateDateColumn, DeleteDateColumn, TableInheritance, UpdateDateColumn } from 'typeorm';

@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
