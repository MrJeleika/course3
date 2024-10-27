import { NextApiRequest } from 'next';

import { getDBConnection } from '@/app/database/connection';
import { Exam } from '@/app/database/entities/exam.entity';
import { Subject } from '@/app/database/entities/subject.entity';
import { AddExamData } from '@/app/hooks/mutate/use-add-exam';

export async function GET() {
  try {
    const dataSource = await getDBConnection();

    const exams = await dataSource.manager
      .getRepository(Exam)
      .find({ relations: { subject: true } });
    return new Response(JSON.stringify(exams));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error occured');
  }
}

export async function POST(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const { subjectId, date, time } = (await req.json()) as AddExamData;

    const examsRepo = dataSource.manager.getRepository(Exam);
    const subjectRepo = dataSource.manager.getRepository(Subject);

    const subject = await subjectRepo.findOne({ where: { id: subjectId } });

    if (!subject) throw new Error('Now found');

    const newExam = examsRepo.create({ subject, time, date });

    await examsRepo.save(newExam);

    return new Response();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error occured');
  }
}

export async function DELETE(req: NextApiRequest) {
  try {
    const dataSource = await getDBConnection();

    const examsRepo = dataSource.manager.getRepository(Exam);
    const url = new URL(req.url!);
    const id = url.searchParams.get('id');

    const exam = await examsRepo.findOne({
      where: { id: +id! },
    });

    if (!exam) throw new Error('Now found');

    await examsRepo.delete(exam);

    return new Response();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error occured');
  }
}
