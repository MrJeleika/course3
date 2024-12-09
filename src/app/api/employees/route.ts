// app/api/employees/route.ts
import { getDBConnection } from '@/app/database/connection';
import { Employee } from '@/app/database/entities/employee.entity';

export async function GET() {
  try {
    const dataSource = await getDBConnection();

    const employees = await dataSource.manager
      .getRepository(Employee)
      .find({ relations: { department: true } });

    return new Response(JSON.stringify(employees), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response('Error fetching employees', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const body = await req.json();

    const newEmployee = dataSource.manager.getRepository(Employee).create(body);

    await dataSource.manager.getRepository(Employee).save(newEmployee);

    return new Response('Employee created successfully', { status: 201 });
  } catch (error) {
    console.log(error);

    return new Response('Error creating employee', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const url = new URL(req.url!);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response('Employee ID not provided', { status: 400 });
    }

    const employeeRepo = dataSource.manager.getRepository(Employee);

    const employee = await employeeRepo.findOne({ where: { id: +id } });

    if (!employee) {
      return new Response('Employee not found', { status: 404 });
    }

    await employeeRepo.delete(id);

    return new Response('Employee deleted successfully', { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response('Error deleting employee', { status: 500 });
  }
}
