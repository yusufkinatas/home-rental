import mongoose from 'mongoose';
import { User } from 'user/user.model';
import { Apartment } from 'apartment/apartment.model';
import faker from 'faker';
import { IUser, UserRole } from 'user/user.types';
import { IApartment } from 'apartment/apartment.types';
import { envVariables } from 'envVariables';

const seedDatabase = async () => {
  try {
    await mongoose.connect(envVariables.MONGODB_URI);
    console.log('Seeding database started');

    await User.deleteMany({});
    await Apartment.deleteMany({});

    const admin = await User.create({ email: 'admin@gmail.com', fullName: 'Yusuf Admin', password: '123123', role: 2 });
    await User.create({ email: 'realtor@gmail.com', fullName: 'Yusuf Realtor', password: '123123', role: 1 });
    await User.create({ email: 'client@gmail.com', fullName: 'Yusuf Client', password: '123123', role: 0 });

    //Create clients & realtors
    const users: IUser[] = [];
    for (let i = 0; i < 100; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email(firstName, lastName);

      users.push({
        email,
        fullName: `${firstName} ${lastName}`,
        password: 'hashed_password',
        role: i < 50 ? UserRole.CLIENT : UserRole.REALTOR,
      });
    }

    await User.insertMany(users);

    //Create apartments
    const apartments: IApartment[] = [];

    const defaultLat = 42.3600825;
    const defaultLng = -71.0588801;
    const radius = 0.01;

    for (let i = 0; i < 500; i++) {
      apartments.push({
        description: faker.lorem.paragraph(),
        name: faker.address.secondaryAddress(),
        isRented: false,
        dateAdded: new Date(),
        floorAreaSize: faker.datatype.number({ min: 500, max: 5000 }),
        monthlyPrice: faker.datatype.number({ min: 5, max: 100 }) * 100,
        numberOfRooms: faker.datatype.number({ min: 1, max: 10 }),
        realtorId: admin.id,
        location: {
          lat: defaultLat + faker.datatype.float({ min: -radius, max: radius, precision: 0.00001 }),
          lng: defaultLng + faker.datatype.float({ min: -radius, max: radius, precision: 0.00001 }),
          address: `${faker.address.streetAddress(true)}, ${faker.address.city()}, ${faker.address.county()}`,
        },
      });
    }

    await Apartment.insertMany(apartments);

    console.log('Seeding database completed');
  } catch (error) {
    console.log(error);
  }
};

seedDatabase();
