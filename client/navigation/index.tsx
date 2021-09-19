import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApartmentsScreen } from '@screens/ApartmentsScreen';

import {
  CompositeDrawerScreenProp,
  DrawerParamList,
  RootStackParamList,
  UserRole
} from 'types';
import { navigationTheme } from './navigationTheme';
import { LandingScreen } from '@screens/LandingScreen';
import { UsersScreen } from '@screens/UsersScreen';
import { ApartmentDetailScreen } from '@screens/ApartmentDetailScreen';
import { ApartmentFiltersScreen } from '@screens/ApartmentFiltersScreen';
import { CreateApartmentScreen } from '@screens/CreateApartmentScreen';
import { CreateUserScreen } from '@screens/CreateUserScreen';
import { EditApartmentScreen } from '@screens/EditApartmentScreen';
import { EditUserScreen } from '@screens/EditUserScreen';
import { CustomDrawerContent } from './CustomDrawerContent';
import { DrawerIcon } from './DrawerIcon';
import { colors } from '@constants/colors';
import { PressableOpacity } from '@components/PressableOpacity';
import { Icon } from '@components/Icon';
import Spacer from '@components/Spacer';
import { View } from 'react-native';
import { LocalStorageService } from '@services/LocalStorageService';
import { useApartments } from '@contexts/apartments';
import { useAppSelector } from '@hooks/useAppSelector';
import { logout, selectUser } from '@slices/authSlice';
import { useAppDispatch } from '@hooks/useAppDispatch';

export default function Navigation() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const initialized = useAppSelector((state) => state.auth.initialized);
  const user = useAppSelector(selectUser);

  if (!initialized) return null;

  return (
    <Stack.Navigator initialRouteName={user ? 'Drawer' : 'Landing'}>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false, animationTypeForReplace: 'pop' }}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false, animationTypeForReplace: 'push' }}
      />

      <Stack.Group>
        <Stack.Screen
          name="ApartmentDetail"
          component={ApartmentDetailScreen}
          options={{ title: 'Apartment Detail' }}
        />
        <Stack.Screen
          name="ApartmentFilters"
          component={ApartmentFiltersScreen}
          options={{ title: 'Apartment  Filters' }}
        />
        <Stack.Screen
          name="CreateApartment"
          component={CreateApartmentScreen}
          options={{ title: 'Create Apartment' }}
        />
        <Stack.Screen
          name="EditApartment"
          component={EditApartmentScreen}
          options={{ title: 'Edit Apartment' }}
        />
        <Stack.Screen
          name="CreateUser"
          component={CreateUserScreen}
          options={{ title: 'Create User' }}
        />
        <Stack.Screen
          name="EditUser"
          component={EditUserScreen}
          options={{ title: 'Edit User' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  const user = useAppSelector(selectUser);
  const { setSearchParams } = useApartments();

  const dispatch = useAppDispatch();

  return (
    <Drawer.Navigator
      initialRouteName="Apartments"
      drawerContent={(props) => (
        <CustomDrawerContent
          onLogout={() => {
            dispatch(logout());
            setSearchParams(undefined);

            LocalStorageService.DeleteObj('TOKEN');
            props.navigation.reset({ routes: [{ name: 'Landing' }] });
          }}
          user={user}
          {...props}
        />
      )}
      screenOptions={{
        headerTintColor: colors.neutral[600]
      }}
    >
      <Drawer.Screen
        name="Apartments"
        component={ApartmentsScreen}
        initialParams={{ view: 'map' }}
        options={({
          navigation,
          route: {
            params: { view }
          }
        }: CompositeDrawerScreenProp<'Apartments'>) => ({
          drawerIcon: (props) => <DrawerIcon name="home" {...props} />,
          headerRight: () => {
            return (
              <View style={{ flexDirection: 'row', marginRight: 16 }}>
                <PressableOpacity
                  onPress={() =>
                    navigation.setParams({
                      view: view == 'list' ? 'map' : 'list'
                    })
                  }
                >
                  <Icon name={view === 'list' ? 'map' : 'list'} />
                </PressableOpacity>
                <Spacer width={16} />
                <PressableOpacity
                  onPress={() => navigation.navigate('ApartmentFilters')}
                >
                  <Icon name="filter" />
                </PressableOpacity>
              </View>
            );
          }
        })}
      />
      {user?.role === UserRole.ADMIN && (
        <Drawer.Screen
          name="Users"
          component={UsersScreen}
          options={{
            drawerIcon: (props) => <DrawerIcon name="user" {...props} />
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
