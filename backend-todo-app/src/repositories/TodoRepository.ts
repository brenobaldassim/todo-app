// src/repository/TaskRepository.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '@src/data-source';
import { Todo } from '@src/entities/Todo';

export class TodoRepository extends Repository<Todo> {
	constructor() {
		super(Todo, AppDataSource.manager);
	}
	findByStatus(status: string, userId: number) {
		return this.find({
			relations: ['user'],
			where: { status, user: { id: userId } },
		});
	}

	findByCreationDate(date: Date, userId: number) {
		return this.find({
			relations: ['user'],
			where: { createdAt: date, user: { id: userId } },
		});
	}

	findByStatusOrderByCreationDate(status: string, userId: number) {
		return this.createQueryBuilder('todo')
			.where('todo.status = :status AND todo.userId = :userId', { status, userId })
			.orderBy('todo.createdAt', 'DESC')
			.getMany();
	}

	searchTodos(userId: number, limit: number, status?: string, skip?: number) {
		return this.createQueryBuilder('todo')
			.where('todo.userId = :userId', { userId })
			.andWhere(status ? 'todo.status = :status' : 'TRUE', { status })
			.orderBy('todo.createdAt', 'DESC')
			.skip(skip)
			.take(limit)
			.getManyAndCount();
	}
}
