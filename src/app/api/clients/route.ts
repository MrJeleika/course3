// app/api/clients/route.ts
import { getDBConnection } from '@/app/database/connection';
import { Client } from '@/app/database/entities/client.entity';

export async function GET() {
  try {
    const dataSource = await getDBConnection();

    const clients = await dataSource.manager.getRepository(Client).find();

    return new Response(JSON.stringify(clients), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response('Error fetching clients', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const body = await req.json();

    const newClient = dataSource.manager.getRepository(Client).create(body);

    await dataSource.manager.getRepository(Client).save(newClient);

    return new Response('Client created successfully', { status: 201 });
  } catch (error) {
    console.log(error);

    return new Response('Error creating client', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const dataSource = await getDBConnection();

    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) return new Response('Client ID not provided', { status: 400 });

    await dataSource.manager.getRepository(Client).delete(id);

    return new Response('Client deleted successfully', { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response('Error deleting client', { status: 500 });
  }
}
