import { getDBConnection } from '@/app/database/connection';
import { Exam } from '@/app/database/entities/exam.entity';
import { Grade } from '@/app/database/entities/grade.entity';
import { Student } from '@/app/database/entities/student.entity';
import { ChangeGrade } from '@/app/hooks/mutate/use-change-grade';

export async function POST(req: Request) {
  try {
    const dataSource = await getDBConnection();
    const { examId, grade, studentId, gradeId } =
      (await req.json()) as ChangeGrade;
    console.log(examId, grade, studentId, gradeId);

    const gradeRepo = dataSource.manager.getRepository(Grade);
    const studentRepo = dataSource.manager.getRepository(Student);
    const examRepo = dataSource.manager.getRepository(Exam);

    const student = await studentRepo.findOne({ where: { id: studentId } });
    const exam = await examRepo.findOne({ where: { id: examId } });

    if (!student || !exam) {
      throw new Error('Now found');
    }

    if (gradeId) {
      await gradeRepo.update(gradeId, {
        grade,
      });
    } else {
      const newGrade = gradeRepo.create({
        student,
        exam,
        grade,
      });
      await gradeRepo.save(newGrade);
    }

    return new Response();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error occured');
  }
}
