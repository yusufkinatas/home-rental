import express from 'express';
import { validateRealtorOrAdmin } from 'middlewares/validateRealtorOrAdmin';
import { validateToken } from 'middlewares/validateToken';
import { Apartment } from './apartment.model';
import { CreateApartmentBody } from './apartment.types';
import _ from 'lodash';
import { UserRole } from 'user/user.types';

export const apartmentRouter = express.Router();

apartmentRouter.post('/', validateToken, validateRealtorOrAdmin, async (req, res) => {
  try {
    const { description, floorAreaSize, location, monthlyPrice, name, numberOfRooms } = req.body as CreateApartmentBody;

    const apartment = await Apartment.create({
      description,
      floorAreaSize,
      location,
      monthlyPrice,
      name,
      numberOfRooms,
      realtorId: req.user._id.toString(),
    });

    res.send(apartment);
  } catch (error) {
    res.status(400).send(error);
  }
});

apartmentRouter.put('/:id', validateToken, validateRealtorOrAdmin, async (req, res) => {
  try {
    const { id: apartmentId } = req.params;

    const updateParams = _.pick<CreateApartmentBody>(req.body, [
      'description',
      'floorAreaSize',
      'location',
      'monthlyPrice',
      'name',
      'numberOfRooms',
      'isRented',
    ]);

    const apartment = await Apartment.findById(apartmentId);

    if (!apartment) {
      return res.sendStatus(404);
    }

    if (req.user.role === UserRole.REALTOR && req.user._id.toString() !== apartment?.realtorId) {
      return res.sendStatus(401);
    }

    apartment.set(updateParams);

    const updatedApartment = await apartment.save();
    res.send(updatedApartment);
  } catch (error) {
    res.status(400).send(error);
  }
});

apartmentRouter.delete('/:id', validateToken, validateRealtorOrAdmin, async (req, res) => {
  try {
    const { id: apartmentId } = req.params;

    const apartment = await Apartment.findById(apartmentId);

    if (!apartment) {
      return res.sendStatus(404);
    }

    if (req.user.role === UserRole.REALTOR && req.user._id.toString() !== apartment?.realtorId) {
      return res.sendStatus(401);
    }

    const deletedApartment = await apartment.delete();

    res.send(deletedApartment);
  } catch (error) {
    res.status(400).send(error);
  }
});
