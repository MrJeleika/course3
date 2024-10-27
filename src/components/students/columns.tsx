'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Input } from '../ui/input';

import { Student } from '@/app/database/entities/student.entity';
import { useChangeGrade } from '@/app/hooks/mutate/use-change-grade';

export const columnsStudents: ColumnDef<Student & { examId: number }>[] = [
  {
    accessorKey: 'fullName',
    header: () => <div className="min-w-[150px]">Прізвище Ім&apos;я</div>,
    cell: ({ row }) => <div>{row.original.fullName}</div>,
  },
  {
    accessorKey: 'group',
    header: () => <div className="">Група</div>,
    cell: ({ row }) => <div>{row.original.group.groupName}</div>,
  },
  {
    accessorKey: 'faculty',
    header: () => <div className="">Факультет</div>,
    cell: ({ row }) => <div>{row.original.group.faculty}</div>,
  },
  {
    accessorKey: 'grade',
    header: () => <div className="">Оцінка</div>,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

export const ActionCell = ({
  row,
}: {
  row: Row<Student & { examId: number }>;
}) => {
  const [grade, setGrade] = useState('');

  useEffect(() => {
    const savedGrade = row.original.grades.find(
      (g) => g.exam.id === row.original.examId,
    );

    if (savedGrade) {
      setGrade(savedGrade.grade.toString());
    } else {
      setGrade('');
    }
  }, [row]);

  const { mutateAsync } = useChangeGrade();

  const onBlur = async () => {
    try {
      await mutateAsync({
        studentId: row.original.id,
        grade: +grade,
        examId: row.original.examId,
        gradeId: row.original.grades[0] ? row.original.grades[0].id : undefined,
      });
    } catch (error) {
      setGrade(row.original.grades[0]?.grade.toString() || '');
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Input
      className="w-20"
      type="number"
      min={0}
      max={100}
      onBlur={onBlur}
      placeholder="0-100"
      value={grade}
      onChange={(e) => {
        const val = +e.target.value;
        if (val > 100) {
          setGrade('100');
          return;
        }
        if (val < 0) {
          setGrade('0');
          return;
        }

        setGrade(e.target.value);
      }}
    />
  );
};
