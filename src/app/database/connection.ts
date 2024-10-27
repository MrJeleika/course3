import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { ExamCommission } from './entities/exam-commision.entity';
import { Exam } from './entities/exam.entity';
import { Grade } from './entities/grade.entity';
import { Group } from './entities/group.entity';
import { Student } from './entities/student.entity';
import { Subject } from './entities/subject.entity';

const pgConnection = new DataSource({
  type: 'postgres',
  url: process.env.DB_CONNECTION_STRING,
  synchronize: true,
  entities: [ExamCommission, Exam, Subject, Student, Group, Grade],
  migrations: [],
  logging: ['error', 'schema'],
  subscribers: [],
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});

export const getDBConnection = async (): Promise<DataSource> => {
  if (!pgConnection.isInitialized) {
    await pgConnection.initialize();
  }
  return pgConnection;
};
