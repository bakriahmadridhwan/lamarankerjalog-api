# User API Spec

## Register User

Endpoint : POST /api/users/register

Request Body :

```json
{
  "username": "bakwan",
  "password": "rahasia",
  "name": "Bakri Ahmad"
}
```

Response Body (Success) 201 Created :

```json
{
  "data": {
    "username": "bakwan",
    "name": "Bakri Ahmad"
  }
}
```

Response Body (Failed) 400 Bad Request :

```json
{
  "errors": "Username must not blank"
}
```

Response Body (Failed) 409 Conflict :

```json
{
  "errors": "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "bakwan",
  "password": "rahasia"
}
```

Response Body (Success) 200 OK :

```json
{
  "data": {
    "username": "bakwan",
    "name": "Bakri Ahmad",
    // session
    "token": "uuid"
  }
}
```

Response Body (Failed) 400 Bad Request :

```json
{
  "errors": "Username must not be blank"
}
```

Response Body (Failed) 401 Unauthorized :

```json
{
  "errors": "Username or password wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

<!-- Authorization: Bearer <token> -->

- X-API-TOKEN : token

Response Body (Success) 200 OK :

```json
{
  "data": {
    "username": "bakwan",
    "name": "Bakri Ahmad"
  }
}
```

Response Body (Failed) 401 Unauthorized :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

<!-- PATCH => itu update bisa partial, sebagian -->

Endpoint : PATCH /api/users/current

Request Header :

<!-- Authorization: Bearer <token> -->

- X-API-TOKEN : token

Request Body :

```json
{
  "name": "Bakri Ahmad Lagi", // tidak wajib
  "password": "rahasia lagi" // tidak wajib
}
```

Response Body (Success) 200 OK :

```json
{
  "data": {
    "username": "bakwan",
    "name": "Bakri Ahmad Lagi"
  }
}
```

Response Body (Failed) 400 Bad Request :

```json
{
  "errors": "Name length max 100"
}
```

Response Body (Failed) 400 Bad Request :

```json
{
  "errors": "At least one field must be provided"
}
```

Response Body (Failed) 401 Unauthorized :

<!-- (token tidak valid) -->

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

<!-- Authorization: Bearer <token> -->

- X-API-TOKEN : token

Response Body (Success) 200 OK :

```json
{
  "data": "OK"
}
```

Response Body (Failed) 401 Unauthorized :

```json
{
  "errors": "Unauthorized"
}
```
