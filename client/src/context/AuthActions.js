export const LoginStart = (userCredentials)=>({
    type:"LOGIN_START",
});

export const LoginSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload:user,

});

export const LoginFailure = (error)=>({
    payload:error,
    type:"LOGIN_FAILURE",
});

export const Follow = (userId)=>({
    payload:userId,
    type:"FOLLOW",
});

export const Unfollow = (userId)=>({
    payload:userId,
    type:"UNFOLLOW",
});


