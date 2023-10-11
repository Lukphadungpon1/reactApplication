import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import * as React from "react";
import { useSelector } from "react-redux";
import {
  AddItemSelected,
  SearchItemIssue,
  UpdatelocatinItemDetail,
  requestissueMTSelector,
} from "../../../store/slices/RequestissueMTSlice";
import { useAppDispatch } from "../../../store/store";
import { useDebounce } from "@react-hook/debounce";
import QuickSearchToolbar from "../../QuickSearchToolbar";
import CustomSelecte from "../../CustomSelecte";
import {
  ReqIssueMaterialD,
  RequestIssueMTItemListH,
  changLocationItemH,
} from "../../../types/issueMT.type";
import { deprecate } from "util";
import { AddLottoListGenMC } from "../../../store/slices/generateMCandPDSlice";
import { authSelector } from "../../../store/slices/authSlice";

type RequestMTItemListProps = {
  //
};

const RequestMTItemList: React.FC<any> = () => {
  const requestissueMTReducer = useSelector(requestissueMTSelector);
  const authReducer = useSelector(authSelector);

  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SearchItemIssue(keywordSearch));
  }, [keywordSearch]);

  const locationdetail = (value: RequestIssueMTItemListH) => {
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value.department}
          label=""
          onChange={(event: SelectChangeEvent) => {
            event.preventDefault();

            // console.log(event.target.value);

            const selectedRows = requestissueMTReducer.ItemReqIssueH.filter(
              (row) => row.id === value.id
            );

            if (event.target.value !== "") {
              selectedRows.map((obj) => {
                //console.log(obj);

                const _data: changLocationItemH = {
                  id: obj.id,
                  department: event.target.value,
                  chkReqIss: false,
                };

                dispatch(UpdatelocatinItemDetail(_data));
              });
            }
          }}
        >
          {requestissueMTReducer.LocationIssue.map((item, index) => (
            <MenuItem value={item.code} key={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const rows: any = [];
  const columns: GridColDef[] = [
    {
      headerName: "id",
      headerAlign: "center",
      field: "id",
      width: 50,
      // hideable: false,
    },

    {
      field: "itemCode",
      headerName: "ItemCode",
      headerAlign: "center",
      width: 180,
    },
    {
      field: "itemName",
      headerName: "Item Name",
      headerAlign: "center",
      width: 400,
    },
    {
      field: "color",
      headerName: "Color",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "plandQty",
      headerName: "Qty",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "uomName",
      headerName: "UOM",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "department",
      headerName: "Location",
      headerAlign: "center",
      align: "center",
      width: 150,
      editable: true,
      renderCell: ({ row }: GridRenderCellParams<any>) => locationdetail(row),
    },
    {
      field: "onhand",
      headerName: "Onhand",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "whsCode",
      headerName: "WH Code",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "onhandDFwh",
      headerName: "Onhand WH_Code",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
  ];

  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  return (
    <Box sx={{ height: "100%", overflowX: "scroll" }}>
      <DataGrid
        rowHeight={30}
        checkboxSelection
        // isRowSelectable={(param: GridRowParams) => param.row.chkreqIss === true}
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);

          const selectedRows = requestissueMTReducer.ItemReqIssueH.filter(
            (row) => selectedIDs.has(row.id)
          );

          // console.log(selectedRows);

          let _result: ReqIssueMaterialD[] = [];

          selectedRows.map((obj) => {
            obj.itemD.map((ob) => {
              const _data: ReqIssueMaterialD = {
                id: 0,
                pdhid: ob.pdhid,
                pddid: ob.id,
                lineNum: ob.lineNum,
                itemCode: ob.itemCode,
                itemName: ob.itemName,
                location: ob.department,
                createBy: authReducer.account.iss,
                createDate: new Date().toLocaleDateString("sv"),
                updateBy: "",
                updateDate: new Date().toLocaleDateString("sv"),
                status: "A",
              };

              _result.push(_data);
            });
            // console.log(_dtadetail);
          });

          // console.log(selectedItemD);

          //setselectedItemD(_data1);

          dispatch(AddItemSelected(_result));
          //console.log(requestissueMTReducer.RequestissueMTH.reqIssueMaterialDs);
          // dispatch(AddItemSelected(_data1));

          // setRowSelectionModel(ids);
          // console.log(rowSelectionModel);
          // const selectedRows = requestissueMTReducer.ItemReqIssueHSearch.filter(
          //   (row) => selectedIDs.has(row.id)
          // );

          // console.log(selectedIDs);
        }}
        //rowSelectionModel={rowSelectionModel}
        keepNonExistentRowsSelected
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            value: keywordSearchNoDelay,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setKeywordSearch(e.target.value);
              setKeywordSearchNoDelay(e.target.value);
            },
            clearSearch: () => {
              setKeywordSearch("");
              setKeywordSearchNoDelay("");
            },
          },
        }}
        rows={
          requestissueMTReducer.ItemReqIssueHSearch.length > 0
            ? requestissueMTReducer.ItemReqIssueHSearch
            : rows
        }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
          columns: {
            columnVisibilityModel: { id: false },
          },
        }}
        pageSizeOptions={[25, 50, 70]}

        // onRowDoubleClick={}
      ></DataGrid>
    </Box>
  );
};

export default RequestMTItemList;
