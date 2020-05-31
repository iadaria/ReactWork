class User {
    constructor(model) {
        this.Model = model;
    }

    getAuthUser(ctx) {
       if (ctx.isAuthenticated())  {
           return ctx.getUser();
       }

       return null;
    }

    async signUp(signUpData) {
        
        if(signUpData.password !== signUpData.passwordConfirmation) {
            throw new Error('Password must be the same as confirmation password!');
        } 

        try {
            return await this.Model.create(signUpData);
        } catch (error) {
            if (error.code && error.code === 11000) {
                throw new Error('User with provided email alrady exists!');
            }
            throw error;
        }
    }

    async signIn(signInData, ctx) {
        //console.log(ctx);
        try {
            const user = await ctx.authenticate(signInData); // from graphql/context import in graphql
            //console.log(user);
            return user;
        } 
        catch (error) {
            return error;
        }
    }

    signOut(ctx) {
        try {
            ctx.logout();
            return true;
        } catch(error) {
            return false;
        }
    }
}

module.exports = User;