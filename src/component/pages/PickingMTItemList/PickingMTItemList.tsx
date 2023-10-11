import * as React from "react";
import {
  AddItemDSelected,
  AddItemHSelected,
  AddItemManual,
  SearchPickItemH,
  UpdateLocationPick,
  UpdatePickQty,
  pickingSelector,
} from "../../../store/slices/pickingSlice";
import { authSelector } from "../../../store/slices/authSlice";
import { useAppDispatch } from "../../../store/store";

import {
  DataGrid,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridRowModel,
  MuiEvent,
} from "@mui/x-data-grid";
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import {
  ReqIssueMaterialD,
  changLocationItemH,
} from "../../../types/issueMT.type";
import { useSelector } from "react-redux";
import {
  IssueMaterialD,
  IssueMaterialManual,
  PickingItemH,
  UpdatePickQtyM,
} from "../../../types/picking.type.tx";

import { Margin } from "@mui/icons-material";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useDebounce } from "@react-hook/debounce";
import QuickSearchToolbar from "../../QuickSearchToolbar";

type PickingMTItemListProps = {
  handlegetdataDetail: any;
};

const PickingMTItemList: React.FC<PickingMTItemListProps> = (props) => {
  const pickingReducer = useSelector(pickingSelector);
  const authReducer = useSelector(authSelector);

  const dispatch = useAppDispatch();

  const [keywordSearch, setKeywordSearch] = useDebounce<string>("", 1000);
  const [keywordSearchNoDelay, setKeywordSearchNoDelay] =
    React.useState<string>("");

  React.useEffect(() => {
    // dispatch(stockActions.loadStockByKeyword(keywordSearch));
    dispatch(SearchPickItemH(keywordSearch));
  }, [keywordSearch]);

  const locationdetail = (value: PickingItemH) => {
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value.location}
          label=""
          onChange={(event: SelectChangeEvent) => {
            event.preventDefault();

            // console.log(event.target.value);

            const selectedRows = pickingReducer.PickingItemH.filter(
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

                dispatch(UpdateLocationPick(_data));
              });
            }
          }}
        >
          {pickingReducer.LocationPick.map((item, index) => (
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
      field: "buy",
      headerName: "Buy",
      headerAlign: "center",
      align: "center",
      width: 100,
    },

    {
      field: "itemCode",
      headerName: "ItemCode",
      headerAlign: "center",
      align: "left",
      width: 180,
    },
    {
      field: "itemName",
      headerName: "ItemName",
      headerAlign: "center",
      align: "left",

      width: 400,
    },
    {
      field: "uomName",
      headerName: "UOM",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "color",
      headerName: "Color",
      headerAlign: "center",
      align: "left",
      width: 200,
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "onhand",
      headerName: "Onhand",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "onhandWH",
      headerName: "OnhandWH",
      headerAlign: "center",
      align: "center",
      width: 150,
    },

    {
      field: "plandQty",
      headerName: "PlandQty",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "pickQty",
      headerName: "PickQty",
      headerAlign: "center",
      align: "center",
      width: 150,
      editable: true,
    },
    {
      field: "issueQty",
      headerName: "IssueQty",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "location",
      headerName: "Location",
      headerAlign: "center",
      align: "center",
      width: 150,
      editable: true,
      renderCell: ({ row }: GridRenderCellParams<any>) => locationdetail(row),
    },
    {
      headerName: "Detail",
      headerAlign: "center",
      field: ".pd",
      width: 80,
      align: "center",
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <IconButton
          aria-label="Maincard"
          color="primary"
          size="small"
          onClick={async (e: React.ChangeEvent<any>) => {
            e.preventDefault();

            //console.log(row.id);
            var ids = row.id;

            const selectedRows = pickingReducer.PickingItemH.filter(
              (row) => row.id === ids
            );

            selectedRows.map((obj) => {
              props.handlegetdataDetail(obj);
            });
          }}
        >
          <ViewListIcon fontSize="inherit" />
        </IconButton>
      ),
    },
  ];

  const handleProcessRowUpdate = async (
    updatedRow: GridRowModel,
    originalRow: GridRowModel
  ) => {
    // Find the index of the row that was edited

    console.log(updatedRow.pickQty);
    let _data1 = pickingReducer.PickingItemH.map((obj) => {
      let _pickqty =
        obj.id === updatedRow.id ? Number(updatedRow.pickQty) : obj.pickQty;

      const _result: PickingItemH = {
        id: obj.id,
        buy: obj.buy,
        location: obj.location,
        itemCode: obj.itemCode,
        itemName: obj.itemName,
        uomName: obj.uomName,
        color: obj.color,
        warehouse: obj.warehouse,
        baseQty: obj.baseQty,
        onhand: obj.onhand,
        onhandWH: obj.onhandWH,
        plandQty: obj.plandQty,
        pickQty: _pickqty,
        issueQty: obj.issueQty,
        confirmQty: obj.confirmQty,
        pickingItemD: obj.pickingItemD,
      };

      return _result;
    });
    console.log(_data1);

    await dispatch(UpdatePickQty(_data1));

    // const rowIndex = pickingReducer.PickingItemH.findIndex((row) => row.id === updatedRow.id);

    // // Replace the old row with the updated row
    // const updatedRows = [...rows];
    // updatedRows[rowIndex] = updatedRow;

    // // Update the state with the new rows
    // setRows(updatedRows);

    // Return the updated row to update the internal state of the DataGrid
    return updatedRow;
  };

  const handleProcessRowUpdateError = (error: Error) => {};

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        overflowX: "scroll",
      }}
    >
      <DataGrid
        rowHeight={30}
        checkboxSelection
        // isRowSelectable={(param: GridRowParams) => param.row.chkreqIss === true}
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);

          const selectedRows = pickingReducer.PickingItemH.filter((row) =>
            selectedIDs.has(row.id)
          );

          let _result: IssueMaterialD[] = [];

          selectedRows.map((obj) => {
            obj.pickingItemD.map((ob) => {
              const _data: IssueMaterialD = {
                id: 0,
                issueHid: ob.issueHid,
                buy: ob.buy,
                lot: ob.lot,
                reqHid: ob.reqHid,
                reqDid: ob.reqDid,
                pdhid: ob.pdhid,
                pddid: ob.pddid,
                lineNum: ob.lineNum,
                itemCode: ob.itemCode,
                itemName: ob.itemName,
                uomName: ob.uomName,
                warehouse: ob.warehouse,
                issueMethod: "PD",
                baseQty: ob.baseQty,
                plandQty: ob.plandQty,
                pickQty: ob.pickQty,
                issueQty: ob.issueQty,
                confirmQty: ob.confirmQty,
                createBy: authReducer.account.iss,
                createDate: new Date().toLocaleDateString("sv"),
                updateBy: "",
                updateDate: null,
                status: "A",
                itemCodeRef: "",
                itemNameRef: "",
                location: ob.location,
              };
              _result = [..._result, _data];
            });
            // console.log(_dtadetail);
          });

          dispatch(AddItemDSelected(_result));

          const _issManualList = selectedRows
            .filter((f) => f.pickQty > f.plandQty)
            .map((obj) => {
              const _data: IssueMaterialManual = {
                id: 0,
                issueHid: 0,
                buy: obj.buy,
                lot: pickingReducer.IssueMTH.lotlist,
                itemCode: obj.itemCode,
                itemName: obj.itemName,
                warehouse: obj.warehouse,
                issueMethod: "Manual",
                baseQty: obj.baseQty,
                plandQty: obj.plandQty,
                pickQty: obj.pickQty - obj.plandQty,
                issueQty: 0,
                confirmQty: 0,
                createBy: authReducer.account.iss,
                createDate: new Date().toLocaleDateString("sv"),
                updateBy: "",
                updateDate: null,
                status: "A",
                convertSap: 0,
                docEntry: 0,
                docNum: "",
                location: pickingReducer.IssueMTH.location,
              };

              return _data;
            });

          dispatch(AddItemManual(_issManualList));

          dispatch(AddItemHSelected(selectedRows));
        }}
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        // onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
        //   // console.log(params.value);
        //   // console.log(params.row);

        //   if (params.reason === GridCellEditStopReasons.cellFocusOut) {
        //     event.defaultMuiPrevented = true;

        //   }
        // }}
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
        keepNonExistentRowsSelected
        rows={
          pickingReducer.PickingItemHSearch.length > 0
            ? pickingReducer.PickingItemHSearch
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

export default PickingMTItemList;
