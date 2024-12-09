// app/api/departments/route.ts
import { getDBConnection } from '@/app/database/connection';
import { Department } from '@/app/database/entities/department.entity';

export async function GET() {
  try {
    const dataSource = await getDBConnection();

    const departments = await dataSource.manager
      .getRepository(Department)
      .find();

    return new Response(JSON.stringify(departments), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response('Error fetching departments', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const body = await req.json();

    const newDepartment = dataSource.manager
      .getRepository(Department)
      .create(body);

    await dataSource.manager.getRepository(Department).save(newDepartment);

    return new Response('Department created successfully', { status: 201 });
  } catch (error) {
    console.log(error);

    return new Response('Error creating department', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const url = new URL(req.url!);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response('Department ID not provided', { status: 400 });
    }

    const departmentRepo = dataSource.manager.getRepository(Department);

    const department = await departmentRepo.findOne({ where: { id: +id } });

    if (!department) {
      return new Response('Department not found', { status: 404 });
    }

    await departmentRepo.delete(id);

    return new Response('Department deleted successfully', { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response('Error deleting department', { status: 500 });
  }
}
