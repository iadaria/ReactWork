class User {
    constructor(model) {
        this.Model = model;
    }

    async signUp(signUpData) {
        
        if(signUpData.password !== signUpData.passwordConfirmation) {
            throw new Error('Password must be the same as confirmation password!');
        } 
        return this.Model.create(signUpData);
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
        return 'Signing Out...';
    }
}

module.exports = User;