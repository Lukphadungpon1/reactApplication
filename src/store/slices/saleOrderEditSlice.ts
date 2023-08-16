import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  SOResultByID,
  SaleOrderD,
  SaleOrderDetailExcel,
  saleOrderRequest,
} from "../../types/saleOrder.type";
import { header, httpClient } from "../../utils/httpclient";
import { TOKEN, apiUrl } from "../../constants/Constants";
import axios from "axios";
import { act } from "react-dom/test-utils";

export interface SaleOrderEditState {
  isFetching: boolean;
  isError: boolean;
  message: any;
  saleorderRequest: saleOrderRequest;
  excelDetail: SaleOrderDetailExcel[];
}

const dfdata: saleOrderRequest = {
  DocEntry: 0,
  SoNumber: "0",
  CardCode: "",
  CardName: "",
  Currency: "",
  BuyYear: "",
  BuyMonth: "",
  DocStatus: "D",
  SaleTypes: "",
  DeliveryDate: new Date().toISOString().slice(0, 10),
  Remark: "",
  FormFiles: null,
};

const initialState: SaleOrderEditState = {
  isFetching: false,
  isError: false,
  message: null,
  saleorderRequest: dfdata,
  excelDetail: [],
};

export const SOEditAdd = createAsyncThunk(
  "saleOrderEdit/Add",
  async (values: saleOrderRequest) => {
    let fmData = new FormData();
    fmData.append("DocEntry", String(values.DocEntry));
    fmData.append("SoNumber", values.SoNumber);

    fmData.append("CardCode", values.CardCode);
    fmData.append("CardName", values.CardName);
    fmData.append("Currency", values.Currency);
    fmData.append("Buy", values.BuyYear + values.BuyMonth);
    fmData.append("DocStatus", values.DocStatus);
    fmData.append("SaleTypes", values.SaleTypes);
    fmData.append("DeliveryDate", values.DeliveryDate);
    fmData.append("Remark", values.Remark!);
    fmData.append("FormFiles", values.FormFiles);
    console.log(fmData);

    const job = new Promise<string>((resolve, rejectWithValue) => {
      httpClient
        .post("/SaleOrder/AddSaleOrder", fmData, header())
        .then((result) => {
          resolve(result.data);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });
    return await job;
  }
);

export const SOEditUpdateDB = createAsyncThunk(
  "saleOrderEdit/Update",
  async ({ id, values }: { id: Number; values: saleOrderRequest }) => {
    //console.log(values);
    let fmData = new FormData();
    fmData.append("DocEntry", String(values.DocEntry));
    fmData.append("SoNumber", values.SoNumber);

    fmData.append("CardCode", values.CardCode);
    fmData.append("CardName", values.CardName);
    fmData.append("Currency", values.Currency);
    fmData.append("Buy", values.BuyYear + values.BuyMonth);
    fmData.append("DocStatus", values.DocStatus);
    fmData.append("SaleTypes", values.SaleTypes);
    fmData.append("DeliveryDate", values.DeliveryDate);
    fmData.append("Remark", values.Remark!);
    fmData.append("FormFiles", values.FormFiles);
    console.log(fmData);

    const job = new Promise<string>((resolve, rejectWithValue) => {
      httpClient
        .put("/SaleOrder/" + id, fmData, header())
        .then((result) => {
          resolve(result.data);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });
    return await job;
  }
);

export const SOEditDelDB = createAsyncThunk(
  "saleOrderEdit/Delete",
  async (id: Number) => {
    const job = new Promise<string>((resolve, rejectWithValue) => {
      httpClient
        .delete("/SaleOrder/" + id, header())
        .then((result) => {
          resolve(result.data);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });
    return await job;
  }
);

export const SOEditGeyByID = createAsyncThunk(
  "saleOrderEdit/GetID",
  async (id: Number) => {
    const job = new Promise<SOResultByID>((resolve, rejectWithValue) => {
      httpClient
        .get("/SaleOrder/" + id, header())
        .then((result) => {
          // console.log(result.data);
          resolve(result.data);
        })
        .catch((error) => {
          rejectWithValue(error.response.data);
        });
    });
    return await job;
  }
);

export const SaleOrderExcelDatadetail = createAsyncThunk(
  "saleOrder/GetSODetailFExcel",
  async (value: SaleOrderDetailExcel[]) => {
    const job = new Promise<SaleOrderDetailExcel[]>(
      (resolve, rejectWithValue) => {
        httpClient
          .post<any>("/SaleOrder/GetSODetailFExcel", value, header())
          .then((result) => {
            resolve(result.data);
            //   resolve(dataresult);
          })
          .catch((error) => {
            rejectWithValue(error.response.data);
          });
      }
    );

    return await job;
  }
);

export const SOEditGetFile = createAsyncThunk(
  "saleOrderEdit/GetFile",
  async () => {
    const token = localStorage.getItem(TOKEN);

    const job = new Promise<ArrayBuffer>((resolve, rejectWithValue) => {
      axios
        .get(
          apiUrl +
            "/SaleOrder/DownloadSoDetailFile?filename=0cabc3df-2b5d-4530-9a29-af17bf8c599e.xlsx&sonumber=SO20230201234",
          {
            headers: {
              "Content-Disposition": "attachment; filename=template.xlsx",
              "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              Authorization: `Bearer ${token}`,
            },
            responseType: "arraybuffer",
          }
        )
        .then((response) => {
          resolve(response.data);

          // const url = window.URL.createObjectURL(new Blob([response.data]));
          // const link = document.createElement("a");
          // link.href = url;
          // link.setAttribute("download", "template.xlsx");
          // document.body.appendChild(link);
          // link.click();
        })
        .catch((error) => rejectWithValue(error.response.data));

      // httpClient
      //   .get(
      //     "/SaleOrder/DownloadSoDetailFile?filename=0cabc3df-2b5d-4530-9a29-af17bf8c599e.xlsx&sonumber=SO20230201234",
      //     config
      //   )
      //   .then((result) => {
      //     // console.log(result.data);
      //     resolve(result.data);
      //   })
      //   .catch((error) => {
      //     rejectWithValue(error.response.data);
      //   });
    });
    return await job;
  }
);

export const SOEditCVSAP = createAsyncThunk(
  "saleOrderEdit/ConvertToSAP",
  async (id: number) => {
    const param = {
      id: id,
    };

    const job = new Promise<any>((resolve, rejectWithValue) => {
      httpClient
        .post<any>("/SaleOrder/ConvertSaleOrderToSAP", param, header())
        .then((result) => {
          resolve(result.data);
        })
        .catch((error) => {
          console.log(error.response.data);

          rejectWithValue(error.response.data);
        });
    });

    return await job;
  }
);

const saleOrderEditSlice = createSlice({
  name: "saleOrderEdit",
  initialState,
  reducers: {
    SOEditClearData: (state: SaleOrderEditState) => {
      state.isError = false;
      state.isFetching = false;
      state.message = null;
      state.saleorderRequest = dfdata;
      state.excelDetail = [];
    },
    SOEditFetchine: (
      state: SaleOrderEditState,
      action: PayloadAction<void>
    ) => {
      state.isFetching = true;
    },
    SOEditUpdate: (
      state: SaleOrderEditState,
      action: PayloadAction<saleOrderRequest>
    ) => {
      let aaa = (state.saleorderRequest = action.payload);
      //console.log(aaa);
      state = { ...state, saleorderRequest: aaa };
    },
    SOEditUpdateCus: (
      state: SaleOrderEditState,
      action: PayloadAction<{
        CardCode: string;
        CardName: string;
        Currency: string;
      }>
    ) => {
      state.saleorderRequest = {
        ...state.saleorderRequest,
        CardCode: action.payload.CardCode,
        CardName: action.payload.CardName,
        Currency: action.payload.Currency,
      };
    },
  },

  extraReducers: (builder) => {
    //// Add SO
    builder.addCase(SOEditAdd.fulfilled, (state, action) => {
      state.saleorderRequest = {
        ...state.saleorderRequest,
        SoNumber: action.payload,
      };
      state.isFetching = false;
      state.isError = false;
      state.message = "Create Sale Order Complete..";
    });
    builder.addCase(SOEditAdd.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SOEditAdd.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading...";
    });

    //// Delete SO
    builder.addCase(SOEditDelDB.fulfilled, (state, action) => {
      state.saleorderRequest = {
        ...state.saleorderRequest,
        SoNumber: action.payload,
      };
      state.isFetching = false;
      state.isError = false;
      state.message = "Delete Sale Order Complete..";
    });
    builder.addCase(SOEditDelDB.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SOEditDelDB.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading...";
    });

    //// Update SO
    builder.addCase(SOEditUpdateDB.fulfilled, (state, action) => {
      state.saleorderRequest = {
        ...state.saleorderRequest,
        SoNumber: action.payload,
      };
      state.isFetching = false;
      state.isError = false;
      state.message = "Update Sale Order Complete..";
    });
    builder.addCase(SOEditUpdateDB.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SOEditUpdateDB.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading...";
    });

    /////get By ID
    builder.addCase(SOEditGeyByID.fulfilled, (state, action) => {
      const _data = action.payload;

      state.saleorderRequest = {
        ...state.saleorderRequest,
        SoNumber: _data.soNumber,
        DocEntry: _data.docEntry,
        CardCode: _data.cardCode,
        CardName: _data.cardName,
        Currency: _data.currency,
        BuyYear: _data.buy.substring(0, 4),
        BuyMonth: _data.buy.substring(4, 6),
        DocStatus: _data.docStatus,
        SaleTypes: _data.saleTypes,
        DeliveryDate: _data.deliveryDate.toString().substring(0, 10),
        Remark: _data.remark ? _data.remark : "",
      };
      console.log(_data.saleOrderD);
      //let _dataDetail: SaleOrderDetailExcel[] = [];
      state.excelDetail = [];

      _data.saleOrderD.map((item, index) => {
        let _data: SaleOrderDetailExcel = {
          id: index,
          itemCode: item.itemCode,
          style: item.style,
          quantity: item.quantity,
          shipToCode: String(item.shipToCode),
          shipToDesc: item.shipToDesc,
          poNumber: String(item.poNumber),
          width: item.width,
          status: item.lineStatus,
          colors: item.colors,
          category: item.category,
          gender: item.gender,
        };
        state.excelDetail = [...state.excelDetail, _data];
      });

      //console.log(state.excelDetail);

      state.isFetching = false;
      state.isError = false;
      state.message = "Get Sale Order Complete..";
    });
    builder.addCase(SOEditGeyByID.rejected, (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SOEditGeyByID.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading...";
    });

    //// get SaleOrderExcelDatadetail
    builder.addCase(SaleOrderExcelDatadetail.fulfilled, (state, action) => {
      state.excelDetail = action.payload;
      state.isFetching = false;
      state.isError = false;
      state.message = "OK";
    });
    builder.addCase(SaleOrderExcelDatadetail.rejected, (state, action) => {
      state.excelDetail = [];
      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SaleOrderExcelDatadetail.pending, (state, action) => {
      state.isFetching = true;
    });

    //// get Convert To SAP
    builder.addCase(SOEditCVSAP.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.message = "Convert to SAP Complete.";
    });
    builder.addCase(SOEditCVSAP.rejected, (state, action) => {
      //console.log(action.error.message);

      state.isFetching = false;
      state.isError = true;
      state.message = action.error.message;
    });
    builder.addCase(SOEditCVSAP.pending, (state, action) => {
      state.isFetching = true;
      state.message = "Loading...";
    });
  },
});

export const { SOEditFetchine, SOEditUpdate, SOEditClearData } =
  saleOrderEditSlice.actions;
export const saleOrderEditSelector = (store: RootState) =>
  store.saleOrderEditReducer;
export default saleOrderEditSlice.reducer;
