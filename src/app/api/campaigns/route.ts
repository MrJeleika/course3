// app/api/campaigns/route.ts
import { getDBConnection } from '@/app/database/connection';
import { Campaign } from '@/app/database/entities/campaign.entity';
import { Client } from '@/app/database/entities/client.entity';
import { Employee } from '@/app/database/entities/employee.entity';
import { CreateCampaignData } from '@/app/hooks/mutate/use-create-campaign';

export async function GET() {
  try {
    const dataSource = await getDBConnection();

    const campaigns = await dataSource.manager
      .getRepository(Campaign)
      .find({ relations: { manager: true } });

    const clients = await dataSource.manager
      .getRepository(Client)
      .find({ relations: { campaign: true } });

    return new Response(
      JSON.stringify(
        campaigns.map((campaign) => {
          return {
            ...campaign,
            clients: clients
              .filter((client) => client.campaign.id === campaign.id)
              .map((client) => client.name),
          };
        }),
      ),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    return new Response('Error fetching campaigns', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const body: CreateCampaignData = await req.json();
    console.log(body);

    const campaignRepo = dataSource.manager.getRepository(Campaign);
    const clientsRepo = dataSource.manager.getRepository(Client);
    const managerRepo = dataSource.manager.getRepository(Employee);
    const manager = await managerRepo.findOne({
      where: { id: body.managerId },
    });
    const newCampaign = campaignRepo.create({
      ...body,
      endDate: body.dateEnd,
      startDate: body.dateStart,
      manager: manager!,
    });
    const clients = body.clients.split(',');
    await dataSource.manager.getRepository(Campaign).save(newCampaign);

    for (const client of clients) {
      const newClient = clientsRepo.create({
        name: client,
        campaign: newCampaign,
      });
      await clientsRepo.save(newClient);
    }

    return new Response();
  } catch (error) {
    console.log(error);

    throw new Error('Error occured');
  }
}

export async function DELETE(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const url = new URL(req.url!);
    const id = url.searchParams.get('id');

    if (!id) {
      throw new Error('Error occured');
    }

    const campaignRepo = dataSource.manager.getRepository(Campaign);

    const campaign = await campaignRepo.findOne({ where: { id: +id } });

    if (!campaign) {
      throw new Error('Error occured');
    }

    await campaignRepo.delete(id);

    return new Response();
  } catch (error) {
    console.log(error);

    throw new Error('Error occured');
  }
}
