import { getDBConnection } from '@/app/database/connection';
import { Student } from '@/app/database/entities/student.entity';

export async function GET() {
  try {
    const dataSource = await getDBConnection();

    const students = await dataSource.manager.getRepository(Student).find({
      relations: { grades: { exam: true }, group: true },
      order: { group: { groupName: 'DESC' }, fullName: 'DESC' },
    });
    return new Response(JSON.stringify(students));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify([]));
  }
}
