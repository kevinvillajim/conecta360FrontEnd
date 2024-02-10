import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function DataTable({
  rows,
  columns,
  selectedRows,
  onSelectionChange,
}) {
  const selectedRowsRef = useRef([]);

  const handleSelectionChange = (newSelection) => {
    selectedRowsRef.current = newSelection;
    onSelectionChange(newSelection);
  };

  useEffect(() => {
    selectedRowsRef.current = selectedRows;
  }, [selectedRows]);

  return (
    <div style={{ height: 426, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
        selectionModel={selectedRowsRef.current}
        onSelectionModelChange={handleSelectionChange}
      />
    </div>
  );
}

DataTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  selectedRows: PropTypes.array,
  onSelectionChange: PropTypes.func,
};
