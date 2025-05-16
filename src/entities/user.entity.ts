import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// @Entity decorator marks this class as a database table named 'users'
@Entity('users')
export class User {
  // @PrimaryGeneratedColumn generates a unique UUID for each user as the primary key
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column decorator marks a property as a database column
  // Here we limit the firstName to 100 characters
  @Column({ length: 100 })
  firstName: string;

  // Similar to firstName, lastName is limited to 100 characters
  @Column({ length: 100 })
  lastName: string;

  // Unique constraint ensures no duplicate emails in the database
  @Column({ unique: true })
  email: string;

  // Regular column for storing the user's password
  @Column()
  password: string;

  // @CreateDateColumn automatically sets the timestamp when an entity is created
  @CreateDateColumn()
  createdAt: Date;

  // @UpdateDateColumn automatically updates the timestamp whenever the entity is modified
  @UpdateDateColumn()
  updatedAt: Date;
} 