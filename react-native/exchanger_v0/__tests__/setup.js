jest.mock('react-native', () => ({
    NetInfo: {
        addEventListener: jest.fn(),
        fetch: () => {
            return {
                done: jest.fn()
            }
        }
    },
    NativeModules: {
        RNPasscodeStatus: {
            supported: jest.fn(),
            status: jest.fn(),
            get: jest.fn()
        }
    },
    Dimensions: {
        get: () => ({
            width: jest.fn(),
            height: jest.fn()
        })
    },
}));