import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import { TableComponet } from "../../Components/Table";
import { useStyles } from "./styles";
import { Sidebar } from "../../Components/Sidebar";
import { BiSearch, BiDownload } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { path } from "../../Routes/path";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IHeaderUser } from "../../interface/userTypes";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { clearEditUser } from "../../Reducer/userReducer";
import { useNavigate } from "react-router-dom";
import { FormDialog } from "../../Components/FormDialog";
import { Notification } from "../../Components/Notification";
import { CSVLink } from "react-csv";
import { defaultColor } from "../../Styles/defaultStyles";
import { deleteUser, exportUser, getAllData } from "../../Actions/userAction";

const headers: IHeaderUser = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
};

export const Users = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const data = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | string>();
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(exportUser());
  }, []);

  const validateAction = async (response: boolean) => {
    if (!id) return;
    if (response) {
      const response: any = await dispatch(deleteUser(id));
      if (response.payload!.status) {
        Notification({
          title: "Success",
          message: "User deleted",
          type: "success",
        });
        return navigate(0);
      }
    }
    setOpen(false);
  };

  const deleteAction = (id: string | number) => {
    if (!id) return;
    setOpen(true);
    setId(id);
  };

  const fetchFilter = (rowsPerPage: number, page: number) => {
    dispatch(getAllData({ rowsPerPage, page, filter }));
  };

  const createHandler = () => {
    dispatch(clearEditUser());
    navigate(path.USERCREATE);
  };

  return (
    <Sidebar>
      <Grid className={classes.container}>
        <Grid container className={classes.headerContainer}>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => createHandler()}
              startIcon={<FiPlus />}
            >
              Add new user
            </Button>
          </Grid>
          <Grid>
            <TextField
              variant="outlined"
              label="Search User"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilter(e.target.value)
              }
            ></TextField>
            <IconButton
              color="inherit"
              aria-label="search"
              onClick={() => fetchFilter(rowsPerPage, 0)}
            >
              <BiSearch />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TableComponet
            headers={headers}
            rows={data.data}
            path={path.USEREDIT}
            deleteAction={deleteAction}
            fetchFilter={fetchFilter}
            idName="userId"
            total={data.total}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            filter={filter}
          />
        </Grid>
        <Grid className={classes.container}>
          <CSVLink color={defaultColor.white} data={data.download as any} separator=";" filename={"users.csv"}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<BiDownload />}
            >
              Export list to CSV file
            </Button>
          </CSVLink>
        </Grid>
        <FormDialog open={open} validateAction={validateAction} />
      </Grid>
    </Sidebar>
  );
};
