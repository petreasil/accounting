import { Box, Grid, ListItemButton, ListItemIcon } from "@mui/material";
import CustomTable from "../../components/customtable/CustomTable";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { columns } from "./data/columns";
import { useGetAllInvoicesQuery } from "../../slice/invoicesApiSlice";
import { mockData } from "./mockData";
import { Link } from "react-router-dom";

const Invoices = () => {
  const { data: AllInvoices } = useGetAllInvoicesQuery({ page: 1, limit: 10 });

  // const { data, meta } = AllInvoices ?? []; 403 from server

  const { data, meta } = mockData;
  console.log(data);
  const rows = data?.map((item: any) => {
    return {
      name: item?.contact_name ? (
        <Link to={`/home/invoices/${item.id}`}>{item?.contact_name}</Link>
      ) : (
        " -- "
      ),
      tip: item?.type ? item?.type : " -- ",
      included: item?.parent_name ? item?.parent_name : " -- ",
      min: item?.users_count ? item?.users_count : "--",
      last_edited: item?.updated_at ? item?.updated_at : "--",
      status: item?.status ? "activ" : "inactiv",
      date: item?.creted_at ? item?.created_at : "--",
    };
  });
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="flex-end"
          alignContent="center"
        >
          <Box sx={{ display: "flex" }}>
            <ListItemButton>
              <ListItemIcon>
                <PrintOutlinedIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <CreateOutlinedIcon />
              </ListItemIcon>
            </ListItemButton>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <CustomTable columns={columns} rows={rows} />
        </Grid>
      </Grid>
    </>
  );
};

export default Invoices;
