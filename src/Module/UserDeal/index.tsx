import { Button, Grid } from "@material-ui/core";
import { TableComponet } from "../../Components/Table";
import { useStyles } from "./styles";
import { Sidebar } from "../../Components/Sidebar";
import { path } from "../../Routes/path";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { FormDialog } from "../../Components/FormDialog";
import { Notification } from "../../Components/Notification";
import { deleteUserDeals, fetchUserDeal} from "../../Actions/userDealAction";
import { useQuery } from "../../utils/getQuery";
import { clearDeals } from "../../Reducer/userDealReducer";
import { IoReturnDownBack } from "react-icons/io5";
import { IHeaderUserDeals } from "../../interface/userDealTypes";

const headers: IHeaderUserDeals = { title:"Deal", short_description: "Short description" }

export const UserDeal = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const idUser = useQuery(search, "id");
  const dataRows = useSelector((state: RootState ) => state.userDeals)
  const [ open, setOpen ] = useState<boolean>(false);
  const [ id, setId ] = useState<number | string>()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const validateAction = async (response: boolean) => {
    if (!id) return;
    if (response) {
      const response: any = await dispatch(deleteUserDeals(id));
      if (response.payload!.status === 200) {
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
    if(!id) return
    setOpen(true)
    setId(id)
  }

  const fetchFilter = (rowsPerPage: number, page:number) => {
    debugger
      if(!idUser) {
          return navigate(path.USER)
      }
    dispatch(fetchUserDeal({id: idUser, rowsPerPage, page}))
  }

  const backHandler = () => {
    dispatch(clearDeals());
    return navigate(path.USER);
  };

  return useMemo(() =>(
    <Sidebar>
      <Grid className={classes.container}>
        <Grid container className={classes.headerContainer}>
            <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={() => backHandler()}
              startIcon={<IoReturnDownBack/>}
            >Back to Users
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <TableComponet
            headers={headers}
            rows={dataRows.data}
            path={undefined}
            deleteAction={deleteAction}
            fetchFilter={fetchFilter}
            idName="userDealId"
            total={dataRows.total}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            filter={""}
            action={undefined}
            updateAction={false}
          />
        </Grid>
        <FormDialog open={open} validateAction={validateAction}/>
      </Grid>
    </Sidebar>
  ),[idUser, dataRows]);
};
