#DevTinder APIs

authRouter

- POST /signup
- POST /login
- POST /logout

profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter

- POST /request/send/:status/:userId -- status can be ignore or interested
- POST /request/review/:status/:requestId -- status can be accepted or rejected

userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profile of other users on platform

Status: Ignore, interested, accepted, rejected
