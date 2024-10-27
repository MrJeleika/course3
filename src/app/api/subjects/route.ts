import { getDBConnection } from '@/app/database/connection';
import { Subject } from '@/app/database/entities/subject.entity';

export async function GET() {
  try {
    const dataSource = await getDBConnection();

    const subjects = await dataSource.manager.getRepository(Subject).find();
    console.log(subjects);
    return new Response(JSON.stringify(subjects));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify([]));
  }
}
