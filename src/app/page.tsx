'use client';

import { useMemo, useState } from 'react';

import { Exam } from './database/entities/exam.entity';
import { useExams } from './hooks/get/use-exams';
import { useStudents } from './hooks/get/use-students';

import { columnsStudents } from '../components/students/columns';

import { DataTable } from '@/components/common/data-table';
import { AddExam } from '@/components/exam/add-exam';
import { columnsExam } from '@/components/exam/columns';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

export default function Home() {
  const { data: exams } = useExams();

  const [open, setOpen] = useState(false);
  const { data: students } = useStudents();

  const [selectedExam, setSelectedExam] = useState<null | Exam>(null);

  const studentsForCurrentExam = useMemo(() => {
    if (!students || !selectedExam) return [];

    return students.map((student) => {
      return {
        ...student,
        examId: selectedExam.id,
        grades: student.grades.filter(
          (grade) => grade.exam.id === selectedExam.id,
        ),
      };
    });
  }, [selectedExam, students]);

  console.log(studentsForCurrentExam);

  return (
    <div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="mb-8 flex flex-col gap-4">
        <DataTable
          columns={columnsExam}
          data={exams || []}
          onClick={(row) => setSelectedExam(row.original)}
        />
        <Button onClick={() => setOpen(true)}>Add new exam</Button>
      </div>
      {studentsForCurrentExam.length > 0 && selectedExam && (
        <div className="flex flex-col gap-2">
          <p>Оцінки студентів по екзамену з {selectedExam.subject.name}</p>
          <DataTable columns={columnsStudents} data={studentsForCurrentExam} />
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <AddExam onClose={() => setOpen(false)} />
      </Dialog>
    </div>
  );
}
