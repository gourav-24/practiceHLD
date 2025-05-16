import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "../../entities/user.entity";

@Injectable()
export class Feature1Service {
    constructor(
        private dataSource: DataSource
    ){}

    async getAllUsers(page: number = 1, limit: number = 10, where: Partial<User> = {}) {
        try {
            const userRepository = this.dataSource.getRepository(User);
            const skip = (page - 1) * limit;

            const [users, total] = await userRepository.findAndCount({
                where,
                select: ['id', 'firstName', 'lastName', 'email', 'createdAt'],
                skip,
                take: limit,
                order: { createdAt: 'DESC' }
            });

            return {
                users,
                meta: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    }

    async getUserById(id: string) {
        try {
            const userRepository = this.dataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { id },
                select: ['id', 'firstName', 'lastName', 'email', 'createdAt']
            });

            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            return user;
        } catch (error) {
            throw new Error(`Failed to fetch user: ${error.message}`);
        }
    }

    async createUser(userData: Partial<User>) {
        try {
            const userRepository = this.dataSource.getRepository(User);
            const newUser = userRepository.create(userData);
            const savedUser = await userRepository.save(newUser);

            // Exclude password from response
            const { password, ...userWithoutPassword } = savedUser;
            return userWithoutPassword;
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    async updateUser(id: string, userData: Partial<User>) {
        try {
            const userRepository = this.dataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id } });

            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            await userRepository.update(id, userData);
            
            // Fetch and return updated user
            const updatedUser = await userRepository.findOne({
                where: { id },
                select: ['id', 'firstName', 'lastName', 'email', 'createdAt']
            });

            return updatedUser;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    async deleteUser(id: string) {
        try {
            const userRepository = this.dataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id } });

            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            await userRepository.delete(id);
            return { message: `User with ID ${id} has been deleted` };
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
}