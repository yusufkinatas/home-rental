import { Apartment } from 'apartment/apartment.model';
import express from 'express';
import { validateAdmin } from 'middlewares/validateAdmin';
import { validateToken } from 'middlewares/validateToken';
import { User } from 'user/user.model';
import { UserRole } from 'user/user.types';
import { SearchApartmentQueryParams, SearchUserQueryParams } from './search.types';

export const searchRouter = express.Router();

searchRouter.get('/user', validateToken, validateAdmin, async (req, res) => {
  try {
    const { index = '0', limit = '10', query } = req.query as SearchUserQueryParams;

    const queryLimit = parseInt(limit);
    const queryIndex = parseInt(index);

    let searchQuery = User.find();

    if (query) {
      searchQuery = searchQuery.find({ fullName: new RegExp(query, 'i') });
    }

    const searchResult = await searchQuery.skip(queryIndex * queryLimit).limit(queryLimit);

    res.send(searchResult);
  } catch (error) {
    res.status(400).send(error);
  }
});

searchRouter.get('/apartment', validateToken, async (req, res) => {
  try {
    const {
      index = '0',
      limit = '10',
      realtorId,
      maxLat,
      maxLng,
      minLat,
      minLng,
      minMonthlyPrice,
      maxMonthlyPrice,
      minFloorAreaSize,
      maxFloorAreaSize,
      minNumberOfRooms,
      maxNumberOfRooms,
    } = req.query as SearchApartmentQueryParams;

    const queryLimit = parseInt(limit);
    const queryIndex = parseInt(index);
    let boundaries;

    if (maxLat && maxLng && minLat && minLng) {
      boundaries = {
        maxLat: parseFloat(maxLat),
        maxLng: parseFloat(maxLng),
        minLat: parseFloat(minLat),
        minLng: parseFloat(minLng),
      };
    }

    let apartmentQuery = Apartment.find();

    if (boundaries) {
      apartmentQuery = apartmentQuery.find({
        'location.lat': { $gte: boundaries.minLat, $lte: boundaries.maxLat },
        'location.lng': { $gte: boundaries.minLng, $lte: boundaries.maxLng },
      });
    }

    if (req.user.role === UserRole.CLIENT) apartmentQuery = apartmentQuery.find({ isRented: false });

    if (realtorId) apartmentQuery = apartmentQuery.find({ realtorId });

    if (minMonthlyPrice) apartmentQuery = apartmentQuery.find({ monthlyPrice: { $gte: parseInt(minMonthlyPrice) } });
    if (maxMonthlyPrice) apartmentQuery = apartmentQuery.find({ monthlyPrice: { $lte: parseInt(maxMonthlyPrice) } });

    if (minFloorAreaSize) apartmentQuery = apartmentQuery.find({ floorAreaSize: { $gte: parseInt(minFloorAreaSize) } });
    if (maxFloorAreaSize) apartmentQuery = apartmentQuery.find({ floorAreaSize: { $lte: parseInt(maxFloorAreaSize) } });

    if (minNumberOfRooms) apartmentQuery = apartmentQuery.find({ numberOfRooms: { $gte: parseInt(minNumberOfRooms) } });
    if (maxNumberOfRooms) apartmentQuery = apartmentQuery.find({ numberOfRooms: { $lte: parseInt(maxNumberOfRooms) } });

    const searchResult = await apartmentQuery.skip(queryIndex * queryLimit).limit(queryLimit);

    res.send(searchResult);
  } catch (error) {
    res.status(400).send(error);
  }
});
