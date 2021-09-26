import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  ApartmentService,
  APARTMENT_FETCH_LIMIT,
  CreateApartmentParams,
  SearchApartmentQueryParams,
  UpdateApartmentParams
} from '@services/ApartmentService';

import { RootState } from 'store';
import { Apartment } from 'types';

const apartmentsAdapter = createEntityAdapter<Apartment>({
  selectId: (apartment) => apartment._id
});

type SearchParams = Omit<SearchApartmentQueryParams, 'index'>;

interface ExtraInitialState {
  searchParams: SearchParams;
  isLoading: boolean;
  pageSize: number;
  canFetchMore: boolean;
}

const extraInitialState: ExtraInitialState = {
  searchParams: {},
  isLoading: false,
  pageSize: 0,
  canFetchMore: true
};

const initialState = apartmentsAdapter.getInitialState(extraInitialState);

export const searchApartments = createAsyncThunk<
  Apartment[],
  SearchParams,
  { state: RootState }
>('apartments/search', async (params, { getState, dispatch }) => {
  const searchParams = { ...getState().apartments.searchParams, ...params };

  dispatch(apartmentsSlice.actions.setSearchParams(searchParams));

  const apartments = await ApartmentService.searchApartments({
    ...searchParams,
    index: 0
  });

  return apartments;
});

export const loadMoreApartments = createAsyncThunk<
  Apartment[],
  void,
  { state: RootState }
>('apartments/loadMore', async (_, { getState }) => {
  const {
    apartments: { searchParams, canFetchMore, pageSize }
  } = getState();

  if (!canFetchMore) throw new Error('Cannot fetch more');

  const apartments = await ApartmentService.searchApartments({
    ...searchParams,
    index: pageSize + 1
  });

  return apartments;
});

export const deleteApartment = createAsyncThunk<void, { id: string }>(
  'apartments/delete',
  async ({ id }) => {
    await ApartmentService.deleteApartment(id);
  }
);

export const updateApartment = createAsyncThunk<
  void,
  { id: string; params: UpdateApartmentParams }
>('apartments/update', async ({ id, params }) => {
  await ApartmentService.updateApartment(id, params);
});

export const createApartment = createAsyncThunk<
  Apartment,
  CreateApartmentParams
>('apartments/create', async (params) => {
  const apartment = await ApartmentService.createApartment(params);
  return apartment;
});

const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = action.payload;
    },
    clear: () => apartmentsAdapter.getInitialState(extraInitialState)
  },
  extraReducers: (builder) => {
    builder.addCase(searchApartments.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(searchApartments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pageSize = 1;
      state.canFetchMore = action.payload.length === APARTMENT_FETCH_LIMIT;

      const existingIds = state.ids;
      const responseIds = action.payload.map((a) => a._id);

      const idsToRemove = existingIds.filter(
        (id) => !responseIds.includes(id.toString())
      );

      const newApartments = action.payload.filter(
        (apartment) => !existingIds.includes(apartment._id)
      );

      apartmentsAdapter.removeMany(state, idsToRemove);
      apartmentsAdapter.addMany(state, newApartments);
    });

    builder.addCase(searchApartments.rejected, (state) => {
      state.isLoading = false;
      state.canFetchMore = false;
    });

    builder.addCase(loadMoreApartments.pending, (state) => {
      state.isLoading = true;
      state.pageSize++;
    });

    builder.addCase(loadMoreApartments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.canFetchMore = action.payload.length === APARTMENT_FETCH_LIMIT;

      apartmentsAdapter.addMany(state, action.payload);
    });

    builder.addCase(loadMoreApartments.rejected, (state) => {
      state.isLoading = false;
      state.canFetchMore = false;
    });

    builder.addCase(deleteApartment.fulfilled, (state, action) => {
      apartmentsAdapter.removeOne(state, action.meta.arg.id);
    });

    builder.addCase(updateApartment.fulfilled, (state, action) => {
      const { id, params } = action.meta.arg;
      apartmentsAdapter.updateOne(state, { id, changes: params });
    });

    builder.addCase(createApartment.fulfilled, (state, action) => {
      apartmentsAdapter.addOne(state, action.payload);
    });
  }
});

export const {
  selectIds: selectApartmentIds,
  selectById: selectApartmentById
} = apartmentsAdapter.getSelectors((state: RootState) => state.apartments);

export const selectApartmentSearchParams = (state: RootState) =>
  state.apartments.searchParams;

export const { clear: clearApartmentSlice } = apartmentsSlice.actions;

export const { reducer } = apartmentsSlice;
