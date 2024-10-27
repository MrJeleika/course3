'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { ColumnDef, Row } from '@tanstack/react-table';
import { toast } from 'sonner';

import { Exam } from '@/app/database/entities/exam.entity';
import { useRemoveExam } from '@/app/hooks/mutate/use-remove-exam';

export const columnsExam: ColumnDef<Exam>[] = [
  {
    accessorKey: 'subject',
    header: () => <div className="min-w-[150px]">Предмет</div>,
    cell: ({ row }) => <div>{row.original.subject.name}</div>,
  },
  {
    accessorKey: 'date',
    header: () => <div className="">Дата</div>,
    cell: ({ row }) => <div>{row.original.date}</div>,
  },
  {
    accessorKey: 'time',
    header: () => <div className="">Час</div>,
    cell: ({ row }) => <div>{row.original.time}</div>,
  },
  {
    accessorKey: 'action',
    header: () => '',

    cell: ({ row }) => <ActionCell row={row} />,
  },
];

export const ActionCell = ({ row }: { row: Row<Exam> }) => {
  const { mutateAsync } = useRemoveExam();

  const onClick = async () => {
    const toastId = toast.loading('Removing exam...');

    try {
      await mutateAsync(row.original.id);

      toast.dismiss(toastId);
      toast.success('Exam removed');
    } catch (error) {
      toast.dismiss(toastId);

      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <button className="p-1" onClick={onClick}>
      <TrashIcon />
    </button>
  );
};
