import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; 

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date; 
}
