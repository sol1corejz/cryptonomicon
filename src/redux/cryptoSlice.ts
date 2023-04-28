import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../axios'
import axioss from 'axios'


export enum Status {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error'
}

export type ItemType = {
  name: string
  price: number
}

interface InitialStateType {
  names: {
    items: string[]
    status: Status
  }
  values: {
    items: ItemType[]
    status: Status
  }, 
  chosenElemenet: null | number,
  graph: number[]
}

export const fetchNames= createAsyncThunk(
  'crypto/fetchNames',
  async () => {
    const {data} = await axioss.get('https://min-api.cryptocompare.com/data/blockchain/list?api_key=9f87f81c83620862e348d58f61daee1a6c5b3f72c8cfb2e8cf126f5932cdefb7')
    let convertedItems: string[] = [];
    for (var key in data.Data) {
      convertedItems.push(key);
    }
    return convertedItems;
  }
)

export const fetchCrypto = createAsyncThunk(
  'crypto/fetchCrypto',
  async (name: string) => {
    const {data} = await axios.get(`/price?fsym=${name.toUpperCase()}&tsyms=USD`)
    const item = {
      name: name.toUpperCase(),
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
  },
  chosenElemenet: null,
  graph: []
}

const cryptoSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    deleteCrypto(state, action) {
      state.values.items = state.values.items.filter((el, index) => index !== action.payload)
    },
    chooseElement(state, action) {
      state.chosenElemenet = action.payload
      state.graph = []
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchNames.pending, (state) => {
      state.names.items = [];
      state.names.status = Status.LOADING;
    })
    builder.addCase(fetchNames.fulfilled, (state, action: PayloadAction<string[]>) => {
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
      if(state.values.items.filter( el => el.name === action.payload.name).length){
        if(state.chosenElemenet !==null && action.payload.name === state.values.items[state.chosenElemenet].name){
          state.graph.push(action.payload.price);
        } 
        state.values.items.filter( el => el.name === action.payload.name)[0].price = action.payload.price;
      } else {
        state.values.items.push(action.payload);
        state.graph.push(action.payload.price);
      } 
      state.values.status = Status.LOADED;
      
    })
    builder.addCase(fetchCrypto.rejected, (state) => {
      state.values.status = Status.ERROR;
    })
  },
});

export const { deleteCrypto, chooseElement } = cryptoSlice.actions;

export default cryptoSlice.reducer;