import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../axios'
import axioss from 'axios'


export enum Status {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error'
}

type NamesType = {
  id: number
  symbol: string
  partner_symbol: string
  data_available_from: number
}

type ItemType = {
  name: string
  price: number
}

interface InitialStateType {
  names: {
    items: NamesType[]
    status: Status
  }
  values: {
    items: ItemType[]
    status: Status
  }
}

export const fetchNames= createAsyncThunk(
  'crypto/fetchNames',
  async () => {
    const {data} = await axioss.get('https://min-api.cryptocompare.com/data/blockchain/list?api_key=9f87f81c83620862e348d58f61daee1a6c5b3f72c8cfb2e8cf126f5932cdefb7')
    return data as NamesType[]
  }
)

export const fetchCrypto = createAsyncThunk(
  'crypto/fetchCrypto',
  async (name: string) => {
    const {data} = await axios.get(`/price?fsym=${name}&tsyms=USD`)
    console.log(data)
    const item = {
      name,
      price: data.USD
    }
    return item as ItemType
  }
)

const initialState: InitialStateType = {
  names: {
    items: [],
    status: Status.LOADING
  },
  values: {
    items: [],
    status: Status.LOADING
  }
}

const cryptoSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    deleteCrypto(state, action) {
      state.values.items = state.values.items.filter((el, index) => index !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNames.pending, (state) => {
      state.names.items = [];
      state.names.status = Status.LOADING;
    })
    builder.addCase(fetchNames.fulfilled, (state, action: PayloadAction<NamesType[]>) => {
      state.names.items = action.payload
      state.names.status = Status.LOADED;
    })
    builder.addCase(fetchNames.rejected, (state) => {
      state.names.items = [];
      state.names.status = Status.ERROR;
    })
    builder.addCase(fetchCrypto.pending, (state) => {
      state.values.status = Status.LOADING;
    })
    builder.addCase(fetchCrypto.fulfilled, (state, action: PayloadAction<ItemType>) => {
      state.values.items.push(action.payload)
      state.values.status = Status.LOADED;
    })
    builder.addCase(fetchCrypto.rejected, (state) => {
      state.values.status = Status.ERROR;
    })
  },
});

export const { deleteCrypto } = cryptoSlice.actions;

export default cryptoSlice.reducer;