import { Button, Grid, IconButton, TextField } from "@material-ui/core";
import { TableComponet } from "../../Components/Table";
import { useStyles } from "./styles";
import { Sidebar } from "../../Components/Sidebar";
import { BiSearch, BiDownload } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { path } from "../../Routes/path";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IHeaderOnlineDeals } from "../../interface/onlineDealsTypes";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { FormDialog } from "../../Components/FormDialog";
import { defaultColor } from "../../Styles/defaultStyles";
import { CSVLink } from "react-csv";
import { Notification } from "../../Components/Notification";
import { deleteOnlineDeals, exportOnlineDeals, fecthOnlineDeals } from "../../Actions/onlineDealAction";

const headers: IHeaderOnlineDeals = {businessName: "Business Name", title:"Deal"}

export const OnlineDeals = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const dataRows = useSelector((state: RootState ) => state.onlineDeals)
  const [ open, setOpen ] = useState<boolean>(false);
  const [ id, setId ] = useState<number | string>()
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(exportOnlineDeals());
  }, []);

  const validateAction = async (response: boolean) => {
    if (!id) return;
    if (response) {
      const response: any = await dispatch(deleteOnlineDeals(id));
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
    dispatch(fecthOnlineDeals({rowsPerPage, page, filter}))
  }

  return (
    <Sidebar>
      <Grid className={classes.container}>
        <Grid container className={classes.headerContainer}>
          <Grid>
          <Button
              variant="contained"
              color="primary"
              onClick={()=>navigate(path.ONLINEDEALSCREATE) }
              startIcon={<FiPlus/>}
            >
              Add Online Deal
            </Button>
          </Grid>
          <Grid>
            <TextField
              variant="outlined"
              label="Search Online Deal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setFilter(e.target.value)}
            ></TextField>
            <IconButton color="inherit" aria-label="search" onClick={()=>fetchFilter(rowsPerPage, 0)}>
              <BiSearch />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <TableComponet
            headers={headers}
            rows={dataRows.data}
            path={path.ONLINEDEALSEDIT}
            deleteAction={deleteAction}
            fetchFilter={fetchFilter}
            idName="onlineDealId"
            total={dataRows.total}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            filter={filter}
            action={undefined}
          />
        </Grid>
        <Grid className={classes.container}>
        <CSVLink color={defaultColor.white} data={dataRows.download as any} separator=";" filename={"onlineDeals.csv"}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<BiDownload />}
            >
              Export list to CSV file
            </Button>
          </CSVLink>
          </Grid>
        <FormDialog open={open} validateAction={validateAction}/>
      </Grid>
    </Sidebar>
  );
};
