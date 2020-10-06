import { Linking } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../app/common/components/ui/AppHeaderIcon';
import ErrorToast from '../app/common/components/AppToast';
import { DefaultTheme } from '@react-navigation/native';
import { THEME } from '../theme';

export const defaultScreenOptions = {
    title: THEME.COMPANI_NAME,
    headerStyle: {
        backgroundColor: THEME.MAIN_COLOR
    },
    headerTintColor: "#fff",
    headerTitleAlign: "center"
};

export const defaultTabScreenOptions = {
    ...defaultScreenOptions,
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
                title="title"
                iconName="headphones"
                onPress={() => {
                    Linking.openURL(`http://t.me/${THEME.TELEGRAM_COMMON_GROUP}`)
                        .catch(error => {
                            console.log('error when open telegram group', error);
                            ErrorToast(error.message)
                        });
                }}
            />
        </HeaderButtons>
    ),
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
                title="title"
                iconName="bell-outline"
                onPress={() => console.log('message')}
            />
        </HeaderButtons>
    )
};

export const defaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: THEME.BACKGROUND_SCREEN_COLOR
    }
};