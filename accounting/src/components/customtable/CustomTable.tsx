/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Column {
  align?: string;
  name?: string | JSX.Element;
  id?: number;
  sort?: string;
}

interface CustomTableProps {
  columns?: Column[];
  rows?: any[];
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, rows }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ margin: "20px 0px 0px 0px", minHeight: "50vh" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
        <TableHead sx={{ backgroundColor: "#f2f2f2" }}>
          <TableRow>
            {columns?.map((item) => (
              <TableCell
                align={item?.align}
                key={item?.id}
                sx={{ fontWeight: "bold" }}
              >
                {item?.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              hover={true}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.keys(row).map((item, secondIndex) => (
                <TableCell key={secondIndex} align="center">
                  {row[item]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
