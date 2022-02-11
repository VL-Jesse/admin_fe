import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useStyles } from "./styles";
import { IRows, ITable } from "./types";
import { v4 as uuidv4 } from "uuid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiEdit2Line } from "react-icons/ri";
import { defaultColor } from "../../Styles/defaultStyles";
import { useNavigate } from "react-router-dom";

export const TableComponet = ({
  headers,
  rows,
  path,
  deleteAction,
  fetchFilter,
  idName,
  total,
  rowsPerPage,
  page,
  setPage,
  setRowsPerPage,
  filter,
}: ITable) => {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFilter(rowsPerPage, page, fetchFilter);
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    fetchFilter(rowsPerPage, newPage, filter);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 0));
    setPage(0);
    fetchFilter(event.target.value, 0, filter);
  };

  return (
    <Paper variant="elevation" elevation={3} className={classes.table}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Object.values(headers).map((header: string) => {
                return (
                  <TableCell
                    key={uuidv4()}
                    align="center"
                    style={{ minWidth: 150 }}
                  >
                    <Typography variant="subtitle1" className={classes.title}>
                      {header}
                    </Typography>
                  </TableCell>
                );
              })}
              <TableCell key={uuidv4()} align="center">
                <Typography variant="subtitle1" className={classes.title}>
                  Edit
                </Typography>
              </TableCell>
              <TableCell key={uuidv4()} align="center">
                <Typography variant="subtitle1" className={classes.title}>
                  Delete
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row: IRows) => {
                return (
                  <TableRow key={uuidv4()}>
                    {Object.keys(headers).map((header: string) => {
                      return (
                        <TableCell key={uuidv4()} align="center">
                          {row[header]}
                        </TableCell>
                      );
                    })}
                    <TableCell key={uuidv4()} align="center">
                      <IconButton
                        onClick={() => navigate(`${path}?id=${row[idName]}`)}
                      >
                        <RiEdit2Line size={20} color={defaultColor.darkGray} />
                      </IconButton>
                    </TableCell>
                    <TableCell key={uuidv4()} align="center">
                      <IconButton onClick={() => deleteAction(row[idName])}>
                        <RiDeleteBin6Line
                          size={20}
                          color={defaultColor.darkGray}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            {rows === null && (
              <TableRow>
                <TableCell align="center" colSpan={10}>
                  <Typography variant="subtitle1">No available data</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableFooter>
      </TableContainer>
    </Paper>
  );
};
