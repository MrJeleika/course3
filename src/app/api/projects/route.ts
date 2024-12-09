// app/api/projects/route.ts
import { getDBConnection } from '@/app/database/connection';
import { Project } from '@/app/database/entities/project.entity';

export async function GET() {
  try {
    const dataSource = await getDBConnection();

    const projects = await dataSource.manager.getRepository(Project).find({
      relations: ['client', 'campaigns'], // Отримання клієнтів та кампаній, пов'язаних із проектом
    });

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response('Error fetching projects', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const body = await req.json();

    const newProject = dataSource.manager.getRepository(Project).create(body);

    await dataSource.manager.getRepository(Project).save(newProject);

    return new Response('Project created successfully', { status: 201 });
  } catch (error) {
    console.log(error);

    return new Response('Error creating project', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const dataSource = await getDBConnection();

    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) return new Response('Project ID not provided', { status: 400 });

    await dataSource.manager.getRepository(Project).delete(id);

    return new Response('Project deleted successfully', { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response('Error deleting project', { status: 500 });
  }
}
