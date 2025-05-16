import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "../../entities/user.entity";

/**
 * Complex TypeORM Query Examples for SDE2 Interview Preparation
 * 
 * 1. Advanced Where Conditions:
 * const users = await userRepository
 *   .createQueryBuilder('user')
 *   .where('user.firstName LIKE :name', { name: '%John%' })
 *   .andWhere('user.createdAt > :date', { date: new Date('2023-01-01') })
 *   .orWhere('user.role IN (:...roles)', { roles: ['admin', 'moderator'] })
 *   .getMany();
 * 
 * 2. Subqueries:
 * const activeUsers = await userRepository
 *   .createQueryBuilder('user')
 *   .where(qb => {
 *     const subQuery = qb
 *       .subQuery()
 *       .select('post.userId')
 *       .from('posts', 'post')
 *       .where('post.createdAt > :date', { date: new Date('2024-01-01') })
 *       .getQuery();
 *     return 'user.id IN ' + subQuery;
 *   })
 *   .getMany();
 * 
 * 3. Complex Joins with Multiple Conditions:
 * const result = await userRepository
 *   .createQueryBuilder('user')
 *   .leftJoinAndSelect('user.posts', 'post')
 *   .leftJoinAndSelect('post.comments', 'comment')
 *   .where('post.isPublished = :isPublished', { isPublished: true })
 *   .andWhere('comment.createdAt > :date', { date: new Date('2024-01-01') })
 *   .orderBy('post.createdAt', 'DESC')
 *   .addOrderBy('comment.createdAt', 'ASC')
 *   .getMany();
 * 
 * 4. Aggregations and Grouping:
 * const userStats = await userRepository
 *   .createQueryBuilder('user')
 *   .select('user.role', 'role')
 *   .addSelect('COUNT(user.id)', 'userCount')
 *   .addSelect('AVG(user.age)', 'averageAge')
 *   .groupBy('user.role')
 *   .having('COUNT(user.id) > :minCount', { minCount: 5 })
 *   .getRawMany();
 * 
 * 5. Window Functions (Postgres):
 * const userRankings = await userRepository
 *   .createQueryBuilder('user')
 *   .select([
 *     'user.id',
 *     'user.firstName',
 *     'ROW_NUMBER() OVER (PARTITION BY user.role ORDER BY user.createdAt)',
 *   ])
 *   .getRawMany();
 * 
 * 6. Complex Case Statements:
 * const userCategories = await userRepository
 *   .createQueryBuilder('user')
 *   .select([
 *     'user.id',
 *     `CASE 
 *       WHEN user.postCount > 100 THEN 'power_user'
 *       WHEN user.postCount > 50 THEN 'active_user'
 *       ELSE 'regular_user'
 *     END as userCategory`
 *   ])
 *   .getRawMany();
 * 
 * 7. Recursive CTEs (Postgres):
 * const hierarchicalData = await userRepository
 *   .createQueryBuilder()
 *   .select('*')
 *   .from(subQuery => {
 *     return subQuery
 *       .select('id, parent_id, name, 1 as level')
 *       .from('categories', 'c')
 *       .where('parent_id IS NULL')
 *       .union(
 *         subQuery
 *           .select('c.id, c.parent_id, c.name, level + 1')
 *           .from('categories', 'c')
 *           .innerJoin('cte', 'p', 'c.parent_id = p.id')
 *       );
 *   }, 'cte')
 *   .getRawMany();
 * 
 * 8. Full-Text Search (Postgres):
 * const searchResults = await userRepository
 *   .createQueryBuilder('user')
 *   .where(
 *     'to_tsvector(\'english\', user.bio) @@ to_tsquery(:searchTerm)',
 *     { searchTerm: 'typescript & development' }
 *   )
 *   .orderBy('ts_rank(to_tsvector(\'english\', user.bio), to_tsquery(:searchTerm))', 'DESC')
 *   .getMany();
 * 
 * 9. JSON Operations (Postgres):
 * const jsonQuery = await userRepository
 *   .createQueryBuilder('user')
 *   .where('user.preferences @> :preferences', {
 *     preferences: JSON.stringify({ theme: 'dark', notifications: true })
 *   })
 *   .andWhere('user.metadata->\'version\' = :version', { version: '2.0' })
 *   .getMany();
 * 
 * 10. Performance Optimization Techniques:
 * - Use QueryBuilder's cache option for frequently accessed data
 * - Implement pagination using skip/take
 * - Use proper indexes on frequently queried columns
 * - Use select to fetch only needed columns
 * - Use joins instead of multiple queries where possible
 * Example:
 * const optimizedQuery = await userRepository
 *   .createQueryBuilder('user')
 *   .select(['user.id', 'user.email'])
 *   .leftJoinAndSelect('user.profile', 'profile')
 *   .cache(60000) // Cache for 1 minute
 *   .where('user.isActive = :isActive', { isActive: true })
 *   .take(10)
 *   .skip(0)
 *   .getMany();
 */

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