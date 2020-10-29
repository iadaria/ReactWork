import React, { Dispatch, useEffect } from 'react';
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    ParamListBase,
} from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import { defaultTheme } from './defaultTheme';
import AsyncStorage from '@react-native-community/async-storage';
import { setToken, signInUser } from '../../features/auth/authReducer';
import { ITransaction, ITransactions, IUserForList, IUserInfo } from '../models/models';
import { Transaction, User } from '../services/agent';
import { fetchTransaction } from '../../features/transaction/transactionReducer';
import { fetchUsers } from '../../features/user/userReducer';
import { IRootState } from '../store/rootReducer';
import MainMenu from './MainMenu';
import { StackNavigationProp } from '@react-navigation/stack';
import useAbortableEffect from '../hooks/useAbortableEffect';

//const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
//const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

interface IProps {
    authenticated: boolean;
    id_token: string | null;
    setToken: (id_token: string) => void;
    navigation: StackNavigationProp<ParamListBase>,
    signInUser: (user: IUserInfo) => void,
    fetchTransactions: (transactions: ITransaction[]) => void,
    fetchUsers: (users: IUserForList[]) => void,
}

function AppNavigation( 
    { authenticated, id_token, setToken, navigation, signInUser, fetchTransactions, fetchUsers} : IProps
) {
    console.log("app navigation", navigation);
    const dispatch = useDispatch();

    /* useEffect(() => {
        dispatch(asyncActionStart());
        getToken()
            .then((_id_token: string | null) => {
                _id_token && dispatch(setToken(_id_token));
                console.log("[useEffect/get AsyncStorage token]", {_id_token})
            })
        .catch(error => console.log("[useEffect getToken error", error))
        .finally(() => dispatch(asyncActionFinish()));
    }, []); */
    // One - when create App
    useAbortableEffect<string | null>({
        query: () => getToken(),
        data: _id_token => dispatch(setToken(_id_token!)),
        deps: [dispatch]
    });

    // A few - When null, when not null, when id_token changed
    /* useEffect(() => {
        if (id_token) {
            dispatch(asyncActionStart());
            getUserInfo()
            .then((_user) => {
                _user && dispatch(signInUser(_user));
                console.log("[useEffect/get current user]", {_user})
            })
            .catch(error => console.log("[useEffect getUser error", error))
            .finally(() => dispatch(asyncActionFinish()));
        }
    }, [id_token]); */
    useAbortableEffect<IUserInfo | null>({
        query: () => getUserInfo(),
        data: _user => dispatch(signInUser(_user!)),
        deps: [dispatch, id_token],
        shouldExecute: !!id_token
    });

    /* useEffect(() => {
        if (authenticated) {
            dispatch(asyncActionStart());
            loadTransactions()
            .then(({trans_token}) => {
                trans_token && dispatch(fetchTransaction(trans_token));
                console.log("[useEffect/load transactions]");
            })
            .catch(error => console.log("[useEffect loadTransactions error", error))
            .finally(() => dispatch(asyncActionFinish()));
        }
    }, [authenticated]); */
    useAbortableEffect<ITransaction[]>({
        query: () => loadTransactions(),
        data: _transactions => dispatch(fetchTransactions(_transactions)),
        deps: [dispatch, authenticated],
        shouldExecute: !!authenticated
    });


    /* useEffect(() => {
        if (authenticated) {
            dispatch(asyncActionStart());
            loadUsers()
            .then((users: IUserForList[]) => {
                users && users.length && dispatch(fetchUsers(users));
                console.log("[useEffect/load user");
            })
            .catch(error => console.log("[useEffect users error", error))
            .finally(() => dispatch(asyncActionFinish()));
        }
    }, [authenticated]) */
    useAbortableEffect<IUserForList[]>({
        query: () => loadUsers(),
        data: _users => dispatch(fetchUsers(_users)),
        deps: [dispatch, authenticated],
        shouldExecute: !!authenticated
    });

    const getToken = async (): Promise<string | null> => 
        await AsyncStorage.getItem('id_token');

    const getUserInfo = async(): Promise<IUserInfo | null> =>
        await User.current();

    const loadTransactions = async(): Promise<ITransaction[]> => {
        const result = await Transaction.list();
        const promise: Promise<ITransaction[]> = new Promise((resolve, reject) => {resolve(result.trans_token)});
        return promise;
    }

    const loadUsers = async(): Promise<IUserForList[]> =>
        await User.list({});

    return (

        <NavigationContainer theme={defaultTheme}>
            <MainMenu key={Number(authenticated)} authenticated={authenticated} />
        </NavigationContainer>
    );
}

const mapStateToProps = (state: IRootState, ownProps: any) => ({
    authenticated: state.auth.authenticated,
    id_token: state.auth.id_token
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setToken: (id_token: string) => dispatch(setToken(id_token)),
    signInUser: (user: IUserInfo) => dispatch(signInUser(user)),
    fetchTransactions: (transactions: ITransaction[]) => dispatch(fetchTransaction(transactions)),
    fetchUsers: (users: IUserForList[]) => dispatch(fetchUsers(users))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);