import { cn } from "@/utils";
import type { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  className?: string;
  centeredColumns?: number[];
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  isHeader?: boolean;
  className?: string;
}

const centeredHeaders = new Set([
  "Trạng thái",
  "Tình trạng",
  "STT",
  "Tồn kho",
  "Số lượng",
  "Số dòng",
  "Số buổi",
  "Số buổi/lượt",
  "Số lượt còn lại",
  "Còn lại",
  "Buổi PT",
  "Buổi hoàn thành",
  "Buổi bị hủy",
  "Điểm",
  "Điểm TB",
  "Số đánh giá",
  "Số hội viên",
  "Giá",
  "Giá bán",
  "Đơn giá",
  "Đơn giá nhập",
  "Đơn giá/buổi",
  "Thành tiền",
  "Số tiền",
  "Tổng tiền",
  "Giá trị nhập",
  "Chi tiêu năm",
  "Ưu đãi",
  "Lương cơ bản",
  "Hoa hồng",
  "Hoa hồng PT",
  "Quỹ lương",
  "Tổng",
  "Doanh thu",
  "Kỳ trước",
  "Thay đổi",
  "Lượt check-in",
  "Điều chuyển",
]);

export const getCenteredColumns = (headers: readonly string[]) =>
  headers.flatMap((header, index) =>
    centeredHeaders.has(header) ? [index] : [],
  );

const centeredColumnClasses = [
  "[&_tr>:nth-child(1)]:text-center",
  "[&_tr>:nth-child(2)]:text-center",
  "[&_tr>:nth-child(3)]:text-center",
  "[&_tr>:nth-child(4)]:text-center",
  "[&_tr>:nth-child(5)]:text-center",
  "[&_tr>:nth-child(6)]:text-center",
  "[&_tr>:nth-child(7)]:text-center",
  "[&_tr>:nth-child(8)]:text-center",
];

const Table: React.FC<TableProps> = ({
  children,
  className,
  centeredColumns = [],
}) => {
  return (
    <table
      className={cn(
        "min-w-full",
        centeredColumns.map((index) => centeredColumnClasses[index]),
        className,
      )}
    >
      {children}
    </table>
  );
};

const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return <thead className={cn(className, "bg-brand-50")}>{children}</thead>;
};

const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

const TableFooter: React.FC<TableBodyProps> = ({ children, className }) => {
  return <tfoot className={className}>{children}</tfoot>;
};

const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <tr className={className}>{children}</tr>;
};

const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className = "",
  ...props
}) => {
  const CellTag = isHeader ? "th" : "td";
  return (
    <CellTag
      className={cn(
        className,
        isHeader && "text-sm font-semibold text-brand-700",
      )}
      {...props}
    >
      {children}
    </CellTag>
  );
};

export { Table, TableBody, TableCell, TableHeader, TableRow, TableFooter };
