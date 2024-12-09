// app/api/campaigns/route.ts
import { getDBConnection } from '@/app/database/connection';
import { Campaign } from '@/app/database/entities/campaign.entity';

export async function GET() {
  try {
    const dataSource = await getDBConnection();

    const campaigns = await dataSource.manager.getRepository(Campaign).find();

    return new Response(JSON.stringify(campaigns), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response('Error fetching campaigns', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const body = await req.json();

    const newCampaign = dataSource.manager.getRepository(Campaign).create(body);

    await dataSource.manager.getRepository(Campaign).save(newCampaign);

    return new Response('Campaign created successfully', { status: 201 });
  } catch (error) {
    console.log(error);

    return new Response('Error creating campaign', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const url = new URL(req.url!);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response('Campaign ID not provided', { status: 400 });
    }

    const campaignRepo = dataSource.manager.getRepository(Campaign);

    const campaign = await campaignRepo.findOne({ where: { id: +id } });

    if (!campaign) {
      return new Response('Campaign not found', { status: 404 });
    }

    await campaignRepo.delete(id);

    return new Response('Campaign deleted successfully', { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response('Error deleting campaign', { status: 500 });
  }
}
