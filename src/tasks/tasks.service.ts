import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { CreateTaskDto } from "../dto/create-task.dto.js";

@Injectable()
export class TasksService {
  constructor(private readonly db: DatabaseService) { }

  async getAll() {
    const result = await this.db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
  }

  async create(dto: CreateTaskDto) {
    const { title, description } = dto;
    const result = await this.db.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    return result.rows[0];
  }
}