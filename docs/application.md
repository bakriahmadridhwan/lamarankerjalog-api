# Application API Spec

Field Status: applied, screening, interview, offer, accepted, rejected, withdrawn

## Create Application

Endpoint : POST /api/applications

Request Header :

<!-- Authorization: Bearer <token> -->

- X-API-TOKEN : token

Request Body :

```json
{
  "company": "Apple",
  "job_title": "Developer",
  "location": "Tangerang",
  "link": "https://developeracademy.apps.binus.ac.id/",
  "application_date": "2026-10-01",
  "status": "applied",
  "notes": "catatan bebas"
}
```

Response Body (Success) 201 Created :

```json
{
  "data": {
    "id": 1,
    "company": "Apple",
    "job_title": "Developer",
    "location": "Tangerang",
    "link": "https://developeracademy.apps.binus.ac.id/",
    "application_date": "2026-10-01",
    "status": "applied",
    "notes": "catatan bebas"
  }
}
```

Response Body (Failed) 400 Bad Request :

```json
{
  "errors": "Company must not blank"
}
```

Response Body (Failed) 400 Bad Request :

```json
{
  "errors": "Status must be one of: applied, screening, interview, offer, accepted, rejected, withdrawn"
}
```

Response Body (Failed) 401 Unauthorized :

```json
{
  "errors": "Unauthorized"
}
```

## Get Application

Endpoint : GET /api/applications/:applicationId

Request Header :

<!-- Authorization: Bearer <token> -->

- X-API-TOKEN : token

Response Body (Success) 200 OK :

```json
{
  "data": {
    "id": 1,
    "company": "Apple",
    "job_title": "Developer",
    "location": "Tangerang",
    "link": "https://developeracademy.apps.binus.ac.id/",
    "application_date": "2026-10-01",
    "status": "applied",
    "notes": "catatan bebas"
  }
}
```

Response Body (Failed) 401 Unauthorized :

```json
{
  "errors": "Unauthorized"
}
```

Response Body (Failed) 404 Not Found :

```json
{
  "errors": "Application is not found"
}
```

## Update Application

Endpoint : PATCH /api/applications/:applicationId

Request Header :

<!-- Authorization: Bearer <token> -->

- X-API-TOKEN : token

Request Body :

<!-- (semua field opsional, minimal satu field harus dikirim) -->

```json
{
  "status": "interview",
  "notes": "Dihubungi HRD lewat WhatsApp"
}
```

Response Body (Success) 200 OK:

```json
{
  "data": {
    "id": 1,
    "company": "Apple",
    "job_title": "Developer",
    "location": "Tangerang",
    "link": "https://developeracademy.apps.binus.ac.id/",
    "application_date": "2026-10-01",
    "status": "interview",
    "notes": "Dihubungi HRD lewat WhatsApp"
  }
}
```

Response Body (Failed) 400 Bad Request :

```json
{
  "errors": "Status must be one of: applied, screening, interview, offer, accepted, rejected, withdrawn"
}
```

Response Body (Failed) 400 Bad Request :

```json
{
  "errors": "At least one field must be provided"
}
```

Response Body (Failed) 401 Unauthorized :

```json
{
  "errors": "Unauthorized"
}
```

Response Body (Failed) 404 Not Found :

```json
{
  "errors": "Application is not found"
}
```

## Remove Application

Endpoint : DELETE /api/applications/:applicationId

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

Response Body (Failed) 404 Not Found :

```json
{
  "errors": "Application is not found"
}
```

## Search Application

Endpoint : GET /api/applications

Query Parameter :

- q : string, cari di company atau job_title, optional
- status : string, optional, salah satu dari nilai status
- page : number, default 1
- size : number, default 10

Request Header :

<!-- Authorization: Bearer <token> -->

- X-API-TOKEN : token

Response Body (Success) 200 OK :

```json
{
  "data": [
    {
      "id": 1,
      "company": "Apple",
      "job_title": "Developer",
      "location": "Tangerang",
      "link": "https://developeracademy.apps.binus.ac.id/",
      "application_date": "2026-10-01",
      "status": "interview",
      "notes": "Dihubungi HRD lewat WhatsApp"
    },
    {
      "id": 2,
      "company": "Telkom",
      "job_title": "Developer",
      "location": "Remote",
      "link": null,
      "application_date": "2026-10-02",
      "status": "applied",
      "notes": null
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (Failed) 400 Bad Request :

```json
{
  "errors": "Page must be at least 1"
}
```

Response Body (Failed) 401 Unauthorized :

```json
{
  "errors": "Unauthorized"
}
```
