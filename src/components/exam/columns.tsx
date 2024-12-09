'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { ColumnDef, Row } from '@tanstack/react-table';
import { toast } from 'sonner';

import { Exam } from '@/app/database/entities/exam.entity';
import { useRemoveExam } from '@/app/hooks/mutate/use-remove-exam';
import { Campaign } from '@/app/database/entities/campaign.entity';

export const columnsExam: ColumnDef<Campaign>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="min-w-[150px]">Назва</div>,
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: 'manager',
    header: () => <div className="">Менеджер</div>,
    cell: ({ row }) => <div>{row.original.manager.name}</div>,
  },
  {
    accessorKey: 'startDate',
    header: () => <div className="">Час початку</div>,
    cell: ({ row }) => <div>{row.original.startDate}</div>,
  },
  {
    accessorKey: 'endDate',
    header: () => <div className="">Час кінця</div>,
    cell: ({ row }) => <div>{row.original.endDate}</div>,
  },
  {
    accessorKey: 'action',
    header: () => '',

    cell: ({ row }) => <ActionCell row={row} />,
  },
];

export const ActionCell = ({ row }: { row: Row<Campaign> }) => {
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
